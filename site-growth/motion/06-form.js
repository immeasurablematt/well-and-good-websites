/* 6. Enquiry form castoff: when a valid enquiry is sent, the freighter beside Send enquiry casts off
   with its wake behind it. It only decorates the native submission to FormSubmit: nothing here cancels,
   delays, or replaces it, and the browser's own validation decides whether the form is sent. */
(() => {
  document.querySelectorAll('.enquiry-form .send-row').forEach(row => {
    const form = row.closest('form');
    const ship = row.querySelector('.castoff');
    if (!form || !ship) return;
    form.addEventListener('submit', () => {
      if (WG.reduce || !form.checkValidity()) return;
      // Sail to the far edge of the form, never past it (the dialog would scroll sideways).
      const room = form.getBoundingClientRect().right - row.getBoundingClientRect().right - 68;
      row.style.setProperty('--travel', Math.max(36, Math.round(room)) + 'px');
      ship.classList.remove('is-going');
      void ship.getBoundingClientRect();
      ship.classList.add('is-going');
    });
    // Coming back from FormSubmit with the Back button restores this page as it was: clear the castoff.
    addEventListener('pageshow', event => { if (event.persisted) ship.classList.remove('is-going'); });
  });
})();
