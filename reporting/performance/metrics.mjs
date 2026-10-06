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
export const queryGroups = ['All queries', 'Brand', 'Services', 'Project or business names', 'Other'];
export function filterQueryGroup(rows, group) {
 return group === 'All queries' ? rows : rows.filter(row => row.queryGroup === group);
}
