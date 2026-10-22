import React, {useState} from 'react';
import {DataComponent, DataTable, Dropdown, EvidenceChart, MetricCard, Section, SortableItem, SortableRegion, useDashboardTabs, useDataApp} from '../../data-app-public.jsx';
import './performance.css';
import {enquiryRows, searchTotals, queryGroups, filterQueryGroup, searchBreakdown, reportPeriods, rowsForPeriod} from './metrics.mjs';
const tabs=[{id:'traffic',label:'Traffic'},{id:'search',label:'Google Search'},{id:'health',label:'Site Health'}];
const number=n=>n==null?'Unavailable':n.toLocaleString('en-CA');
const date=d=>new Date(d+'T12:00:00Z').toLocaleDateString('en-CA',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
const dayCount=(start,end)=>start&&end?Math.round((Date.parse(`${end}T00:00:00Z`)-Date.parse(`${start}T00:00:00Z`))/86400000)+1:0;
const columns=fields=>fields.map(([field,label])=>({field,label}));
function Plot({id,queryId,title,rows,sourceRows=rows,x,y,type='horizontalBar',height=260,children}) {
 return <EvidenceChart id={id} queryId={queryId} title={title} variant="card" rows={rows} sourceRows={sourceRows} height={height}
  spec={{type,x,y,stackable:false,showXAxisLabel:false,showYAxisLabel:false,valueDecimals:y==='visitorShare'?2:0}}>{children}</EvidenceChart>;
}
function Table({id,queryId,title,rows,fields,sourceRows=rows}) {
 return <DataComponent id={id} queryId={queryId} title={title} kind="table" variant="card" displayRows={rows} sourceRows={sourceRows}>
  <DataTable rows={rows} columns={columns(fields)} label={title}/>
 </DataComponent>;
}
export function DashboardContent(){
 const {queries}=useDataApp();
 const {activeTabId}=useDashboardTabs(tabs);
 const [period,setPeriod]=useState('Month');
 const [queryGroup,setQueryGroup]=useState('All queries');
 const rows=id=>queries[id]?.rows??[];
 const traffic=rows('trafficPeriods').find(row=>row.period===period);
 const trafficRows=id=>rows(id).filter(row=>row.period===period);
 const acquisition=trafficRows('trafficPeriodAcquisition');
 const acquisitionViews=acquisition.reduce((sum,row)=>sum+row.views,0);
 const unrecorded=acquisition.find(row=>row.referrer==='No referrer recorded');
 const referrerCoverage=traffic&&acquisition.length&&acquisitionViews===traffic.views&&traffic.views>0&&unrecorded?{
  views:unrecorded.views,total:acquisitionViews,percent:Math.round(100*unrecorded.views/acquisitionViews)
 }:null;
 const received=rows('enquiryStages').find(row=>row.stage==='confirmed_received'&&Number.isInteger(row.count)&&row.count>=0&&row.start&&row.end);
 const candidateComparison=rows('trafficComparisons').find(row=>row.period===period);
 const trafficComparison=period!=='All time'&&traffic&&candidateComparison&&
  candidateComparison.start===traffic.start&&candidateComparison.end===traffic.end&&candidateComparison.views===traffic.views&&
  Number.isInteger(candidateComparison.priorViews)&&candidateComparison.priorViews>=0&&
  dayCount(candidateComparison.start,candidateComparison.end)===dayCount(candidateComparison.priorStart,candidateComparison.priorEnd)&&
  Date.parse(`${candidateComparison.start}T00:00:00Z`)-Date.parse(`${candidateComparison.priorEnd}T00:00:00Z`)===86400000
  ?candidateComparison:null;
 const comparisonDays=period==='Week'?'7':period==='Month'?'30':null;
 const viewChange=trafficComparison?trafficComparison.views-trafficComparison.priorViews:null;
 const changePercent=trafficComparison?.priorViews?Math.round(100*viewChange/trafficComparison.priorViews):null;
 const topPages=trafficRows('trafficPeriodPages').sort((a,b)=>b.visitors-a.visitors).slice(0,7);
 const topReferrers=trafficRows('trafficPeriodReferrers').sort((a,b)=>b.visitors-a.visitors).slice(0,7);
 const ga4Daily=rowsForPeriod(rows('ga4Daily'),period);
 const history=rows('searchDaily');
 const daily=rowsForPeriod(history,period);
 const {clicks,impressions,ctr}=searchTotals(daily);
 const pageHistory=searchBreakdown(rows('searchPageHistory'),'page',daily.map(row=>row.date));
 const queryHistory=searchBreakdown(rows('searchQueryHistory'),'query',daily.map(row=>row.date));
 const scopedRange=id=>queries[id]?.scope?`${date(queries[id].scope.start)} to ${date(queries[id].scope.end)} (${queries[id].scope.timezone})`:'the saved source window';
 const details=filterQueryGroup(rows('searchDetails'),queryGroup);
 const enquiryQuery=queries.enquiryStages?'enquiryStages':'measurement';
 const range=daily.length?`${date(daily[0].date)} to ${date(daily.at(-1).date)}`:'No reviewed dates';
 const latest=history.at(-1)?.date;
 const recent=history.slice(-7), prior=history.slice(-14,-7);
 const completeWeeks=recent.length===7&&prior.length===7&&Date.parse(recent.at(-1).date)-Date.parse(prior[0].date)===13*86400000;
 const comparison=completeWeeks?[['Previous 7 days',prior],['Latest 7 days',recent]].map(([period,rs])=>({period,start:rs[0].date,end:rs.at(-1).date,impressions:rs.reduce((n,r)=>n+r.impressions,0),clicks:rs.reduce((n,r)=>n+r.clicks,0)})):[];
 if(activeTabId==='search')return <div className="wgg-report">
  <Section id="search-period-heading" title="Search visibility" spacing="none" filters={<Dropdown label="Period" value={period} choices={reportPeriods} onChange={setPeriod} showLabel/>}>
   <p className="wgg-context">{range}. Google Web (text) results for wellandgoodgrowth.ca.</p>
   <Section id="search-metrics" columns={3} spacing="none">
    <MetricCard id="search-impressions" queryId="searchDaily" title="Impressions" value={number(impressions)} displayRows={[{impressions}]} sourceRows={daily}/>
    <MetricCard id="search-clicks" queryId="searchDaily" title="Search clicks" value={number(clicks)} displayRows={[{clicks}]} sourceRows={daily}/>
    <MetricCard id="search-ctr" queryId="searchDaily" title="Click-through rate" value={ctr!=null?`${(100*ctr).toFixed(2)}%`:'Unavailable'} displayRows={[{clicks,impressions,ctr}]} sourceRows={daily}/>
   </Section>
   <Plot id="search-trend" queryId="searchDaily" title="Daily search impressions" rows={daily} x="date" y="impressions" type="line" height={300}/>
   <Plot id="search-click-trend" queryId="searchDaily" title="Daily search clicks" rows={daily} x="date" y="clicks" type="line" height={200}/>
  </Section>
  {(queries.searchPageHistory&&queries.searchQueryHistory)&&<Section id="search-exploration-heading" title="Search discovery in the selected dates">
   <p className="wgg-context">{range}. These rankings follow Period. Page impressions can overlap and Google omits anonymized queries. Neither breakdown replaces the property totals above.</p>
   <Section id="search-exploration-charts" columns={2} spacing="none">
    <Plot id="search-page-ranking" queryId="searchPageHistory" title="Top pages by search impressions" rows={pageHistory.displayRows.slice(0,10).map(row=>({...row,page:new URL(row.page).pathname}))} sourceRows={pageHistory.sourceRows.filter(row=>pageHistory.displayRows.slice(0,10).some(top=>top.page===row.page))} x="page" y="impressions" height={300}/>
    <Plot id="search-query-ranking" queryId="searchQueryHistory" title="Top disclosed queries by impressions" rows={queryHistory.displayRows.slice(0,10)} sourceRows={queryHistory.sourceRows.filter(row=>queryHistory.displayRows.slice(0,10).some(top=>top.query===row.query))} x="query" y="impressions" height={300}/>
   </Section>
   <Table id="search-page-performance" queryId="searchPageHistory" title="Landing page search performance" rows={pageHistory.displayRows.map(row=>({...row,page:new URL(row.page).pathname,ctr:row.ctr==null?'Unavailable':`${(row.ctr*100).toFixed(2)}%`,position:row.position==null?'Unavailable':row.position.toFixed(1)}))} sourceRows={pageHistory.sourceRows} fields={[["page","Page"],["impressions","Impressions"],["clicks","Clicks"],["ctr","CTR"],["position","Avg. position"]]}/>
  </Section>}
  <Section id="search-comparison-heading" title="Latest two complete search weeks" columns={2}>
   <DataComponent id="search-weeks" queryId="searchDaily" title="Week comparison" kind="table" variant="card" displayRows={comparison} sourceRows={[...prior,...recent]}>
    {comparison.length?<DataTable rows={comparison} columns={columns([['period','Period'],['start','From'],['end','Through'],['impressions','Impressions'],['clicks','Clicks']])} searchable={false} label="Search week comparison"/>:<p>Two complete weeks are not yet available.</p>}
   </DataComponent>
   <DataComponent id="search-coverage" queryId="searchDaily" title="Search coverage" kind="custom" variant="card" displayRows={history} sourceRows={history}>
    <p>Saved Google data covers through {latest?date(latest):'an unverified date'}. Search days use Pacific time; traffic days use Toronto time.</p>
    <p>This is an early baseline for a new business. Small counts and short history can move sharply; there is no established growth target.</p><p>This property covers the new domain. Earlier-domain results are excluded. Impressions measure visibility, not visits or enquiries.</p>
   </DataComponent>
  </Section>
  <p className="wgg-context">Period changes the headline counts, daily trends and selected-date discovery above. The week comparison and aggregate tables below retain their saved windows. Query rows omit anonymized searches and must not be added to reconstruct property totals.</p>
  {(queries.searchQueries?.scope||queries.searchPages?.scope)&&<p className="wgg-context">Query table: {scopedRange('searchQueries')}. Page table: {scopedRange('searchPages')}.</p>}
  <Section id="search-discovery-heading" title="Search queries and landing pages" columns={2}>
   <Table id="search-queries" queryId="searchQueries" title="Top 10 queries, saved search window" rows={rows('searchQueries')} fields={[["query","Query"],["impressions","Impressions"],["clicks","Clicks"],["position","Avg. position"]]}/>
   <Table id="search-pages" queryId="searchPages" title="Top 10 pages, saved search window" rows={rows('searchPages').map(r=>({...r,page:new URL(r.page).pathname}))} sourceRows={rows('searchPages')} fields={[["page","Page"],["impressions","Impressions"],["clicks","Clicks"],["position","Avg. position"]]}/>
  </Section>
  {(queries.searchCountries||queries.searchDevices)&&<Section id="search-audience-heading" title="Search audience" columns={2}>
   {queries.searchCountries&&<div><p className="wgg-context">{scopedRange('searchCountries')}. Country breakdown, independently captured.</p><Table id="search-countries" queryId="searchCountries" title="Search by country" rows={rows('searchCountries')} fields={[["country","Country"],["impressions","Impressions"],["clicks","Clicks"],["position","Avg. position"]]}/></div>}
   {queries.searchDevices&&<div><p className="wgg-context">{scopedRange('searchDevices')}. Device breakdown, independently captured.</p><Table id="search-devices" queryId="searchDevices" title="Search by device" rows={rows('searchDevices')} fields={[["device","Device"],["impressions","Impressions"],["clicks","Clicks"],["position","Avg. position"]]}/></div>}
  </Section>}
  {queries.searchDetails&&<Section id="search-details-heading" title="Queries by landing page" filters={<Dropdown label="Query group" value={queryGroup} choices={queryGroups} onChange={setQueryGroup} showLabel/>}>
   <p className="wgg-context">{scopedRange('searchDetails')}. Groups are reviewed labels, not proof of buyer intent. These rows are a partial breakdown and do not reconcile to the property total.</p>
   <Table id="search-details" queryId="searchDetails" title="Captured search detail" rows={details} fields={[["query","Query"],["page","Page"],...(details.some(row=>row.country)?[["country","Country"]]:[]),...(details.some(row=>row.device)?[["device","Device"]]:[]),["queryGroup","Group"],["impressions","Impressions"],["clicks","Clicks"],["position","Avg. position"],["classificationNote","Grouping basis"]]}/>
  </Section>}
 </div>;
 if(activeTabId==='health')return <div className="wgg-report">
  <Section id="health-heading" title="Current page checks" spacing="none">
   <Table id="page-health" queryId="health" title="Latest HTTP page checks" rows={rows('health').filter(r=>r.checkedAt===rows('health').at(-1)?.checkedAt)} fields={[["page","Page"],["result","Result"],["status","HTTP status"],["responseMs","Response (ms)"],["checkedAt","Checked date (UTC)"]]}/>
   <p className="wgg-context">Each row records one request at the shown time. These checks do not measure continuous uptime or how quickly a page loads in a browser.</p>
  </Section>
  <Section id="health-history-heading" title="Page-check history" filters={<Dropdown label="Period" value={period} choices={reportPeriods} onChange={setPeriod} showLabel/>}>
   <p className="wgg-context">{period} of saved checks through {rows('health').at(-1)?.checkedAt?.slice(0,10)??'an unverified date'}. Current page checks above always show the latest run.</p>
   <Table id="page-health-history" queryId="health" title="Retained checks" rows={rowsForPeriod(rows('health'),period,'checkedAt')} fields={[["checkedAt","Checked at (UTC)"],["page","Page"],["result","Result"],["status","HTTP status"],["responseMs","Response (ms)"]]}/>
  </Section>
  <Section id="measurement-heading" title="Measurement coverage">
   <Table id="measurement-coverage" queryId="measurement" title="What is and is not measured" rows={rows('measurement')} fields={[["measure","Measure"],["status","Status"],["detail","Meaning"]]}/>
  </Section>
 </div>;
 return <div className="wgg-report">
  <Section id="traffic-period-heading" title="Traffic" spacing="none" filters={<Dropdown label="Period" value={period} choices={reportPeriods} onChange={setPeriod} showLabel/>}>
   <p className="wgg-context">{traffic?`${date(traffic.start)} to ${date(traffic.end)}`:'Traffic unavailable'} · Production, all project hostnames · Toronto time</p>
   {period==='All time'&&<p className="wgg-context">All available Vercel records begin June 1, 2026. Earlier history is outside the saved source coverage.</p>}
   <p className="wgg-context">An early baseline for a new business. A bounce is not evidence that an enquiry failed.</p>
  </Section>
  <Section id="traffic-summary-heading" title="What to know" columns={3} spacing="none">
   <DataComponent id="traffic-comparison" queryId={trafficComparison?'trafficComparisons':'trafficPeriods'} title="Change from the prior period" kind="custom" variant="card" displayRows={trafficComparison?[{...trafficComparison,change:viewChange,changePercent}]:traffic?[traffic]:[]} sourceRows={trafficComparison?[trafficComparison]:traffic?[traffic]:[]}>
    <div className="wgg-summary-card">
     <p className="wgg-summary-label">Page views {comparisonDays?`vs previous ${comparisonDays} days`:''}</p>
     {trafficComparison?<>
      <p className="wgg-summary-value">{viewChange>0?'+':''}{number(viewChange)}{changePercent!=null?` (${changePercent>0?'+':''}${changePercent}%)`:''}</p>
      <p className="wgg-summary-detail">{number(trafficComparison.views)} from {date(trafficComparison.start)} to {date(trafficComparison.end)}; {number(trafficComparison.priorViews)} from {date(trafficComparison.priorStart)} to {date(trafficComparison.priorEnd)}.</p>
      <p className="wgg-summary-detail">Both windows include the former domain. One comparison does not establish a cause or trend.</p>
     </>:<>
      <p className="wgg-summary-value">Unavailable</p>
      <p className="wgg-summary-detail">{period==='All time'?'All available history has no comparable prior period.':'A verified, equal-length prior window is not in this report.'}</p>
     </>}
    </div>
   </DataComponent>
   <DataComponent id="confirmed-enquiries-summary" queryId={enquiryQuery} title="Confirmed enquiries" kind="custom" variant="card" displayRows={received?[received]:[]} sourceRows={received?[received]:rows(enquiryQuery)}>
    <div className="wgg-summary-card">
     <p className="wgg-summary-label">Received enquiries</p>
     <p className="wgg-summary-value">{received?number(received.count):'Unavailable'}</p>
     <p className="wgg-summary-detail">{received?`${date(received.start)} to ${date(received.end)}. Receipt count has its own source window.`:'No reviewed receipt count is in the report. A form open is not a received enquiry.'}</p>
    </div>
   </DataComponent>
   <DataComponent id="referrer-coverage-summary" queryId="trafficPeriodAcquisition" title="Referrer coverage" kind="custom" variant="card" displayRows={referrerCoverage?[{...referrerCoverage,period}]:[]} sourceRows={acquisition}>
    <div className="wgg-summary-card">
     <p className="wgg-summary-label">No referrer recorded</p>
     <p className="wgg-summary-value">{referrerCoverage?`${referrerCoverage.percent}%`:'Unavailable'}</p>
     <p className="wgg-summary-detail">{referrerCoverage?`${number(referrerCoverage.views)} of ${number(referrerCoverage.total)} page views in ${period.toLowerCase()}.`: 'The selected page-view groups do not reconcile to the period total.'} This does not mean all were direct visits.</p>
    </div>
   </DataComponent>
  </Section>
  <p className="wgg-next-check">Next check: {received?'compare verified receipts with the separate form activity signals.':'review form and direct-email receipts before reporting enquiries.'}</p>
  <SortableRegion id="traffic-canvas" variant="canvas" columns={12} spacing="standard" rows={[
   {id:'traffic-metrics',kind:'metrics',items:['visitors','page-views','bounce-rate']},
   {id:'traffic-discovery',items:['popular-pages','named-referrers']},
   {id:'traffic-audience',items:['device-share','country-share']}
  ]}>
   {[['visitors','Visitors',traffic?.visitors],['page-views','Page views',traffic?.views],['bounce-rate','Bounce rate',traffic?`${Math.round(traffic.bounceRate*100)}%`:null]].map(([id,title,value])=><SortableItem key={id} id={id} label={title} kind="metric" span={4}><MetricCard id={id} queryId="trafficPeriods" title={title} value={typeof value==='number'?number(value):value??'Unavailable'} displayRows={traffic?[traffic]:[]} sourceRows={traffic?[traffic]:[]}/></SortableItem>)}
   <SortableItem id="popular-pages" label="Top pages" kind="chart" span={6}><Plot id="popular-pages" queryId="trafficPeriodPages" title="Top pages by visitors" rows={topPages} x="page" y="visitors" height={320}><p className="wgg-context">Top seven pages. Visitors can appear on more than one page.</p></Plot></SortableItem>
   <SortableItem id="named-referrers" label="Referrers" kind="chart" span={6}><Plot id="named-referrers" queryId="trafficPeriodReferrers" title="Top named referrers" rows={topReferrers} x="referrer" y="visitors" height={320}><p className="wgg-context">Top seven named sources by visitors. The referrer coverage above shows how much of the selected period has no recorded referring website.</p></Plot></SortableItem>
   <SortableItem id="device-share" label="Devices" kind="chart" span={6}><Plot id="device-share" queryId="trafficPeriodDevices" title="Visitors by device" rows={trafficRows('trafficPeriodDevices')} x="device" y="visitorShare" height={230}/></SortableItem>
   <SortableItem id="country-share" label="Countries" kind="chart" span={6}><Plot id="country-share" queryId="trafficPeriodCountries" title="Top countries by visitor share" rows={trafficRows('trafficPeriodCountries').slice(0,5).map(row=>({...row,country:/^[A-Z]{2}$/.test(row.country)?new Intl.DisplayNames(['en'],{type:'region'}).of(row.country):row.country}))} sourceRows={trafficRows('trafficPeriodCountries').slice(0,5)} x="country" y="visitorShare" height={230}><p className="wgg-context">Top five countries. A visitor can appear in more than one group.</p></Plot></SortableItem>
  </SortableRegion>
  {queries.trafficDaily&&<Section id="traffic-trend-heading" title={period==='All time'?'Monthly traffic':'Daily traffic'}>
   <p className="wgg-context">{period==='All time'?'June 1 to October 21, 2026. October is a partial month.':`${date(traffic?.start??queries.trafficDaily.scope.start)} to ${date(traffic?.end??queries.trafficDaily.scope.end)}.`} Period visitors come from the exact window total, not summed daily or monthly visitor counts.</p>
   {period==='All time'?<Plot id="traffic-daily-views" queryId="trafficMonthly" title="Monthly page views" rows={rows('trafficMonthly')} x="month" y="views" type="line" height={260}/>:<Plot id="traffic-daily-views" queryId="trafficDaily" title="Daily page views" rows={rowsForPeriod(rows('trafficDaily'),period)} x="date" y="views" type="line" height={260}/>}
  </Section>}
  {queries.trafficHostnames&&<Section id="traffic-hostnames-heading" title="Current and former domains">
   <p className="wgg-context">Saved hostname window: {scopedRange('trafficHostnames')}. This table has its own saved dates and does not follow Period. A visitor can appear on more than one hostname; hostname visitors are not added together.</p>
   <Table id="traffic-hostnames" queryId="trafficHostnames" title="Captured hostname traffic" rows={rows('trafficHostnames').map(row=>({...row,views:row.views??'Unavailable',visitors:row.visitors??'Unavailable'}))} sourceRows={rows('trafficHostnames')} fields={[["hostname","Hostname"],["views","Page views"],["visitors","Visitors"]]}/>
  </Section>}
  {queries.trafficPeriodAcquisition&&<Section id="traffic-acquisition-heading" title="Acquisition coverage">
   <p className="wgg-context">{traffic?`${date(traffic.start)} to ${date(traffic.end)}`:'Selected period'}. “No referrer recorded” means Vercel received no referring website address. This can happen with bookmarks, typed addresses, links from email or apps, or browser privacy settings. These are page views, not people.</p>
   <Plot id="traffic-acquisition" queryId="trafficPeriodAcquisition" title="Page views by recorded referrer" rows={trafficRows('trafficPeriodAcquisition')} x="referrer" y="views" height={300}/>
  </Section>}
  {!!queries.ga4Daily?.rows.length&&<Section id="ga4-engagement-heading" title="Google Analytics engagement">
   <p className="wgg-context">{period} of available GA4 days through {rows('ga4Daily').at(-1)?.date}. Consent-based sessions begin after activation. These counts are separate from Vercel visitors and page views above.</p>
   <Section id="ga4-engagement-metrics" columns={3} spacing="none">
    {(() => {
     const data=ga4Daily;
     const sessions=data.reduce((sum,row)=>sum+row.sessions,0);
     const engaged=data.reduce((sum,row)=>sum+row.engagedSessions,0);
     return <>
      <MetricCard id="ga4-sessions" queryId="ga4Daily" title="Sessions" value={number(sessions)} displayRows={[{sessions}]} sourceRows={data}/>
      <MetricCard id="ga4-engaged" queryId="ga4Daily" title="Engaged sessions" value={number(engaged)} displayRows={[{engagedSessions:engaged}]} sourceRows={data}/>
      <MetricCard id="ga4-engagement-rate" queryId="ga4Daily" title="Engagement rate" value={sessions?`${(100*engaged/sessions).toFixed(1)}%`:'Unavailable'} displayRows={[{sessions,engagedSessions:engaged}]} sourceRows={data}/>
     </>;
    })()}
   </Section>
   <Plot id="ga4-sessions-daily" queryId="ga4Daily" title="Daily sessions" rows={ga4Daily} x="date" y="sessions" type="line" height={250}/>
  </Section>}
  {queries.ga4Acquisition&&<Section id="ga4-acquisition-heading" title="How GA4 sessions arrived">
   <p className="wgg-context">Saved GA4 channel window: {scopedRange('ga4Acquisition')}. This section has its own saved dates and does not follow Period. Each session belongs to one saved channel row. GA4 sessions and Vercel visitors have different definitions.</p>
   <Plot id="ga4-channels" queryId="ga4Acquisition" title="Sessions by channel" rows={rows('ga4Acquisition')} x="channel" y="sessions" height={280}/>
   <Table id="ga4-channel-detail" queryId="ga4Acquisition" title="Channel engagement" rows={rows('ga4Acquisition').map(row=>({...row,engagementRate:row.sessions?`${(100*row.engagedSessions/row.sessions).toFixed(1)}%`:'Unavailable'}))} sourceRows={rows('ga4Acquisition')} fields={[["channel","Channel"],["sessions","Sessions"],["engagedSessions","Engaged sessions"],["engagementRate","Engagement rate"]]}/>
  </Section>}
  {queries.ga4Campaigns&&<Section id="ga4-campaigns-heading" title="Tagged campaign visits">
   <p className="wgg-context">{scopedRange('ga4Campaigns')}. Only the site's approved campaign labels are shown. Untagged visits and unapproved labels are outside this table.</p>
   <Table id="ga4-campaigns" queryId="ga4Campaigns" title="Captured campaign sessions" rows={rows('ga4Campaigns')} fields={[["campaign","Campaign"],["source","Source"],["medium","Medium"],["sessions","Sessions"],["engagedSessions","Engaged sessions"]]}/>
  </Section>}
  {queries.ga4Events&&<Section id="ga4-enquiry-heading" title="GA4 enquiry activity">
   <p className="wgg-context">{scopedRange('ga4Events')}. These are consent-based actions, not unique people or confirmed received enquiries. Verification activity is excluded where the source permits.</p>
   <Table id="ga4-enquiry-events" queryId="ga4Events" title="Enquiry actions recorded by GA4" rows={rows('ga4Events')} fields={[["eventName","Event"],["count","Recorded actions"]]}/>
  </Section>}
  <Section id="enquiry-heading" title="Enquiry measurement">
   <Table id="enquiry-status" queryId={enquiryQuery} title="Enquiry signals and confirmed receipt" rows={enquiryRows(rows('enquiryStages'))} sourceRows={rows(enquiryQuery)} fields={[["stage","Stage"],["count","Count"],["from","From"],["through","Through"],["meaning","Meaning"]]}/>
   <p className="wgg-context">Unavailable means no reviewed count has been imported. These are separate signals, not a deduplicated funnel: repeated actions, blocked analytics and different coverage can affect counts. Only confirmed receipt establishes an enquiry arrived. No enquiry rate is inferred from traffic.</p>
  </Section>
 </div>;
}
