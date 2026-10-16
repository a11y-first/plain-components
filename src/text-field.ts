export class PlainTextField extends HTMLInputElement {
  static readonly #BLOCKED_EVENTS = [
    'click',
    'dblclick',
    'auxclick',
    'pointerdown',
    'pointerup',
    'mousedown',
    'mouseup',
  ] as const;

  static get observedAttributes() {
    return ['soft-disabled'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('type', 'text');
  }
}

if (!customElements.get('plain-text-field')) {
  customElements.define('plain-text-field', PlainTextField, {
    extends: 'input',
  });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-text-field': PlainTextField;
  }
}
