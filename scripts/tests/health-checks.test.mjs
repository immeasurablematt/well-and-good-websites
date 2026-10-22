import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {HEALTH_PAGES,checkPage,collectHealth} from '../collect_performance_health.mjs';

const origin='https://www.wellandgoodgrowth.ca';
const html='<!doctype html><html><body>Website page</body></html>';
function response(url,{status=200,contentType='text/html',body=html,redirected=false}={}) {
 return {status,ok:status>=200&&status<300,url,redirected,headers:{get:()=>contentType},text:async()=>body};
}

test('checks the current service, contact and three local landing pages with GET',async()=>{
 assert.deepEqual(HEALTH_PAGES,[
  '/','/services/websites/','/services/growth/','/services/automation/','/contact/',
  '/niagara-seo/','/website-design-welland/','/website-design-niagara/'
 ]);
 const requests=[];
 const store=await mkdtemp(join(tmpdir(),'wgg-health-test-'));
 try {
  const run=await collectHealth(store,{
   checkedAt:'2026-10-22T12:00:00.000Z',
   fetchImpl:async(url,options)=>{requests.push({url,method:options.method});return response(url);}
  });
  assert.equal(run.rows.length,8);
  assert.ok(run.rows.every(row=>row.result==='Available'&&row.status===200&&row.method==='GET'));
  assert.deepEqual(requests.map(item=>item.method),Array(8).fill('GET'));
  assert.deepEqual(requests.map(item=>item.url),HEALTH_PAGES.map(page=>origin+page));
  const saved=JSON.parse(await readFile(join(store,'health-history.json'),'utf8'));
  assert.deepEqual(saved,run.rows);
 } finally {await rm(store,{recursive:true,force:true});}
});

test('a 200 response at the wrong destination or without HTML needs attention',async()=>{
 const destination=await checkPage('/niagara-seo/',{
  fetchImpl:async()=>response(origin+'/',{redirected:true})
 });
 assert.equal(destination.result,'Check needed');
 assert.equal(destination.reason,'Unexpected destination');
 assert.equal(destination.redirected,true);
 const missingHtml=await checkPage('/niagara-seo/',{
  fetchImpl:async()=>response(origin+'/niagara-seo/',{contentType:'application/json',body:'{}'})
 });
 assert.equal(missingHtml.result,'Check needed');
 assert.equal(missingHtml.reason,'Missing HTML page');
 const missingPage=await checkPage('/niagara-seo/',{
  fetchImpl:async()=>response(origin+'/niagara-seo/',{status:404})
 });
 assert.equal(missingPage.result,'Check needed');
 assert.equal(missingPage.status,404);
 assert.equal(missingPage.reason,'HTTP status');
});

test('failed requests stay distinct from successful HTTP responses',async()=>{
 const row=await checkPage('/contact/',{fetchImpl:async()=>{throw Error('network unavailable');}});
 assert.equal(row.result,'Check failed');
 assert.equal(row.status,null);
 assert.equal(row.responseMs,null);
});

test('a new run replaces checks from the same UTC day and retains earlier days',async()=>{
 const store=await mkdtemp(join(tmpdir(),'wgg-health-history-test-'));
 const fetchImpl=async url=>response(url);
 try {
  await collectHealth(store,{checkedAt:'2026-10-21T12:00:00.000Z',fetchImpl});
  await collectHealth(store,{checkedAt:'2026-10-22T12:00:00.000Z',fetchImpl});
  await collectHealth(store,{checkedAt:'2026-10-22T13:00:00.000Z',fetchImpl});
  const saved=JSON.parse(await readFile(join(store,'health-history.json'),'utf8'));
  assert.equal(saved.length,16);
  assert.equal(saved[0].checkedAt,'2026-10-21T12:00:00.000Z');
  assert.equal(saved.at(-1).checkedAt,'2026-10-22T13:00:00.000Z');
 } finally {await rm(store,{recursive:true,force:true});}
});
