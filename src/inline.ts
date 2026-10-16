export class PlainInline extends HTMLSpanElement {
  constructor() {
    super();
  }
}

if (!customElements.get('plain-inline')) {
  customElements.define('plain-inline', PlainInline, { extends: 'span' });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-inline': PlainInline;
  }
}
