export class PlainTextArea extends HTMLTextAreaElement {
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
}

if (!customElements.get('plain-textarea')) {
  customElements.define('plain-textarea', PlainTextArea, {
    extends: 'textarea',
  });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-textarea': PlainTextArea;
  }
}
