/**
 * <form-datos>
 * Componente de formulario para la recolección de datos básicos del usuario.
 * Contiene inputs controlados para: nombre, apellido, tipo y número de documento, sexo y fecha de nacimiento.
 * Se comunica con el componente padre mediante un evento personalizado `@actualizar-datos`.
 * También incorpora validaciones internas (con mensajes de error visibles) y un método público `isValid()` para validar antes de avanzar.
 */

import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormDatos extends LitElement {
  static properties = {
    datos: { type: Object } // Datos recibidos desde AppRoot
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

    // Almacena errores de validación para mostrarlos junto a los inputs
    this.errores = {
      nombre: '',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      sexo: '',
      fechaNacimiento: ''
    };
  }

  // Estilos internos del componente
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
  `;

  /**
   * Actualiza un campo del objeto `datos` cuando el usuario escribe.
   * Luego emite un evento `actualizar-datos` hacia el componente padre.
   */
  actualizarCampo(e, campo) {
    this.datos = {
      ...this.datos,
      [campo]: e.target.value
    };

    // Ejecutar validación para mantener estado al día
    this.isValid();

    //dispatchEvent es la forma de emitir un evento personalizado desde un componente hijo
    this.dispatchEvent(new CustomEvent('actualizar-datos', {
      detail: this.datos,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Renderiza el formulario.
   * Incluye inputs y selects con valores enlazados (.value) y eventos @input/@change.
   * Muestra mensajes de error debajo de cada campo si existen.
   */
  render() {
    return html`
      <h2>Formulario: Datos Básicos</h2>

      <div class="grid">
        <!-- Campo: Nombre -->
        <div class="campo">
          <label>Nombre</label>
          <input 
            maxlength="40"
            pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,40}" 
            type="text"
            oninput="this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g, '')"
            .value=${this.datos.nombre ?? ''} 
            @input=${e => this.actualizarCampo(e, 'nombre')} 
          />
        </div>

        <!-- Campo: Apellido -->
        <div class="campo">
          <label>Apellido</label>
          <input 
            maxlength="40"
            pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,40}"
            oninput="this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g, '')"
            .value=${this.datos.apellido ?? ''} 
            @input=${e => this.actualizarCampo(e, 'apellido')} />
        </div>

        <!-- Campo: Tipo de documento -->
        <div class="campo">
          <label>Tipo de documento</label>
          <select .value=${this.datos.tipoDocumento} @change=${e => this.actualizarCampo(e, 'tipoDocumento')}>
            <option value="">Seleccione...</option>
            <option value="dni">DNI</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
        </div>

        <!-- Campo: Número de documento -->
        <div class="campo">
          <label>Número de documento</label>
          <input 
            maxlength="40"
            min="0"
            max="99"
            type="number" 
            .value=${this.datos.numeroDocumento} 
            @input=${e => this.actualizarCampo(e, 'numeroDocumento')} />
        </div>

        <!-- Campo: Sexo -->
        <div class="campo">
          <label>Sexo</label>
          <select .value=${this.datos.sexo} @change=${e => this.actualizarCampo(e, 'sexo')}>
            <option value="">Seleccione...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <!-- Campo: Fecha de nacimiento -->
        <div class="campo">
          <label>Fecha de nacimiento</label>
          <input type="date" .value=${this.datos.fechaNacimiento} @input=${e => this.actualizarCampo(e, 'fechaNacimiento')} />
        </div>
      </div> <!-- fin div class grid -->
    `;
  }

  /**
   * Método público llamado desde el componente padre (`AppRoot`)
   * para validar todos los campos antes de continuar al siguiente paso.
   */
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
    this.requestUpdate(); // actualiza la UI con los errores
  
    return Object.keys(errores).length === 0;
  }
}

customElements.define('form-datos', FormDatos);
