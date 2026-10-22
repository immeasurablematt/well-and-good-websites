import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const DEFAULT_ORIGIN='https://www.wellandgoodgrowth.ca';
export const HEALTH_PAGES=[
 '/',
 '/services/websites/',
 '/services/growth/',
 '/services/automation/',
 '/contact/',
 '/niagara-seo/',
 '/website-design-welland/',
 '/website-design-niagara/'
];

function normalizedPath(pathname) {
 return pathname==='/' ? '/' : pathname.replace(/\/$/,'');
}

export async function checkPage(page,{origin=DEFAULT_ORIGIN,checkedAt=new Date().toISOString(),fetchImpl=fetch}={}) {
 const start=performance.now();
 let status=null;
 try {
  const response=await fetchImpl(origin+page,{method:'GET',signal:AbortSignal.timeout(20000)});
  status=response.status;
  const destination=new URL(response.url);
  const contentType=response.headers.get('content-type')||'';
  const html=await response.text();
  const expectedDestination=destination.origin===origin&&normalizedPath(destination.pathname)===normalizedPath(page);
  const isHtml=contentType.toLowerCase().includes('text/html')&&/<html[\s>]/i.test(html)&&/<body[\s>]/i.test(html);
  const result=response.ok&&expectedDestination&&isHtml?'Available':'Check needed';
  const reason=!response.ok?'HTTP status':!expectedDestination?'Unexpected destination':!isHtml?'Missing HTML page':null;
  return {page,status,responseMs:Math.round(performance.now()-start),result,checkedAt,method:'GET',redirected:response.redirected,finalUrl:response.url,reason};
 } catch {
  return {page,status,responseMs:null,result:'Check failed',checkedAt,method:'GET',redirected:null,finalUrl:null,reason:'Request or response failed'};
 }
}

export async function collectHealth(store,{origin=DEFAULT_ORIGIN,checkedAt=new Date().toISOString(),fetchImpl=fetch}={}) {
 const rows=await Promise.all(HEALTH_PAGES.map(page=>checkPage(page,{origin,checkedAt,fetchImpl})));
 await mkdir(store,{recursive:true});
 const path=resolve(store,'health-history.json');
 let history=[];
 try {history=JSON.parse(await readFile(path,'utf8'));} catch(error) {if(error.code!=='ENOENT')throw error;}
 history=[...history.filter(row=>row.checkedAt.slice(0,10)!==checkedAt.slice(0,10)),...rows];
 await writeFile(path+'.tmp',JSON.stringify(history,null,2)+'\n',{mode:0o600});
 await rename(path+'.tmp',path);
 return {checkedAt,rows};
}

if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url) {
 const store=resolve(process.argv[2]||'private/performance');
 console.log(JSON.stringify(await collectHealth(store)));
}
