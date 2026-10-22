// Fail before replacing any report when supplied optional measurements are ambiguous.
const isDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') && new Date(value).toISOString().slice(0,10) === value;
const count = value => Number.isSafeInteger(value) && value >= 0;
const stages = ['popup_open','form_start','submit_attempt','success_return','confirmed_received'];
export function validatePerformance(data) {
 if (!data.id?.startsWith('dashboard:') || data.title !== 'Well and Good Growth · Site performance') throw Error('Unexpected dashboard identity');
 for (const id of ['traffic','pages','referrers','devices','countries','searchDaily','searchQueries','searchPages','measurement','health']) {
  const q = data.queries?.[id];
  if (!Array.isArray(q?.rows) || !q.source?.executedAt || !q.source?.evidenceFlow?.length) throw Error(`Missing reviewed evidence: ${id}`);
 }
 const daily = data.queries.searchDaily.rows;
 for (const [i,row] of daily.entries()) {
  if (!isDate(row.date) || (i && row.date <= daily[i-1].date)) throw Error('Search days must be unique and chronological');
  if (!count(row.clicks) || !count(row.impressions)) throw Error('Invalid search counts');
 }
 for (const id of ['trafficDaily','trafficHostnames','trafficAcquisition','trafficPeriods','trafficComparisons','trafficPeriodPages','trafficPeriodReferrers','trafficPeriodDevices','trafficPeriodCountries','trafficPeriodAcquisition','trafficMonthly','searchDetails','searchCountries','searchDevices','searchPageHistory','searchQueryHistory','enquiryStages','ga4Daily','ga4Acquisition','ga4Campaigns','ga4Events']) {
  const q = data.queries[id];
  if (!q) continue;
  if (!Array.isArray(q.rows) || !q.source?.executedAt || !q.source?.evidenceFlow?.length || !q.source?.metricDefinitions?.length || !Array.isArray(q.source?.caveats)) throw Error(`Missing reviewed evidence: ${id}`);
  if (!isDate(q.scope?.start) || !isDate(q.scope?.end) || q.scope.start > q.scope.end || !q.scope.timezone) throw Error(`Missing dated scope: ${id}`);
  if (id.startsWith('ga4') && (q.scope.timezone !== 'America/Toronto' || q.source.propertyId !== '560094220')) throw Error('GA4 source must use the verified Growth property and its time zone');
  if (id === 'ga4Daily') for (const [i,row] of q.rows.entries()) {
   if (!isDate(row.date) || (i && row.date <= q.rows[i-1].date) || row.date < q.scope.start || row.date > q.scope.end || !count(row.sessions) || !count(row.engagedSessions) || row.engagedSessions > row.sessions) throw Error('Invalid GA4 daily sessions');
  }
  if (id === 'ga4Acquisition') {
   const seen = new Set();
   for (const row of q.rows) {
    if (!row.channel || seen.has(row.channel) || !count(row.sessions) || !count(row.engagedSessions) || row.engagedSessions > row.sessions) throw Error('Invalid GA4 acquisition');
    seen.add(row.channel);
   }
  }
  if (id === 'ga4Campaigns') {
   const seen = new Set();
   for (const row of q.rows) {
    const key = JSON.stringify([row.campaign,row.source,row.medium]);
    if (!['autumn_services','site_launch'].includes(row.campaign) || !['linkedin','facebook','email','newsletter','referral'].includes(row.source) || !['organic_social','email','referral'].includes(row.medium) || seen.has(key) || !count(row.sessions) || !count(row.engagedSessions) || row.engagedSessions > row.sessions) throw Error('Invalid GA4 campaign');
    seen.add(key);
   }
  }
  if (id === 'ga4Events') {
   const seen = new Set();
   for (const row of q.rows) {
    if (!['enquiry_open','enquiry_start','enquiry_submit_attempt','enquiry_return'].includes(row.eventName) || seen.has(row.eventName) || !count(row.count)) throw Error('Invalid GA4 enquiry event');
    seen.add(row.eventName);
   }
  }
  if (id === 'searchPageHistory' || id === 'searchQueryHistory') {
   const dimension = id === 'searchPageHistory' ? 'page' : 'query';
   const seen = new Set();
   for (const row of q.rows) {
    const key = JSON.stringify([row.date,row[dimension]]);
    if (!isDate(row.date) || row.date < q.scope.start || row.date > q.scope.end || !row[dimension] || seen.has(key) || !count(row.clicks) || !count(row.impressions) || (row.impressions > 0 && !Number.isFinite(row.position))) throw Error('Invalid dated search breakdown');
    seen.add(key);
   }
  }
  if (id === 'trafficAcquisition') for (const row of q.rows) {
   if (!row.referrer || !count(row.views) || !count(row.visitors)) throw Error('Invalid acquisition breakdown');
  }
  if (id === 'enquiryStages') {
   const seen = new Set();
   for (const row of q.rows) {
    if (!stages.includes(row.stage) || seen.has(row.stage) || !(row.count === null || count(row.count)) || !isDate(row.start) || !isDate(row.end) || row.start > row.end || row.start < q.scope.start || row.end > q.scope.end || !row.sourceLabel || !row.capturedAt) throw Error('Invalid enquiry stage evidence');
    seen.add(row.stage);
   }
  }
  if (id === 'trafficDaily') for (const [i,row] of q.rows.entries()) {
   if (!isDate(row.date) || (i && row.date <= q.rows[i-1].date) || row.date < q.scope.start || row.date > q.scope.end || !count(row.views) || (row.visitors != null && !count(row.visitors))) throw Error('Invalid daily traffic');
  }
  if (id === 'trafficComparisons') {
   if (!data.queries.trafficPeriods) throw Error('Traffic comparisons need period totals');
   const seen=new Set();
   for (const row of q.rows) {
    const current=data.queries.trafficPeriods.rows.find(item=>item.period===row.period);
    const days=(start,end)=>Math.round((Date.parse(`${end}T00:00:00Z`)-Date.parse(`${start}T00:00:00Z`))/86400000)+1;
    if (!['Week','Month'].includes(row.period) || seen.has(row.period) || !current ||
        ![row.start,row.end,row.priorStart,row.priorEnd].every(isDate) ||
        row.start!==current.start || row.end!==current.end || row.views!==current.views ||
        !count(row.priorViews) || row.priorStart<q.scope.start || row.end>q.scope.end ||
        days(row.start,row.end)!==days(row.priorStart,row.priorEnd) ||
        Date.parse(`${row.start}T00:00:00Z`)-Date.parse(`${row.priorEnd}T00:00:00Z`)!==86400000) throw Error('Invalid traffic comparison');
    seen.add(row.period);
   }
  }
  if (id === 'trafficMonthly') for (const [i,row] of q.rows.entries()) {
   if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(row.month) || (i && row.month <= q.rows[i-1].month) || !count(row.views)) throw Error('Invalid monthly traffic');
  }
  if (id === 'trafficHostnames') for (const row of q.rows) {
   if (!row.hostname || !(row.views == null || count(row.views)) || !(row.visitors == null || count(row.visitors)) || (row.views == null && row.visitors == null)) throw Error('Invalid hostname traffic');
  }
  if (id === 'searchCountries' || id === 'searchDevices') for (const row of q.rows) {
   if (!row[id === 'searchCountries' ? 'country' : 'device'] || !count(row.clicks) || !count(row.impressions) || !Number.isFinite(row.position)) throw Error('Invalid search audience');
  }
  if (id === 'searchDetails') for (const row of q.rows) {
   if (!row.query || !row.page || !['Brand','Services','Project or business names','Other'].includes(row.queryGroup) || !row.classificationNote || !count(row.clicks) || !count(row.impressions) || !Number.isFinite(row.position)) throw Error('Invalid search detail');
  }
 }
 const periodQueries=['trafficPeriods','trafficPeriodPages','trafficPeriodReferrers','trafficPeriodDevices','trafficPeriodCountries','trafficPeriodAcquisition','trafficMonthly'];
 if (data.queries.traffic.rows.length && periodQueries.some(id=>!data.queries[id])) throw Error('Incomplete traffic period evidence');
 if (periodQueries.some(id=>data.queries[id])) {
  if (periodQueries.some(id=>!data.queries[id]) || !data.queries.trafficDaily) throw Error('Incomplete traffic period evidence');
  const periods=data.queries.trafficPeriods.rows;
  if (periods.length!==3 || periods.map(row=>row.period).join('|')!=='Week|Month|All time') throw Error('Invalid traffic periods');
  for (const row of periods) {
   if (!isDate(row.start) || !isDate(row.end) || row.start>row.end || !count(row.visitors) || !count(row.views) || !Number.isFinite(row.bounceRate) || row.bounceRate<0 || row.bounceRate>1) throw Error('Invalid traffic period total');
   if (row.end !== data.queries.trafficDaily.scope.end) throw Error('Traffic period and daily history dates differ');
   const start=new Date(`${row.end}T00:00:00Z`);
   if (row.period==='All time') {
    if (row.start!==data.queries.trafficPeriods.scope.start) throw Error('Invalid all-time coverage');
   } else {
    start.setUTCDate(start.getUTCDate()-(row.period==='Week'?6:29));
    if (row.start!==start.toISOString().slice(0,10)) throw Error('Invalid traffic period dates');
   }
   for (const id of periodQueries.slice(1,-1)) {
    const q=data.queries[id], selected=q.rows.filter(item=>item.period===row.period);
    if ((!selected.length && row.views>0 && id!=='trafficPeriodReferrers') || selected.some(item=>!count(item.visitors) || (item.views!=null && !count(item.views)) || (item.visitorShare!=null && (!Number.isFinite(item.visitorShare) || item.visitorShare<0 || item.visitorShare>1)))) throw Error(`Invalid traffic period breakdown: ${id}`);
    if (['trafficPeriodDevices','trafficPeriodCountries'].includes(id) && selected.some(item=>!Number.isFinite(item.visitorShare) || Math.abs(item.visitorShare-item.visitors/row.visitors)>1e-9)) throw Error(`Traffic visitor share does not reconcile: ${id}`);
    if (['trafficPeriodPages','trafficPeriodAcquisition'].includes(id) && selected.reduce((sum,item)=>sum+item.views,0)!==row.views) throw Error(`Traffic period page views do not reconcile: ${id}`);
   }
   const days=data.queries.trafficDaily.rows.filter(day=>day.date>=row.start&&day.date<=row.end);
   if (row.period!=='All time' && days.reduce((sum,day)=>sum+day.views,0)!==row.views) throw Error('Traffic period daily views do not reconcile');
  }
  if (data.queries.trafficMonthly.rows.reduce((sum,row)=>sum+row.views,0)!==periods[2].views) throw Error('Monthly traffic does not reconcile to all time');
 }
 const dailyGa4=data.queries.ga4Daily;
 const channelsGa4=data.queries.ga4Acquisition;
 if (dailyGa4?.rows.length && channelsGa4?.rows.length &&
     dailyGa4.scope.start === channelsGa4.scope.start && dailyGa4.scope.end === channelsGa4.scope.end &&
     dailyGa4.rows.reduce((sum,row)=>sum+row.sessions,0) !== channelsGa4.rows.reduce((sum,row)=>sum+row.sessions,0)) {
  throw Error('GA4 daily and channel session totals do not reconcile');
 }
}
