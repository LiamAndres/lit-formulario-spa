// components/CardContainer.js
import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

/**
 * Componente reutilizable que actúa como contenedor tipo "card".
 * Aplica estilos comunes de padding, borde redondeado y sombra.
 * Utiliza <slot> para permitir insertar cualquier contenido interno.
 */
class CardContainer extends LitElement {
    static styles = css`
        :host {
        display: block;
        background-color: white;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        width: 800px;
        margin: auto;
        }
  `;

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('card-container', CardContainer);
