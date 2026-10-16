export class PlainCheckbox extends HTMLInputElement {
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

  get softDisabled() {
    return this.hasAttribute('soft-disabled');
  }

  set softDisabled(value: boolean) {
    this.toggleAttribute('soft-disabled', value);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('type', 'checkbox');
    this.#syncSoftDisabled();

    for (const eventName of PlainCheckbox.#BLOCKED_EVENTS) {
      this.addEventListener(eventName, this.#handleIntercept, {
        capture: true,
      });
    }
    this.addEventListener('keydown', this.#handleKeyDown, { capture: true });
    this.addEventListener('keyup', this.#handleKeyUp, { capture: true });
  }

  disconnectedCallback() {
    for (const eventName of PlainCheckbox.#BLOCKED_EVENTS) {
      this.removeEventListener(eventName, this.#handleIntercept, {
        capture: true,
      });
    }
    this.removeEventListener('keydown', this.#handleKeyDown, { capture: true });
    this.removeEventListener('keyup', this.#handleKeyUp, { capture: true });
  }

  attributeChangedCallback(name: string, oldValue?: string, newValue?: string) {
    if (name === 'soft-disabled' && oldValue !== newValue) {
      this.#syncSoftDisabled();
    }
  }

  override click() {
    if (!this.softDisabled) {
      super.click();
    }
  }

  #syncSoftDisabled() {
    if (this.softDisabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  #handleIntercept = (event: Event) => {
    if (this.softDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  #handleKeyDown = (event: KeyboardEvent) => {
    if (
      this.softDisabled && (
        event.code === 'Enter' ||
        event.code === 'NumpadEnter' ||
        event.code === 'Space'
      )
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  #handleKeyUp = (event: KeyboardEvent) => {
    if (
      this.softDisabled && (
        event.code === 'Enter' ||
        event.code === 'NumpadEnter' ||
        event.code === 'Space'
      )
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
}

if (!customElements.get('plain-checkbox')) {
  customElements.define('plain-checkbox', PlainCheckbox, { extends: 'input' });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-checkbox': PlainCheckbox;
  }
}
