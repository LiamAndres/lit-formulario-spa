import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormDatos extends LitElement {
  static properties = {
    datos: { type: Object }
  };

  constructor() {
    super();
    this.datos = {
      nombre: '',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      sexo: '',
      fechaNacimiento: ''
    };
  }

  static styles = css`
    label, input, select {
      display: block;
      margin-bottom: 0.5rem;
    }

    .campo {
      margin-bottom: 1rem;
    }
  `;

  actualizarCampo(e, campo) {
    this.datos = {
      ...this.datos,
      [campo]: e.target.value
    };

    this.dispatchEvent(new CustomEvent('actualizar-datos', {
      detail: this.datos,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <h2>Formulario: Datos Básicos</h2>

      <div class="campo">
        <label>Nombre</label>
        <input .value=${this.datos.nombre ?? ''} @input=${e => this.actualizarCampo(e, 'nombre')} />
      </div>

      <div class="campo">
        <label>Apellido</label>
        <input .value=${this.datos.apellido ?? ''} @input=${e => this.actualizarCampo(e, 'apellido')} />
      </div>

      <div class="campo">
        <label>Tipo de documento</label>
        <select .value=${this.datos.tipoDocumento} @change=${e => this.actualizarCampo(e, 'tipoDocumento')}>
          <option value="">Seleccione...</option>
          <option value="dni">DNI</option>
          <option value="pasaporte">Pasaporte</option>
        </select>
      </div>

      <div class="campo">
        <label>Número de documento</label>
        <input type="number" .value=${this.datos.numeroDocumento} @input=${e => this.actualizarCampo(e, 'numeroDocumento')} />
      </div>

      <div class="campo">
        <label>Sexo</label>
        <select .value=${this.datos.sexo} @change=${e => this.actualizarCampo(e, 'sexo')}>
          <option value="">Seleccione...</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>

      <div class="campo">
        <label>Fecha de nacimiento</label>
        <input type="date" .value=${this.datos.fechaNacimiento} @input=${e => this.actualizarCampo(e, 'fechaNacimiento')} />
      </div>
    `;
  }
}

customElements.define('form-datos', FormDatos);
