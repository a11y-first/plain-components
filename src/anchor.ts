export class PlainAnchor extends HTMLAnchorElement {
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
    return ['disabled', 'soft-disabled'];
  }

  #originalTabIndex: string | null | undefined = undefined;
  #originalPointerEvents: string | null | undefined = undefined;

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    this.toggleAttribute('disabled', value);
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
    this.#syncDisabled();

    for (const eventName of PlainAnchor.#BLOCKED_EVENTS) {
      this.addEventListener(eventName, this.#handleIntercept, {
        capture: true,
      });
    }
    this.addEventListener('keydown', this.#handleKeyDown, { capture: true });
    this.addEventListener('keyup', this.#handleKeyUp, { capture: true });
  }

  disconnectedCallback() {
    for (const eventName of PlainAnchor.#BLOCKED_EVENTS) {
      this.removeEventListener(eventName, this.#handleIntercept, {
        capture: true,
      });
    }
    this.removeEventListener('keydown', this.#handleKeyDown, { capture: true });
    this.removeEventListener('keyup', this.#handleKeyUp, { capture: true });
  }

  attributeChangedCallback(name: string, oldValue?: string, newValue?: string) {
    if (
      (name === 'disabled' && oldValue !== newValue) ||
      (name === 'soft-disabled' && oldValue !== newValue)
    ) {
      this.#syncDisabled();
    }
  }

  override click() {
    if (!this.disabled && !this.softDisabled) {
      super.click();
    }
  }

  #syncDisabled() {
    if (this.disabled || this.softDisabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }

    if (this.disabled) {
      if (this.#originalTabIndex === undefined) {
        this.#originalTabIndex = this.getAttribute('tabindex');
      }
      if (this.#originalTabIndex === null) {
        this.tabIndex = -1;
      }

      if (this.#originalPointerEvents === undefined) {
        this.#originalPointerEvents = this.style.pointerEvents;
      }
      this.style.pointerEvents = 'none';
    } else if (this.softDisabled) {
      if (this.#originalTabIndex === undefined) {
        this.#originalTabIndex = this.getAttribute('tabindex');
      }
      if (this.#originalTabIndex === null) {
        this.tabIndex = 0;
      }

      if (this.#originalPointerEvents === undefined) {
        this.#originalPointerEvents = this.style.pointerEvents;
      }
      this.style.pointerEvents = 'none';
    } else if (
      this.#originalTabIndex !== undefined ||
      this.#originalPointerEvents !== undefined
    ) {
      if (this.#originalTabIndex !== undefined) {
        if (this.#originalTabIndex === null) {
          this.removeAttribute('tabindex');
        } else {
          this.setAttribute('tabindex', this.#originalTabIndex);
        }
        this.#originalTabIndex = undefined;
      } else if (this.#originalPointerEvents !== undefined) {
        if (this.#originalPointerEvents === null) {
          this.style.removeProperty('pointer-events');
        } else {
          this.style.pointerEvents = this.#originalPointerEvents;
        }
        this.#originalPointerEvents = undefined;
      }
    }
  }

  #handleIntercept = (event: Event) => {
    if (this.disabled || this.softDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  #handleKeyDown = (event: KeyboardEvent) => {
    if (
      (
        this.disabled || this.softDisabled
      ) && (
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
      (
        this.disabled || this.softDisabled
      ) && (
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

if (!customElements.get('plain-anchor')) {
  customElements.define('plain-anchor', PlainAnchor, { extends: 'a' });
}

declare global {
  interface HTMLElementTagNameMap {
    'plain-anchor': PlainAnchor;
  }
}
