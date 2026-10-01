// Publish only the owner dashboard. Credentials stay in memory.
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../private/performance/',import.meta.url));
const statePath=root+'here-now-publication.json';
const key=(process.env.HERENOW_API_KEY||await fs.readFile(process.env.HOME+'/.herenow/credentials','utf8')).trim();
const headers={Authorization:'Bearer '+key,'X-HereNow-Client':'codex/growth-dashboard'};
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
// New dashboard is owner-only. Fail closed if its policy changes.
const isApprovedAccess=access=>access.mode==='restricted'&&access.allowedEmails.length===0&&access.allowedDomains.length===0;
async function api(path,method='GET',body){
 const response=await fetch('https://here.now/api/v1/'+path,{method,headers:{...headers,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
 if(!response.ok) throw new Error(`here.now ${method} ${path} returned HTTP ${response.status}`);
 return response.json();
}
async function save(state){await fs.writeFile(statePath,JSON.stringify(state,null,2)+'\n');}
async function upload(bytes,state){
 const data={files:[{path:'index.html',size:bytes.length,contentType:'text/html; charset=utf-8',hash:sha(bytes)}]};
 if(state){data.baseVersionId=state.currentVersionId;}else{
  data.ttlSeconds=null;data.displayName='Well and Good Growth - Site performance';data.displayDescription='Private website performance dashboard';
 }
 const result=await api(state?'publish/'+state.slug:'publish',state?'PUT':'POST',data);
 for(const u of result.upload.uploads){
  if(u.path!=='index.html'||new URL(u.url).protocol!=='https:')throw new Error('Unexpected upload target');
  const response=await fetch(u.url,{method:u.method,headers:u.headers,body:bytes});
  if(!response.ok)throw new Error('Upload failed: HTTP '+response.status);
 }
 const done=await api('publish/'+result.slug+'/finalize','POST',{versionId:result.upload.versionId});
 if(done.publishStatus?.ownership!=='personal'||done.publishStatus?.persistence!=='permanent'||done.publishStatus?.state!=='live')throw new Error('Expected permanent personal publication');
 return {artifactId:'dashboard:753ab71f-4039-4cc4-800e-37d5039539ad',slug:done.slug,siteUrl:done.siteUrl,currentVersionId:done.currentVersionId,publishStatus:done.publishStatus};
}
let state;
try{state=JSON.parse(await fs.readFile(statePath,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
if(!state){
 if(!process.argv.includes('--initialize'))throw new Error('No saved target. Initialize once after checking existing sites.');
 state=await upload(Buffer.from('<!doctype html><meta name="robots" content="noindex"><title>Private report</title><p>Private report setup in progress.</p>'));
 state.phase='placeholder';await save(state);
 await api('publish/'+state.slug+'/access','PATCH',{mode:'restricted',allowedEmails:[],allowedDomains:[],notify:false});
}
const details=await api('publish/'+state.slug);
if(details.currentVersionId!==state.currentVersionId)throw new Error('Live version changed; inspect before overwriting owner changes.');
const access=(await api('publish/'+state.slug+'/access')).access;
if(!isApprovedAccess(access))throw new Error('Owner-only access must be verified before publishing report data.');
const bytes=await fs.readFile(root+'Site Performance.html');
if(!bytes.includes(Buffer.from(state.artifactId)))throw new Error('Artifact identity missing');
if(bytes.includes(Buffer.from(key))||/api_key=[A-Za-z0-9]{8,}/.test(bytes.toString()))throw new Error('Credential scan failed');
state={...await upload(bytes,state),phase:'report',publishedAt:new Date().toISOString()};await save(state);
state.access=(await api('publish/'+state.slug+'/access')).access;
if(!isApprovedAccess(state.access))throw new Error('Access changed unexpectedly');
const readback=await fetch('https://here.now/api/v1/publish/'+state.slug+'/files/index.html',{headers});
if(!readback.ok)throw new Error('Owner file readback failed');
const readbytes=Buffer.from(await readback.arrayBuffer());
if(sha(readbytes)!==sha(bytes))throw new Error('Hosted content does not match export');
const guest=await fetch(state.siteUrl,{redirect:'manual'});
const guestText=await guest.text();
if(![401,403,302,303,307].includes(guest.status)||guestText.includes(state.artifactId))throw new Error('Report data visible without authentication');
state.verification={verifiedAt:new Date().toISOString(),htmlSha256:sha(bytes),bytes:bytes.length,ownerReadbackMatches:true,guestStatus:guest.status,guestLocation:guest.headers.get('location'),guestReportDataAbsent:true};
await save(state);
console.log(JSON.stringify({siteUrl:state.siteUrl,ownerOnly:true,verified:state.verification.ownerReadbackMatches}));
