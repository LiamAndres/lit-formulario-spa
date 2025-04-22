// components/atoms/ButtonDelete.js
import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class ButtonDelete extends LitElement {
  static properties = {
    label: { type: String },
    showIcon: { type: Boolean }
  };

  constructor() {
    super();
    this.label = '';
    this.showIcon = true;
  }

  static styles = css`
    button {
      background-color: #ef4444;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      width: fit-content;
    }

    button:hover {
      background-color: #dc2626;
    }
  `;

  render() {
    return html`
      <button @click=${() => this.dispatchEvent(new CustomEvent('accion', { bubbles: true, composed: true }))}>
        ${this.showIcon ? html`<span>🗑</span>` : ''}
        ${this.label}
      </button>
    `;
  }
}

customElements.define('button-delete', ButtonDelete);
