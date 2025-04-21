import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormLenguajes extends LitElement {
  static properties = {
    lenguajes: { type: Array }
  };

  constructor() {
    super();
    this.lenguajes = [
      { nombre: '', anios: '' }
    ];
  }

  static styles = css`
    .campo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.3rem;
    }

    button.eliminar {
      background-color: red;
      color: white;
      border: none;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
    }

    button.agregar {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  `;

  actualizarCampo(index, campo, valor) {
    const nuevos = [...this.lenguajes];
    nuevos[index][campo] = valor;
    this.lenguajes = nuevos;
    this._emitirCambio();
  }

  agregarLenguaje() {
    this.lenguajes = [...this.lenguajes, { nombre: '', anios: '' }];
    this._emitirCambio();
  }

  eliminarLenguaje(index) {
    this.lenguajes = this.lenguajes.filter((_, i) => i !== index);
    this._emitirCambio();
  }

  _emitirCambio() {
    this.dispatchEvent(new CustomEvent('actualizar-lenguajes', {
      detail: this.lenguajes,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <h2>Lenguajes de Programación</h2>

      ${this.lenguajes.map((item, index) => html`
        <div class="campo">
          <input
            placeholder="Lenguaje"
            .value=${item.nombre ?? ''}
            @input=${e => this.actualizarCampo(index, 'nombre', e.target.value)} />

          <input
            type="number"
            min="0"
            placeholder="Años"
            .value=${item.anios ?? ''}
            @input=${e => this.actualizarCampo(index, 'anios', e.target.value)} />

          <button class="eliminar" @click=${() => this.eliminarLenguaje(index)}>🗑</button>
        </div>
      `)}

      <button class="agregar" @click=${this.agregarLenguaje}>Agregar lenguaje</button>
    `;
  }
}

customElements.define('form-lenguajes', FormLenguajes);
