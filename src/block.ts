export class PlainBlock extends HTMLDivElement {
  constructor() {
    super();
  }
}

if (!customElements.get('plain-block')) {
  customElements.define('plain-block', PlainBlock, { extends: 'div' });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-block': PlainBlock;
  }
}
