import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePerformance} from './validate_performance.mjs';
import {enquiryRows,searchTotals,filterQueryGroup} from '../reporting/performance/metrics.mjs';
const source={executedAt:'2026-10-06T14:00:00Z',metricDefinitions:[{label:'Test',definition:'Synthetic verification only'}],caveats:[],evidenceFlow:[{title:'Synthetic test fixture'}]};
const scope={start:'2026-09-03',end:'2026-09-30',timezone:'America/Toronto'};
function snapshot() {
 return {id:'dashboard:753ab71f-4039-4cc4-800e-37d5039539ad',title:'Well and Good Growth · Site performance',queries:Object.fromEntries(['traffic','pages','referrers','devices','countries','searchDaily','searchQueries','searchPages','measurement','health'].map(id=>[id,{rows:[],source}]))};
}
test('missing evidence stays unavailable while observed zero stays zero',()=>{
 assert.deepEqual(searchTotals([]),{clicks:null,impressions:null,ctr:null});
 assert.deepEqual(searchTotals([{clicks:0,impressions:0}]),{clicks:0,impressions:0,ctr:null});
 assert.equal(enquiryRows()[4].count,'Unavailable');
 const rows=enquiryRows([{stage:'success_return',count:3,start:'2026-09-03',end:'2026-09-30'},{stage:'popup_open',count:0,start:'2026-09-03',end:'2026-09-30'}]);
 assert.equal(rows[0].count,0);
 assert.equal(rows[3].count,3);
 assert.equal(rows[4].count,'Unavailable');
});
test('CTR uses counts and query group reset restores all captured rows',()=>{
 assert.deepEqual(searchTotals([{clicks:1,impressions:10},{clicks:0,impressions:90}]),{clicks:1,impressions:100,ctr:0.01});
 const rows=[{queryGroup:'Brand'},{queryGroup:'Services'},{queryGroup:'Project or business names'}];
 assert.deepEqual(filterQueryGroup(rows,'Services'),[rows[1]]);
 assert.equal(filterQueryGroup(rows,'All queries'),rows);
});
test('optional data needs scope and provenance; malformed counts and dates fail',()=>{
 const data=snapshot();
 validatePerformance(data);
 data.queries.trafficDaily={rows:[{date:'2026-09-03',views:1,visitors:1}],source};
 assert.throws(()=>validatePerformance(data),/scope/);
 data.queries.trafficDaily.scope=scope;
 validatePerformance(data);
 data.queries.trafficDaily.rows.push({date:'2026-09-03',views:1});
 assert.throws(()=>validatePerformance(data),/daily traffic/);
 data.queries.trafficDaily.rows=[{date:'2026-09-03',views:null}];
 assert.throws(()=>validatePerformance(data),/daily traffic/);
});
test('enquiry counts require unique stages and separate dated source evidence',()=>{
 const data=snapshot();
 const stage={stage:'success_return',count:2,start:scope.start,end:scope.end,sourceLabel:'Synthetic browser events',capturedAt:source.executedAt};
 data.queries.enquiryStages={rows:[stage],scope,source};
 validatePerformance(data);
 data.queries.enquiryStages.rows.push({...stage});
 assert.throws(()=>validatePerformance(data),/enquiry stage/);
 data.queries.enquiryStages.rows=[{...stage,start:'2026-08-01'}];
 assert.throws(()=>validatePerformance(data),/enquiry stage/);
});
test('daily search must be ordered and nonnegative and artifact identity cannot change',()=>{
 const data=snapshot();
 data.queries.searchDaily.rows=[{date:'2026-09-04',clicks:0,impressions:1},{date:'2026-09-03',clicks:0,impressions:1}];
 assert.throws(()=>validatePerformance(data),/chronological/);
 data.queries.searchDaily.rows=[{date:'2026-09-03',clicks:0,impressions:-1}];
 assert.throws(()=>validatePerformance(data),/search counts/);
 data.id='report:different';
 assert.throws(()=>validatePerformance(data),/identity/);
});

test('hostname counts can overlap and missing page views stay unavailable',()=>{
 const data=snapshot();
 data.queries.trafficHostnames={source,scope,rows:[{hostname:'current.example',visitors:8,views:null},{hostname:'former.example',visitors:3,views:null}]};
 validatePerformance(data);
 assert.equal(data.queries.trafficHostnames.rows[0].views,null);
 data.queries.trafficHostnames.rows[0].visitors=null;
 assert.throws(()=>validatePerformance(data),/hostname traffic/);
});
test('query-page detail does not require fabricated audience combinations',()=>{
 const data=snapshot();
 data.queries.searchDetails={source,scope,rows:[{query:'example service',page:'https://example.test/services',queryGroup:'Services',classificationNote:'Explicit service wording',clicks:0,impressions:2,position:20}]};
 validatePerformance(data);
 data.queries.searchCountries={source,scope,rows:[{country:'Canada',clicks:0,impressions:5,position:15}]};
 validatePerformance(data);
 data.queries.searchDetails.rows[0].classificationNote='';
 assert.throws(()=>validatePerformance(data),/search detail/);
});
