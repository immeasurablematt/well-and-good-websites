// Build only the private owner dashboard, never the public website.
import {readFile,writeFile,mkdir,copyFile,rename,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {homedir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url));
const store=resolve(root,'private/performance');
const project=resolve(store,'dashboard');
const data=JSON.parse(await readFile(resolve(store,'snapshot.json'),'utf8'));
if(!data.id?.startsWith('dashboard:')||data.title!=='Well and Good Growth · Site performance')throw Error('Unexpected dashboard identity');
for(const id of ['traffic','pages','referrers','devices','countries','searchDaily','searchQueries','searchPages','measurement','health']){
 const q=data.queries[id];
 if(!Array.isArray(q?.rows)||!q.source?.executedAt||!q.source?.evidenceFlow?.length)throw Error(`Missing reviewed evidence: ${id}`);
}
const dates=data.queries.searchDaily.rows.map(r=>r.date);
if(new Set(dates).size!==dates.length||dates.some((d,i)=>!/^\d{4}-\d{2}-\d{2}$/.test(d)||(i&&d<=dates[i-1])))throw Error('Search days must be unique and chronological');
for(const row of data.queries.searchDaily.rows)if(!['clicks','impressions'].every(k=>Number.isSafeInteger(row[k])&&row[k]>=0))throw Error('Invalid search counts');
// Fail closed if the existing app belongs to a different report.
const prior=JSON.parse(await readFile(resolve(project,'src/data.json'),'utf8'));
if(prior.id!==data.id)throw Error('Dashboard identity changed');
await writeFile(resolve(project,'src/data.json'),JSON.stringify(data,null,2)+'\n',{mode:0o600});
for(const name of ['DashboardContent.jsx','performance.css'])await copyFile(resolve(root,'reporting/performance',name),resolve(project,'src/content/dashboard',name));
const base=resolve(homedir(),'.codex/plugins/cache/openai-curated-remote/data-analytics');
const version=(await readdir(base)).sort((a,b)=>b.localeCompare(a,undefined,{numeric:true}))[0];
const cli=resolve(base,version,'scripts/data-app.mjs');
for(const args of [['build','--project-dir',project,'--separate-data'],['export-offline','--project-dir',project,'--output',resolve(project,'.data-app-offline/exports/dashboard.html')]]){
 const result=spawnSync(process.execPath,[cli,...args],{encoding:'utf8'});
 if(result.status!==0)throw Error(result.stderr||result.stdout);
}
await mkdir(store,{recursive:true});
const target=resolve(store,'Site Performance.html');
await copyFile(resolve(project,'.data-app-offline/exports/dashboard.html'),target+'.tmp');
await rename(target+'.tmp',target);
console.log(JSON.stringify({artifact:target,id:data.id,generatedAt:data.generatedAt}));
