export class PlainTooltip extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'tooltip');
  }
}

if (!customElements.get('plain-tooltip')) {
  customElements.define('plain-tooltip', PlainTooltip, { extends: 'div' });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-tooltip': PlainTooltip;
  }
}
