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
    this.errores = [];
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    h2 {
      margin-bottom: 1.5rem;
    }

    .campo {
      display: grid;
      grid-template-columns: 2fr 1fr auto;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
    }

    input {
      width: 100%;
      padding: 0.6rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 1rem;
      box-sizing: border-box;
    }

    button.eliminar {
      background-color: #ef4444;
      color: white;
      border: none;
      padding: 0.5rem;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
    }

    button.eliminar:hover {
      background-color: #dc2626;
    }

    .agregar {
      margin-top: 1rem;
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .agregar:hover {
      background-color: #1d4ed8;
    }

    .error {
      color: red;
      font-size: 0.8rem;
      grid-column: span 3;
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

      ${this.errores.length > 0 ? html`
        <div class="error">${this.errores[0]}</div>
      ` : ''}

      <button class="agregar" @click=${this.agregarLenguaje}>Agregar lenguaje</button>
    `;
  }

  isValid() {
    let errores = [];
  
    // Debe haber al menos un lenguaje con nombre y años válidos
    const valido = this.lenguajes.some(lang => 
      lang.nombre?.trim() && !isNaN(lang.anios) && Number(lang.anios) > 0
    );
  
    if (!valido) {
      errores.push('Debe ingresar al menos un lenguaje válido con nombre y años.');
    }
  
    this.errores = errores;
    this.requestUpdate();
  
    return errores.length === 0;
  }
}

customElements.define('form-lenguajes', FormLenguajes);
