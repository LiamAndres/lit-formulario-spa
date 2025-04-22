import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

/**
 * Botón reutilizable de tipo secundario.
 * Gris claro con texto oscuro. Emite evento `accion` al hacer clic.
 */
class ButtonSecondary extends LitElement {
    static properties = {
        label: { type: String },
        disabled: { type: Boolean }
    };

    static styles = css`
        button {
            background-color: #e5e7eb;
            color: #111827;
            font-size: 1rem;
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        button:hover {
            background-color: #d1d5db;
        }

        button:disabled {
            background-color: #f3f4f6;
            cursor: not-allowed;
        }
  `;

    constructor() {
        super();
        this.label = 'Atrás';
        this.disabled = false;
    }

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

customElements.define('button-secondary', ButtonSecondary);
