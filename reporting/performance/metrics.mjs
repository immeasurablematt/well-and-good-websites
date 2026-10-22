// Presentation helpers shared with the reporting checks. Never derive leads from visits.
export const enquiryStages = [
 ['popup_open', 'Enquiry popup opens', 'Opening the form signals interest, not an enquiry.'],
 ['form_start', 'Forms started', 'First form interaction; no field contents are collected.'],
 ['submit_attempt', 'Valid submission attempts', 'The form passed browser validation and was submitted. Delivery is not established.'],
 ['success_return', 'Thank-you returns', 'A return to the success page is a signal, not proof of receipt.'],
 ['confirmed_received', 'Confirmed enquiries received', 'Counted separately from an authoritative receipt log; no names or message contents.'],
];
export function enquiryRows(rows = []) {
 return enquiryStages.map(([stage, label, meaning]) => {
  const observed = rows.find(row => row.stage === stage);
  return {stage: label, count: observed?.count ?? 'Unavailable', from: observed?.start ?? 'Unavailable', through: observed?.end ?? 'Unavailable', meaning};
 });
}
export function searchTotals(rows) {
 if (!rows.length) return {clicks: null, impressions: null, ctr: null};
 const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
 const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
 return {clicks, impressions, ctr: impressions ? clicks / impressions : null};
}
export const reportPeriods = ['Week', 'Month', 'All time'];
export function rowsForPeriod(rows, period, dateField = 'date') {
 if (period === 'All time' || !rows.length) return rows;
 const latest = rows.at(-1)[dateField].slice(0,10);
 const days = period === 'Week' ? 7 : 30;
 const start = new Date(`${latest}T00:00:00Z`);
 start.setUTCDate(start.getUTCDate() - days + 1);
 const floor = start.toISOString().slice(0,10);
 return rows.filter(row => row[dateField].slice(0,10) >= floor && row[dateField].slice(0,10) <= latest);
}
export const queryGroups = ['All queries', 'Brand', 'Services', 'Project or business names', 'Other'];
export function filterQueryGroup(rows, group) {
 return group === 'All queries' ? rows : rows.filter(row => row.queryGroup === group);
}
// Aggregate only observed rows in the selected dates, retaining weighted position.
export function searchBreakdown(rows, dimension, dates) {
 const allowed = new Set(dates);
 const sourceRows = rows.filter(row => allowed.has(row.date));
 const groups = new Map();
 for (const row of sourceRows) {
  const group = groups.get(row[dimension]) ?? {[dimension]:row[dimension],clicks:0,impressions:0,weightedPosition:0};
  group.clicks += row.clicks;
  group.impressions += row.impressions;
  group.weightedPosition += (row.position ?? 0) * row.impressions;
  groups.set(row[dimension],group);
 }
 const displayRows = [...groups.values()].map(({weightedPosition,...row})=>({...row,
  ctr:row.impressions ? row.clicks/row.impressions : null,
  position:row.impressions ? weightedPosition/row.impressions : null,
 })).sort((a,b)=>b.impressions-a.impressions || a[dimension].localeCompare(b[dimension]));
 return {sourceRows,displayRows};
}
