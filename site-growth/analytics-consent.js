/* Optional GA4 and Clarity measurement. No third-party tag loads without a choice. */
(() => {
  const production = location.protocol === 'https:' &&
    ['www.wellandgoodgrowth.ca', 'wellandgoodgrowth.ca'].includes(location.hostname);
  const GA4_ID = 'G-9V037QTGCE';
  const CLARITY_ID = 'z1rewvqi70';
  const choiceKey = 'wgg-optional-analytics-v1';
  const choiceToggle = document.querySelector('[data-analytics-toggle]');
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
  let choice = null;
  try { choice = localStorage.getItem(choiceKey); } catch { /* Ask again on a later visit. */ }
  let loaded = false;
  function enable() {
    if (!production || loaded) return;
    loaded = true;
    if (/^G-[A-Z0-9]+$/.test(GA4_ID)) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
      });
      window.gtag('js', new Date());
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
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
      window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(CLARITY_ID);
      document.head.appendChild(tag);
    }
  }
  window.wggAnalyticsTrack = function (name, data) {
    if (!production || choice !== 'allow' || !loaded || !window.gtag ||
        !['enquiry_open', 'enquiry_start', 'enquiry_submit_attempt', 'enquiry_return'].includes(name)) return;
    if (!data || !(knownPaths.has(data.page) || data.page === 'other') ||
        !knownPlacements.has(data.placement) || !knownServices.has(data.service)) return;
    window.gtag('event', name, {
      wgg_page: data.page, wgg_placement: data.placement, wgg_service: data.service,
      page_location: safeLocation, page_referrer: safeReferrer
    });
  };

  if (choice === 'allow') enable();
  if (choiceToggle) {
    choiceToggle.checked = choice === 'allow';
    choiceToggle.addEventListener('change', () => {
      const next = choiceToggle.checked ? 'allow' : 'deny';
      const wasAllowed = choice === 'allow';
      choice = next;
      try { localStorage.setItem(choiceKey, next); } catch { /* Choice lasts for this page only. */ }
      if (next === 'allow') enable();
      if (next === 'deny' && wasAllowed) {
        try {
          window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
          window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
        } catch { /* Reload still removes the optional tags. */ }
        location.reload();
      }
    });
  }
})();
