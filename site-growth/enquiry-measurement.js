/* Anonymous enquiry steps. Native validation and FormSubmit remain in charge. */
(() => {
  const production = location.protocol === 'https:' &&
    ['www.wellandgoodgrowth.ca', 'wellandgoodgrowth.ca'].includes(location.hostname);
  const pages = ['/', '/services/websites/', '/services/growth/', '/services/automation/',
    '/website-design-niagara/', '/website-design-welland/', '/website-design-st-catharines/',
    '/niagara-seo/', '/frank-baggetta/', '/contact/', '/work/evelyns/', '/work/jk-motors/',
    '/privacy/', '/thank-you/'];
  const services = ['Help me choose', 'Web development', 'Growth marketing', 'AI automation'];
  const placements = ['navigation', 'hero', 'pricing', 'contact_section', 'founder', 'body', 'contact_page'];
  const page = pages.includes(location.pathname) ? location.pathname : 'other';
  // Keep only agreed campaign labels, never free text or arbitrary query values.
  const campaigns = {
    utm_source: ['linkedin', 'facebook', 'email', 'newsletter', 'referral'],
    utm_medium: ['organic_social', 'email', 'referral'],
    utm_campaign: ['autumn_services', 'site_launch']
  };
  const incoming = new URLSearchParams(location.search);
  const safeQuery = new URLSearchParams();
  for (const [key, allowed] of Object.entries(campaigns)) {
    const values = incoming.getAll(key);
    if (values.length === 1 && allowed.includes(values[0])) safeQuery.set(key, values[0]);
  }
  const query = safeQuery.toString();
  const analyticsUrl = location.origin + (page === 'other' ? '/other/' : page) + (query ? '?' + query : '');
  try {
    window.va?.('beforeSend', event => production ? { ...event, url: analyticsUrl } : null);
  } catch { return; } // A broken analytics hook cannot interrupt native form code.

  if (!production) return;
  const form = document.querySelector('.enquiry-form');
  const dialog = document.querySelector('.contact-preview');
  const pendingKey = 'wgg-enquiry-pending-v1';
  const returnUrl = 'https://www.wellandgoodgrowth.ca/thank-you/';
  let placement = page === '/contact/' ? 'contact_page' : 'body';
  let started = false;
  let submitted = false;
  const details = () => ({ page, placement,
    service: services.includes(form?.elements.service.value) ? form.elements.service.value : 'Help me choose' });
  function track(name, data) {
    // Analytics being unavailable must never prevent an enquiry.
    try { window.va?.('event', { name, data }); } catch { /* Native form still works. */ }
  }
  if (page === '/thank-you/') {
    const token = new URLSearchParams(location.hash.slice(1)).get('enquiry-return');
    if (token) {
      try { history.replaceState(history.state, '', location.pathname + location.search); } catch { /* No URL required in analytics. */ }
      try {
        const pending = JSON.parse(sessionStorage.getItem(pendingKey));
        sessionStorage.removeItem(pendingKey);
        const age = Date.now() - pending?.created;
        if (pending?.token === token && age >= 0 && age <= 60 * 60 * 1000 &&
            (pages.includes(pending.page) || pending.page === 'other') &&
            placements.includes(pending.placement) && services.includes(pending.service)) {
          track('enquiry_return', { page: pending.page, placement: pending.placement, service: pending.service });
        }
      } catch { /* Blocked storage or malformed markers are unmeasured, never success. */ }
    }
  }
  if (!form) return;
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', event => {
    // The earlier site.js handler opens the dialog only for an ordinary click.
    if (!dialog?.open || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    placement = button.closest('.main-nav') ? 'navigation' :
      button.closest('.business-hero, .service-hero') ? 'hero' :
      button.closest('.pricing-section') ? 'pricing' :
      button.closest('.contact-section') ? 'contact_section' :
      button.closest('.founder-section') ? 'founder' : 'body';
    track('enquiry_open', details());
  }));
  function start(event) {
    if (started || !['service', 'package', 'business', 'message', 'name', 'email'].includes(event.target.name)) return;
    started = true;
    track('enquiry_start', details());
  }
  form.addEventListener('input', start);
  form.addEventListener('change', start);
  form.addEventListener('reset', () => { started = false; submitted = false; });
  form.addEventListener('submit', event => {
    if (event.defaultPrevented || submitted || !form.checkValidity() || form.elements._honey.value) return;
    submitted = true;
    const data = details();
    // A per-attempt fragment plus same-tab storage avoids counting direct visits or reloads.
    // This is a return signal, not proof of email delivery.
    form.elements._next.value = returnUrl;
    try {
      const token = crypto.randomUUID();
      sessionStorage.setItem(pendingKey, JSON.stringify({ ...data, token, created: Date.now() }));
      form.elements._next.value = returnUrl + '#enquiry-return=' + token;
    } catch { /* Keep the original redirect when storage or randomness is unavailable. */ }
    track('enquiry_submit_attempt', data);
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    submitted = false;
    form.elements._next.value = returnUrl;
    try { sessionStorage.removeItem(pendingKey); } catch { /* Optional measurement only. */ }
  });
})();
