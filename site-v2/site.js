(function () {
  function initMenu() {
    var button = document.querySelector('[data-menu-toggle]');
    var nav = document.querySelector('[data-primary-nav]');
    if (!button || !nav) return;

    button.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      }
    });
  }

  function markCurrentPage() {
    var path = window.location.pathname.replace(/index\.html$/, '');
    var current = null;
    document.querySelectorAll('[data-nav-path]').forEach(function (link) {
      var target = link.getAttribute('data-nav-path');
      if (target === '/' ? path === '/' : path.indexOf(target) === 0) {
        if (!current || target.length > current.getAttribute('data-nav-path').length) current = link;
      }
    });
    if (current) current.setAttribute('aria-current', 'page');
  }

  function preselectNeed() {
    var params = new URLSearchParams(window.location.search);
    var need = params.get('need');
    var field = document.querySelector('select[name="need"]');
    if (!need || !field) return;
    Array.prototype.some.call(field.options, function (option) {
      if (option.value.toLowerCase() === need.toLowerCase()) {
        field.value = option.value;
        return true;
      }
      return false;
    });
  }

  function init() {
    initMenu();
    markCurrentPage();
    preselectNeed();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
