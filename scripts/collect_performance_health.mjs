import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {resolve} from 'node:path';
const store=resolve(process.argv[2]||'private/performance');
const origin='https://www.wellandgoodgrowth.ca';
const checkedAt=new Date().toISOString();
const rows=await Promise.all(['/', '/services/websites/','/services/growth/','/services/automation/','/contact/'].map(async page=>{
  const start=performance.now();
  try {
    const r=await fetch(origin+page,{method:'HEAD',signal:AbortSignal.timeout(20000)});
    return {page,status:r.status,responseMs:Math.round(performance.now()-start),result:r.ok&&new URL(r.url).origin===origin?'Available':'Check needed',checkedAt};
  } catch {return {page,status:null,responseMs:null,result:'Check failed',checkedAt};}
}));
await mkdir(store,{recursive:true});
let history=[];
try{history=JSON.parse(await readFile(resolve(store,'health-history.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
history=[...history.filter(r=>r.checkedAt.slice(0,10)!==checkedAt.slice(0,10)),...rows];
const path=resolve(store,'health-history.json');
await writeFile(path+'.tmp',JSON.stringify(history,null,2)+'\n',{mode:0o600});
await rename(path+'.tmp',path);
console.log(JSON.stringify({checkedAt,rows}));
