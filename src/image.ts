export class PlainImage extends HTMLImageElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.hasAttribute('alt')) {
      this.setAttribute('alt', '');
    }
  }
}

if (!customElements.get('plain-image')) {
  customElements.define('plain-image', PlainImage, { extends: 'img' });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-image': PlainImage;
  }
}
