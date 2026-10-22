/* 6. Enquiry form castoff and sending feedback. The first valid submit uses native FormSubmit
   navigation; later submits are blocked until the confirmation page or a restored form. */
(() => {
  document.querySelectorAll('.enquiry-form .send-row').forEach(row => {
    const form = row.closest('form');
    const ship = row.querySelector('.castoff');
    const button = row.querySelector('button[type="submit"]');
    if (!form || !ship || !button) return;
    const status = form.nextElementSibling;
    const buttonLabel = button.innerHTML;
    let sending = false;
    function reset() {
      sending = false;
      button.disabled = false;
      button.innerHTML = buttonLabel;
      if (status) status.textContent = '';
      ship.classList.remove('is-going');
    }
    form.addEventListener('submit', event => {
      if (sending) { event.preventDefault(); return; }
      if (event.defaultPrevented || !form.checkValidity()) return;
      sending = true;
      button.disabled = true;
      button.textContent = 'Sending enquiry…';
      if (status) status.textContent = 'Sending your enquiry. Please wait for the confirmation page.';
      if (WG.reduce) return;
      // Sail to the far edge of the form, never past it (the dialog would scroll sideways).
      const room = form.getBoundingClientRect().right - row.getBoundingClientRect().right - 68;
      row.style.setProperty('--travel', Math.max(36, Math.round(room)) + 'px');
      ship.classList.remove('is-going');
      void ship.getBoundingClientRect();
      ship.classList.add('is-going');
    });
    form.addEventListener('reset', reset);
    // A Back navigation can restore the form from memory, including its disabled button.
    addEventListener('pageshow', event => { if (event.persisted) reset(); });
  });
})();
