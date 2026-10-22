import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePerformance} from './validate_performance.mjs';
import {enquiryRows,searchTotals,filterQueryGroup,searchBreakdown} from '../reporting/performance/metrics.mjs';
const source={executedAt:'2026-10-06T14:00:00Z',metricDefinitions:[{label:'Test',definition:'Synthetic verification only'}],caveats:[],evidenceFlow:[{title:'Synthetic test fixture'}]};
const scope={start:'2026-09-03',end:'2026-09-30',timezone:'America/Toronto'};
function snapshot() {
 return {id:'dashboard:753ab71f-4039-4cc4-800e-37d5039539ad',title:'Well and Good Growth · Site performance',queries:Object.fromEntries(['traffic','pages','referrers','devices','countries','searchDaily','searchQueries','searchPages','measurement','health'].map(id=>[id,{rows:[],source}]))};
}
test('selected-date search detail uses weighted rates and matching source rows',()=>{
 const rows=[{date:'2026-09-03',page:'/a',clicks:1,impressions:10,position:2},{date:'2026-09-04',page:'/a',clicks:0,impressions:90,position:10},{date:'2026-09-04',page:'/b',clicks:0,impressions:2,position:20}];
 const all=searchBreakdown(rows,'page',['2026-09-03','2026-09-04']);
 assert.equal(all.displayRows[0].position,9.2);
 assert.equal(all.displayRows[0].ctr,0.01);
 assert.deepEqual(all.sourceRows,rows);
 const first=searchBreakdown(rows,'page',['2026-09-03']);
 assert.equal(first.displayRows[0].position,2);
 assert.equal(first.displayRows[0].ctr,0.1);
 assert.equal(first.sourceRows.length,1);
 assert.deepEqual(searchBreakdown(rows,'page',[]),{sourceRows:[],displayRows:[]});
});
test('dated search detail rejects duplicate, out-of-window and unweighted evidence',()=>{
 const data=snapshot();
 const row={date:scope.start,page:'https://example.test/',clicks:0,impressions:2,position:4};
 data.queries.searchPageHistory={source,scope,rows:[row]};
 validatePerformance(data);
 data.queries.searchPageHistory.rows=[row,{...row}];
 assert.throws(()=>validatePerformance(data),/dated search/);
 data.queries.searchPageHistory.rows=[{...row,date:'2026-10-01'}];
 assert.throws(()=>validatePerformance(data),/dated search/);
 data.queries.searchPageHistory.rows=[{...row,position:null}];
 assert.throws(()=>validatePerformance(data),/dated search/);
});
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
test('optional GA4 rows require dated source evidence and valid aggregate counts',()=>{
 const data=snapshot();
 const ga4Source={...source,propertyId:'560094220'};
 data.queries.ga4Daily={source:ga4Source,scope,rows:[{date:'2026-09-03',sessions:3,engagedSessions:2}]};
 data.queries.ga4Acquisition={source:ga4Source,scope,rows:[{channel:'Organic Search',sessions:3,engagedSessions:2}]};
 data.queries.ga4Campaigns={source:ga4Source,scope,rows:[{campaign:'site_launch',source:'linkedin',medium:'organic_social',sessions:1,engagedSessions:1}]};
 data.queries.ga4Events={source:ga4Source,scope,rows:[{eventName:'enquiry_open',count:1}]};
 validatePerformance(data);
 data.queries.ga4Daily.rows[0].engagedSessions=4;
 assert.throws(()=>validatePerformance(data),/GA4 daily/);
 data.queries.ga4Daily.rows[0].engagedSessions=2;
 data.queries.ga4Campaigns.rows[0].campaign='private-client';
 assert.throws(()=>validatePerformance(data),/GA4 campaign/);
 data.queries.ga4Campaigns.rows[0].campaign='site_launch';
 data.queries.ga4Events.rows[0].eventName='form_submit';
 assert.throws(()=>validatePerformance(data),/GA4 enquiry event/);
 data.queries.ga4Events.rows[0].eventName='enquiry_open';
 data.queries.ga4Daily.scope={...scope,timezone:'UTC'};
 assert.throws(()=>validatePerformance(data),/Growth property/);
 data.queries.ga4Daily.scope=scope;
 data.queries.ga4Acquisition.rows[0].sessions=2;
 assert.throws(()=>validatePerformance(data),/do not reconcile/);
});
