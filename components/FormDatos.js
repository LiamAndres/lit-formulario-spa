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
    this.errores = {
      nombre: '',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      sexo: '',
      fechaNacimiento: ''
    };
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
        margin-bottom: 1rem;
      }

      label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.4rem;
      }

      input, select {
        width: 100%;
        padding: 0.6rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 1rem;
        box-sizing: border-box;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        width: 100%;
      }

      .error {
        color: red;
        font-size: 0.8rem;
        margin-top: 0.3rem;
        display: block;
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

      <div class="grid">
        <div class="campo">
          <label>Nombre</label>
          <input 
            maxlength="40"
            pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,40}" 
            .value=${this.datos.nombre ?? ''} 
            @input=${e => this.actualizarCampo(e, 'nombre')} 
          />
          ${this.errores.nombre ? html`<span class="error">${this.errores.nombre}</span>` : ''}
        </div>

        <div class="campo">
          <label>Apellido</label>
          <input 
            maxlength="40"
            pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,40}"
            .value=${this.datos.apellido ?? ''} 
            @input=${e => this.actualizarCampo(e, 'apellido')} />
          ${this.errores.apellido ? html`<span class="error">${this.errores.apellido}</span>` : ''}
        </div>

        <div class="campo">
          <label>Tipo de documento</label>
          <select .value=${this.datos.tipoDocumento} @change=${e => this.actualizarCampo(e, 'tipoDocumento')}>
            <option value="">Seleccione...</option>
            <option value="dni">DNI</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
          ${this.errores.tipoDocumento ? html`<span class="error">${this.errores.tipoDocumento}</span>` : ''}
        </div>

        <div class="campo">
          <label>Número de documento</label>
          <input 
            maxlength="40"
            type="number" 
            .value=${this.datos.numeroDocumento} 
            @input=${e => this.actualizarCampo(e, 'numeroDocumento')} />
          ${this.errores.numeroDocumento ? html`<span class="error">${this.errores.numeroDocumento}</span>` : ''}
        </div>

        <div class="campo">
          <label>Sexo</label>
          <select .value=${this.datos.sexo} @change=${e => this.actualizarCampo(e, 'sexo')}>
            <option value="">Seleccione...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          ${this.errores.sexo ? html`<span class="error">${this.errores.sexo}</span>` : ''}
        </div>

        <div class="campo">
          <label>Fecha de nacimiento</label>
          <input type="date" .value=${this.datos.fechaNacimiento} @input=${e => this.actualizarCampo(e, 'fechaNacimiento')} />
          ${this.errores.fechaNacimiento ? html`<span class="error">${this.errores.fechaNacimiento}</span>` : ''}
        </div>
      </div> <!-- fin div class grid -->
    `;
  }

  isValid() {
    const { nombre, apellido, tipoDocumento, numeroDocumento, sexo, fechaNacimiento } = this.datos;
  
    const errores = {};
  
    if (!nombre?.trim()) errores.nombre = 'Nombre requerido';
    if (!apellido?.trim()) errores.apellido = 'Apellido requerido';
    if (!tipoDocumento) errores.tipoDocumento = 'Tipo de documento requerido';
    if (!numeroDocumento || Number(numeroDocumento) <= 0) errores.numeroDocumento = 'Número de documento inválido';
    if (!sexo) errores.sexo = 'Sexo requerido';
    if (!fechaNacimiento) errores.fechaNacimiento = 'Fecha de nacimiento requerida';
  
    // Validar que la fecha no sea futura
    const hoy = new Date().toISOString().split('T')[0];
    if (fechaNacimiento && fechaNacimiento > hoy) {
      errores.fechaNacimiento = 'La fecha no puede ser futura';
    }
  
    this.errores = errores;
    this.requestUpdate();
  
    return Object.keys(errores).length === 0;
  }
}

customElements.define('form-datos', FormDatos);
