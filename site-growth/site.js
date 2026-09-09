/* Navigation, service-aware enquiries, and progressive enhancement. */
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const dialog = document.querySelector('.contact-preview');
const form = document.querySelector('.enquiry-form');
const enquiryCopy = {
  'Help me choose': {
    title: 'Let’s find the right service.',
    intro: 'Choose what you’re interested in and tell me a little about your business.',
    question: 'What would you like to improve?',
    prompt: 'Tell me what your business does and where you could use support.'
  },
  'Web development': {
    title: 'Let’s plan your website.',
    intro: 'Tell me about the site you need. We can discuss a package or a one-time build.',
    question: 'What should your website help customers do?',
    prompt: 'Tell me what you sell, whether you need a new site or an update, and what visitors should be able to do.'
  },
  'Growth marketing': {
    title: 'Let’s talk about growing your business.',
    intro: 'Tell me who you want to reach and what you’d like your marketing to achieve.',
    question: 'What do you want to promote, and to whom?',
    prompt: 'Which products or services do you want to promote? Who are your customers, and where do you want to reach them?'
  },
  'Agentic automation': {
    title: 'Let’s talk about automating your admin.',
    intro: 'Tell me which repetitive tasks you’d like to automate and what software you use.',
    question: 'What would you like to automate?',
    prompt: 'Describe a task you repeat, how often it comes up, and the tools you use to do it.'
  }
};
function updateEnquiry() {
  const service = form.elements.service.value;
  const copy = enquiryCopy[service];
  document.querySelector('#contact-title').textContent = copy.title;
  document.querySelector('#contact-intro').textContent = copy.intro;
  document.querySelector('#message-label').textContent = copy.question;
  form.elements.message.placeholder = copy.prompt;
  const showPackages = service === 'Web development' || service === 'Growth marketing';
  document.querySelector('#package-field').hidden = !showPackages;
  form.elements.package.disabled = !showPackages;
  if (!showPackages) form.elements.package.value = '';
  document.querySelector('#automation-form-note').hidden = service !== 'Agentic automation';
  document.querySelector('.form-result').textContent = '';
}
form.elements.service.addEventListener('change', updateEnquiry);
let opener;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = 'Menu';
  nav.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', event => {
  if (!dialog || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  opener = button;
  closeMenu();
  form.reset();
  const selection = button.dataset.contact || 'Help me choose';
  const isPackage = ['Launch', 'Grow', 'Dominate'].includes(selection);
  form.elements.service.value = isPackage ? form.dataset.pageService : selection;
  updateEnquiry();
  if (isPackage) form.elements.package.value = selection;
  dialog.showModal();
}));
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('close', () => opener?.focus());
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !dialog?.open && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
matchMedia('(min-width:1101px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
// The contact route works without JavaScript; query parameters enhance preselection.
const params = new URLSearchParams(location.search);
const requestedService = params.get('service') || params.get('need');
form.elements.service.value = Object.hasOwn(enquiryCopy, requestedService) ? requestedService : form.dataset.pageService;
updateEnquiry();
const requestedPackage = params.get('package') || params.get('plan');
if (!form.elements.package.disabled && ['Launch', 'Grow', 'Dominate', 'Custom project'].includes(requestedPackage)) {
  form.elements.package.value = requestedPackage;
}

// Progressive enhancement: content stays readable if JavaScript is unavailable.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), {threshold: 0.08});
  document.querySelectorAll('.portfolio-section, .founder-section, .capability-list').forEach(el => {
    el.classList.add('reveal-ready'); observer.observe(el);
  });
  reduceMotion.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); document.querySelectorAll('.reveal-ready').forEach(el => el.classList.add('is-visible')); }
  });
}

// Native buttons keep the service examples usable by pointer and keyboard.
document.querySelectorAll('[data-automation-choice]').forEach(button => {
  button.addEventListener('click', () => {
    const picker = button.closest('.automation-picker');
    picker.querySelectorAll('[data-automation-choice]').forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice === button));
    });
    picker.querySelectorAll('[data-automation-panel]').forEach(panel => {
      panel.hidden = panel.dataset.automationPanel !== button.dataset.automationChoice;
    });
  });
});

// Load the decorative hero film only when visible and motion is welcome.
const heroMotion = document.querySelector('[data-hero-motion]');
if (heroMotion) {
  const film = heroMotion.querySelector('video');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const allowed = () => !preference.matches && !connection?.saveData;
  let loaded = false;
  const fallback = () => {
    film.pause();
    heroMotion.classList.remove('is-playing');
    heroMotion.classList.add('is-static');
  };
  const play = () => {
    if (!allowed()) { fallback(); return; }
    if (!loaded) {
      film.querySelectorAll('source').forEach(source => { source.src = source.dataset.src; });
      loaded = true;
      film.load();
    }
    film.muted = true;
    film.play().catch(fallback);
  };
  film.addEventListener('playing', () => {
    heroMotion.classList.add('is-playing');
    heroMotion.classList.remove('is-static');
  });
  film.addEventListener('error', fallback);
  preference.addEventListener('change', fallback);
  connection?.addEventListener('change', () => { if (!allowed()) fallback(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); play(); }
    }, {threshold: 0.25});
    observer.observe(heroMotion);
  } else play();
}
