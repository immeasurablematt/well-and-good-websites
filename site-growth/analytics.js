/* GA4 and Clarity measurement with sanitized URLs and categorical event details. */
(() => {
  const production = location.protocol === 'https:' &&
    ['www.wellandgoodgrowth.ca', 'wellandgoodgrowth.ca'].includes(location.hostname);
  if (!production) return;
  const GA4_ID = 'G-9V037QTGCE';
  const CLARITY_ID = 'z1rewvqi70';
  const allowed = {
    utm_source: ['linkedin', 'facebook', 'email', 'newsletter', 'referral'],
    utm_medium: ['organic_social', 'email', 'referral'],
    utm_campaign: ['autumn_services', 'site_launch']
  };
  const knownPaths = new Set([
    '/', '/services/websites/', '/services/growth/', '/services/automation/',
    '/website-design-niagara/', '/website-design-welland/',
    '/website-design-st-catharines/', '/niagara-seo/', '/frank-baggetta/',
    '/work/evelyns/', '/work/jk-motors/', '/privacy/', '/contact/', '/thank-you/'
  ]);
  const knownPlacements = new Set(['navigation', 'hero', 'pricing', 'contact_section', 'founder', 'body', 'contact_page']);
  const knownServices = new Set(['Help me choose', 'Web development', 'Growth marketing', 'AI automation']);
  const incoming = new URLSearchParams(location.search);
  const safeQuery = new URLSearchParams();
  let claritySafe = knownPaths.has(location.pathname) && !location.hash && location.pathname !== '/thank-you/';
  for (const [key, value] of incoming) {
    if (!allowed[key]?.includes(value) || incoming.getAll(key).length !== 1) claritySafe = false;
    else safeQuery.set(key, value);
  }
  const safePath = knownPaths.has(location.pathname) ? location.pathname : '/other/';
  const safeLocation = location.origin + safePath + (safeQuery.size ? '?' + safeQuery : '');
  let safeReferrer = '';
  try {
    if (document.referrer) {
      const referrer = new URL(document.referrer);
      if (['http:', 'https:'].includes(referrer.protocol)) safeReferrer = referrer.origin;
    }
  } catch { /* Unknown referrers are omitted. */ }
  if (/^G-[A-Z0-9]+$/.test(GA4_ID)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, {
      send_page_view: false, page_location: safeLocation, page_referrer: safeReferrer,
      allow_google_signals: false, allow_ad_personalization_signals: false
    });
    window.gtag('event', 'page_view', {
      page_location: safeLocation, page_referrer: safeReferrer, page_title: document.title
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(tag);
  }
  if (claritySafe && /^[a-z0-9]+$/i.test(CLARITY_ID)) {
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(CLARITY_ID);
    document.head.appendChild(tag);
  }
  window.wggAnalyticsTrack = function (name, data) {
    if (!window.gtag ||
        !['enquiry_open', 'enquiry_start', 'enquiry_submit_attempt', 'enquiry_return'].includes(name)) return;
    if (!data || !(knownPaths.has(data.page) || data.page === 'other') ||
        !knownPlacements.has(data.placement) || !knownServices.has(data.service)) return;
    window.gtag('event', name, {
      wgg_page: data.page, wgg_placement: data.placement, wgg_service: data.service,
      page_location: safeLocation, page_referrer: safeReferrer
    });
  };

})();
