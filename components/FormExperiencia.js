import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormExperiencia extends LitElement {
  static properties = {
    experiencia: { type: Array }
  };

  constructor() {
    super();
    this.experiencia = [
      { empresa: '', anios: '', inicio: '', fin: '' }
    ];
  }

  static styles = css`
    :host {
      display: block;
      max-width: 800px;
      margin: auto;
      font-family: system-ui, sans-serif;
    }

    h2 {
      margin-bottom: 1rem;
    }

    .bloque {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    input {
      padding: 0.6rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      width: 90%;
    }

    .eliminar-btn {
      grid-column: span 2;
      justify-self: start;
      background: none;
      border: none;
      color: red;
      font-weight: bold;
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      margin-top: 0.5rem;
    }

    .eliminar-btn:hover {
      text-decoration: underline;
    }

    .agregar-btn {
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1.2rem;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .agregar-btn:hover {
      background-color: #1d4ed8;
    }
  `;

  actualizarCampo(index, campo, valor) {
    const copia = [...this.experiencia];
    copia[index][campo] = valor;
    this.experiencia = copia;
    this._emitirCambio();
  }

  agregarExperiencia() {
    this.experiencia = [...this.experiencia, { empresa: '', anios: '', inicio: '', fin: '' }];
    this._emitirCambio();
  }

  eliminarExperiencia(index) {
    this.experiencia = this.experiencia.filter((_, i) => i !== index);
    this._emitirCambio();
  }

  _emitirCambio() {
    this.dispatchEvent(new CustomEvent('actualizar-experiencia', {
      detail: this.experiencia,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <h2>Experiencia Laboral</h2>

      ${this.experiencia.map((item, index) => html`
        <div class="bloque">
          <input
            placeholder="Empresa"
            .value=${item.empresa ?? ''}
            @input=${e => this.actualizarCampo(index, 'empresa', e.target.value)} />

          <input
            type="number"
            min="0"
            placeholder="Años de experiencia"
            .value=${item.anios ?? ''}
            @input=${e => this.actualizarCampo(index, 'anios', e.target.value)} />

          <input
            type="date"
            .value=${item.inicio ?? ''}
            @input=${e => this.actualizarCampo(index, 'inicio', e.target.value)} />

          <input
            type="date"
            .value=${item.fin ?? ''}
            @input=${e => this.actualizarCampo(index, 'fin', e.target.value)} />

          <button class="eliminar-btn" @click=${() => this.eliminarExperiencia(index)}>
            🗑 Eliminar
          </button>
        </div>
      `)}

      <button class="agregar-btn" @click=${this.agregarExperiencia}>➕ Agregar Experiencia</button>
    `;
  }
}

customElements.define('form-experiencia', FormExperiencia);
