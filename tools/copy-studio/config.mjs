export const config = {
  editableSelectors: ['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote', 'figcaption', 'dt', 'dd', 'td', 'th',
    'a.text-link', 'a.button', 'button.button[data-contact]', '.service-link-label', 'footer > div'],
  excludedSelectors: ['nav', 'form', '.brand', '.menu-toggle', '.dialog-close', '.picker-choices', '.case-stats',
    'input', 'textarea', 'select', 'script', 'style', 'svg', '.portfolio-image', '.skip-link'],
  ignoreAttr: 'data-copy-studio-ignore',
  forceIncludeAttr: 'data-copy-editable',
};
