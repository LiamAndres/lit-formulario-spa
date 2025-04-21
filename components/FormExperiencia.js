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
    this.errores = [];
  }

  static styles = css`
    :host {
      display: block;
    }

    h2 {
      margin-bottom: 1.5rem;
    }

    .bloque {
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    input {
      width: 100%;
      padding: 0.6rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      box-sizing: border-box;
    }

    .eliminar-btn {
      grid-column: span 2;
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

    .eliminar-btn:hover {
      background-color: #dc2626;
    }

    .agregar-btn {
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      margin-top: 1rem;
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

    .error {
      color: red;
      font-size: 0.8rem;
      grid-column: span 2;
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
      ${this.errores.length > 0 ? html`
        <div class="error">${this.errores[0]}</div>
      ` : ''}

      <button class="agregar-btn" @click=${this.agregarExperiencia}>➕ Agregar Experiencia</button>
    `;
  }

  isValid() {
    let errores = [];
  
    const algunaValida = this.experiencia.some(exp => {
      const fechasValidas = exp.inicio && exp.fin && exp.inicio <= exp.fin;
      const empresaOk = exp.empresa?.trim();
      const aniosOk = !isNaN(exp.anios) && Number(exp.anios) > 0;
      return empresaOk && aniosOk && fechasValidas;
    });
  
    if (!algunaValida) {
      errores.push('Debe completar al menos una experiencia válida.');
    }
  
    this.errores = errores;
    this.requestUpdate();
  
    return errores.length === 0;
  }

}

customElements.define('form-experiencia', FormExperiencia);
