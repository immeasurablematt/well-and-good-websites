import React, {useState} from 'react';
import {DataComponent, DataTable, Dropdown, EvidenceChart, MetricCard, Section, SortableItem, SortableRegion, useDashboardTabs, useDataApp} from '../../data-app-public.jsx';
import './performance.css';
const tabs=[{id:'traffic',label:'Traffic'},{id:'search',label:'Google Search'},{id:'health',label:'Site Health'}];
const number=n=>n==null?'Unavailable':n.toLocaleString('en-CA');
const date=d=>new Date(d+'T12:00:00Z').toLocaleDateString('en-CA',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
const columns=fields=>fields.map(([field,label])=>({field,label}));
function Plot({id,queryId,title,rows,x,y,type='horizontalBar',height=260,children}) {
 return <EvidenceChart id={id} queryId={queryId} title={title} variant="card" rows={rows} sourceRows={rows} height={height}
  spec={{type,x,y,stackable:false,showXAxisLabel:false,showYAxisLabel:false,valueDecimals:y==='visitorShare'?2:0}}>{children}</EvidenceChart>;
}
function Table({id,queryId,title,rows,fields}) {
 return <DataComponent id={id} queryId={queryId} title={title} kind="table" variant="card" displayRows={rows} sourceRows={rows}>
  <DataTable rows={rows} columns={columns(fields)} label={title}/>
 </DataComponent>;
}
export function DashboardContent(){
 const {queries}=useDataApp();
 const {activeTabId}=useDashboardTabs(tabs);
 const [period,setPeriod]=useState('All available days');
 const rows=id=>queries[id]?.rows??[];
 const traffic=rows('traffic')[0];
 const history=rows('searchDaily');
 const daily=period==='Latest 7 available days'?history.slice(-7):history;
 const clicks=daily.reduce((n,r)=>n+r.clicks,0), impressions=daily.reduce((n,r)=>n+r.impressions,0);
 const range=daily.length?`${date(daily[0].date)} to ${date(daily.at(-1).date)}`:'No reviewed dates';
 const latest=history.at(-1)?.date;
 const recent=history.slice(-7), prior=history.slice(-14,-7);
 const completeWeeks=recent.length===7&&prior.length===7&&Date.parse(recent.at(-1).date)-Date.parse(prior[0].date)===13*86400000;
 const comparison=completeWeeks?[['Previous 7 days',prior],['Latest 7 days',recent]].map(([period,rs])=>({period,start:rs[0].date,end:rs.at(-1).date,impressions:rs.reduce((n,r)=>n+r.impressions,0),clicks:rs.reduce((n,r)=>n+r.clicks,0)})):[];
 if(activeTabId==='search')return <div className="wgg-report">
  <Section id="search-period-heading" title="Search visibility" spacing="none" filters={<Dropdown label="History" value={period} choices={['All available days','Latest 7 available days']} onChange={setPeriod} showLabel/>}>
   <p className="wgg-context">{range}. Google Web (text) results for wellandgoodgrowth.ca.</p>
   <Section id="search-metrics" columns={3} spacing="none">
    <MetricCard id="search-impressions" queryId="searchDaily" title="Impressions" value={number(impressions)} displayRows={[{impressions}]} sourceRows={daily}/>
    <MetricCard id="search-clicks" queryId="searchDaily" title="Search clicks" value={number(clicks)} displayRows={[{clicks}]} sourceRows={daily}/>
    <MetricCard id="search-ctr" queryId="searchDaily" title="Click-through rate" value={impressions?`${(100*clicks/impressions).toFixed(2)}%`:'Unavailable'} displayRows={[{clicks,impressions,ctr:impressions?clicks/impressions:null}]} sourceRows={daily}/>
   </Section>
   <Plot id="search-trend" queryId="searchDaily" title="Daily search impressions" rows={daily} x="date" y="impressions" type="line" height={300}/>
  </Section>
  <Section id="search-comparison-heading" title="Latest two complete search weeks" columns={2}>
   <DataComponent id="search-weeks" queryId="searchDaily" title="Week comparison" kind="table" variant="card" displayRows={comparison} sourceRows={[...prior,...recent]}>
    {comparison.length?<DataTable rows={comparison} columns={columns([['period','Period'],['start','From'],['end','Through'],['impressions','Impressions'],['clicks','Clicks']])} searchable={false} label="Search week comparison"/>:<p>Two complete weeks are not yet available.</p>}
   </DataComponent>
   <DataComponent id="search-coverage" queryId="searchDaily" title="Search coverage" kind="custom" variant="card" displayRows={history} sourceRows={history}>
    <p>Google data is available through {latest?date(latest):'an unverified date'}. Search days use Pacific time; traffic days use Toronto time.</p>
    <p>This property covers the new domain. Earlier-domain results are excluded. Impressions measure visibility, not visits or leads.</p>
   </DataComponent>
  </Section>
  <Section id="search-discovery-heading" title="Search queries and landing pages" columns={2}>
   <Table id="search-queries" queryId="searchQueries" title="Top 10 queries, full search history" rows={rows('searchQueries')} fields={[["query","Query"],["impressions","Impressions"],["clicks","Clicks"],["position","Avg. position"]]}/>
   <Table id="search-pages" queryId="searchPages" title="Top 10 pages, full search history" rows={rows('searchPages').map(r=>({...r,page:new URL(r.page).pathname}))} fields={[["page","Page"],["impressions","Impressions"],["clicks","Clicks"],["position","Avg. position"]]}/>
  </Section>
 </div>;
 if(activeTabId==='health')return <div className="wgg-report">
  <Section id="health-heading" title="Current page checks" spacing="none">
   <Table id="page-health" queryId="health" title="Website availability" rows={rows('health').filter(r=>r.checkedAt===rows('health').at(-1)?.checkedAt)} fields={[["page","Page"],["result","Result"],["status","HTTP status"],["responseMs","Response (ms)"],["checkedAt","Checked at (UTC)"]]}/>
   <p className="wgg-context">These are individual HTTP checks, not continuous uptime or browser loading-speed measurements.</p>
  </Section>
  <Section id="measurement-heading" title="Measurement coverage">
   <Table id="measurement-coverage" queryId="measurement" title="What is and is not measured" rows={rows('measurement')} fields={[["measure","Measure"],["status","Status"],["detail","Meaning"]]}/>
  </Section>
 </div>;
 return <div className="wgg-report">
  <p className="wgg-context">{traffic?`${date(traffic.start)} to ${date(traffic.end)}`:'Traffic unavailable'} · Production, all project hostnames · Toronto time</p>
  <SortableRegion id="traffic-canvas" variant="canvas" columns={12} spacing="standard" rows={[
   {id:'traffic-metrics',kind:'metrics',items:['visitors','page-views','bounce-rate']},
   {id:'traffic-discovery',items:['popular-pages','named-referrers']},
   {id:'traffic-audience',items:['device-share','country-share']}
  ]}>
   {[['visitors','Visitors',traffic?.visitors],['page-views','Page views',traffic?.views],['bounce-rate','Bounce rate',traffic?`${Math.round(traffic.bounceRate*100)}%`:null]].map(([id,title,value])=><SortableItem key={id} id={id} label={title} kind="metric" span={4}><MetricCard id={id} queryId="traffic" title={title} value={typeof value==='number'?number(value):value??'Unavailable'} displayRows={rows('traffic')} sourceRows={rows('traffic')}/></SortableItem>)}
   <SortableItem id="popular-pages" label="Top pages" kind="chart" span={6}><Plot id="popular-pages" queryId="pages" title="Top pages by visitors" rows={rows('pages')} x="page" y="visitors" height={320}><p className="wgg-context">Top seven pages. Visitors can appear on more than one page.</p></Plot></SortableItem>
   <SortableItem id="named-referrers" label="Referrers" kind="chart" span={6}><Plot id="named-referrers" queryId="referrers" title="Top named referrers" rows={rows('referrers')} x="referrer" y="visitors" height={320}><p className="wgg-context">Top seven named sources. This is not the full traffic mix.</p></Plot></SortableItem>
   <SortableItem id="device-share" label="Devices" kind="chart" span={6}><Plot id="device-share" queryId="devices" title="Visitors by device" rows={rows('devices')} x="device" y="visitorShare" height={230}/></SortableItem>
   <SortableItem id="country-share" label="Countries" kind="chart" span={6}><Plot id="country-share" queryId="countries" title="Top countries by visitor share" rows={rows('countries')} x="country" y="visitorShare" height={230}><p className="wgg-context">Rounded shares for the top five countries.</p></Plot></SortableItem>
  </SortableRegion>
  <Section id="enquiry-heading" title="Enquiry measurement">
   <DataComponent id="enquiry-status" queryId="measurement" title="Enquiries are not yet measured" kind="custom" variant="card" displayRows={rows('measurement').filter(r=>r.measure==='Enquiries')} sourceRows={rows('measurement').filter(r=>r.measure==='Enquiries')}>
    <p>The current analytics report has no custom enquiry events. Traffic does not establish how many enquiries arrived or became customers.</p>
   </DataComponent>
  </Section>
 </div>;
}
