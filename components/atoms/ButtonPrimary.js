import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

/**
 * Botón reutilizable de tipo primario.
 * Azul con texto blanco. Dispara evento personalizado `accion` al hacer clic.
 */
class ButtonPrimary extends LitElement {
  static properties = {
    label: { type: String },
    disabled: { type: Boolean }
  };

  static styles = css`
    button {
      background-color: #2563eb;
      color: white;
      font-size: 1rem;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    button:hover {
      background-color: #1d4ed8;
    }

    button:disabled {
      background-color: #93c5fd;
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this.label = 'Botón';
    this.disabled = false;
  }

  /**
   * Emite un evento personalizado llamado `accion` al hacer clic.
   */
  _handleClick() {
    this.dispatchEvent(new CustomEvent('accion', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        ${this.label}
      </button>
    `;
  }
}

customElements.define('button-primary', ButtonPrimary);
