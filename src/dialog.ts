export class PlainDialog extends HTMLDialogElement {
  constructor() {
    super();
  }
}

if (!customElements.get('plain-dialog')) {
  customElements.define('plain-dialog', PlainDialog, { extends: 'dialog' });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-dialog': PlainDialog;
  }
}
