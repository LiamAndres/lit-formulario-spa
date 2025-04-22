/**
 * <form-experiencia>
 * Componente que permite ingresar una o varias experiencias laborales.
 * 
 * Cada experiencia incluye:
 * - Nombre de la empresa
 * - Años de experiencia
 * - Fecha de inicio y fecha de fin
 * 
 * Permite añadir o eliminar bloques de experiencia.
 * Se valida que al menos una entrada tenga todos los campos correctamente completados.
 * 
 * Emite el evento personalizado `@actualizar-experiencia` con los datos al componente padre.
 */

import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormExperiencia extends LitElement {
  static properties = {
    experiencia: { type: Array } // Lista de objetos { empresa, anios, inicio, fin }
  };

  constructor() {
    super();
    this.experiencia = [
      { empresa: '', anios: '', inicio: '', fin: '' }
    ];
    this.errores = []; // Almacena errores generales de validación
  }

  // Estilos del componente
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

    .error {
      color: red;
      font-size: 0.8rem;
      grid-column: span 2;
    }
  `;

  /**
   * Actualiza el campo de una experiencia específica y emite evento al padre.
   */
  actualizarCampo(index, campo, valor) {
    const copia = [...this.experiencia];
    copia[index][campo] = valor;
    this.experiencia = copia;
    this._emitirCambio();
  }

  /**
   * Agrega una nueva experiencia vacía.
   */
  agregarExperiencia() {
    this.experiencia = [...this.experiencia, { empresa: '', anios: '', inicio: '', fin: '' }];
    this._emitirCambio();
  }

  /**
   * Elimina una experiencia según su índice.
   */
  eliminarExperiencia(index) {
    this.experiencia = this.experiencia.filter((_, i) => i !== index);
    this._emitirCambio();
  }

  /**
   * Emite el evento personalizado `actualizar-experiencia` con el array actualizado.
   */
  _emitirCambio() {
    this.dispatchEvent(new CustomEvent('actualizar-experiencia', {
      detail: this.experiencia,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Renderiza los bloques de experiencia con inputs para cada campo.
   * Muestra errores generales de validación si existen.
   */
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

      <!-- <button class="agregar-btn" @click=${this.agregarExperiencia}>➕ Agregar Experiencia</button> -->
      <button-primary
        .label=${'➕ Agregar Experiencia'}
        @accion=${this.agregarExperiencia}>
      </button-primary>
    `;
  }

  /**
   * Verifica que al menos una experiencia sea válida.
   * Valida: nombre empresa no vacío, años positivos, fechas válidas (inicio <= fin).
   */
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
