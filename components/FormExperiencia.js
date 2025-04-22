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
  `;

  calcularAniosYMeses(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    let anios = fin.getFullYear() - inicio.getFullYear();
    let meses = fin.getMonth() - inicio.getMonth();

    if (meses < 0) {
      anios--;
      meses += 12;
    }

    return `${anios} años y ${meses} meses`;
  }

  /**
   * Actualiza el campo de una experiencia específica y emite evento al padre.
   */
  actualizarCampo(index, campo, valor) {
    const copia = [...this.experiencia];
    copia[index][campo] = valor;

    if (copia[index].inicio && copia[index].fin && new Date(copia[index].inicio) <= new Date(copia[index].fin)) {
      copia[index].anios = this.calcularAniosYMeses(copia[index].inicio, copia[index].fin);
    } else {
      copia[index].anios = '';
    }

    this.experiencia = copia;
    this._emitirCambio();
  }

  /**
   * Agrega una nueva experiencia vacía.
   */
  agregarExperiencia() {
    this.experiencia = [...this.experiencia, { empresa: '', anios: 0, inicio: '', fin: '' }];
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

    // Solo emitimos experiencias válidas
    const experienciasValidas = this.experiencia.filter(exp =>
      exp.empresa?.trim() &&
      exp.inicio &&
      exp.fin &&
      new Date(exp.inicio) <= new Date(exp.fin)
    );

    this.dispatchEvent(new CustomEvent('actualizar-experiencia', {
      detail: experienciasValidas,
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

          <!-- <input
            type="number"
            min="0"
            placeholder="Años de experiencia"
            .value=${item.anios ?? 0}
            @input=${e => this.actualizarCampo(index, 'anios', e.target.value)} /> -->

          <input
          type="text"
          placeholder="Años (calculado)"
          .value=${item.anios ?? 0}
          readonly />

          <input
            type="date"
            .value=${item.inicio ?? ''}
            @input=${e => this.actualizarCampo(index, 'inicio', e.target.value)} />

          <input
            type="date"
            .value=${item.fin ?? ''}
            @input=${e => this.actualizarCampo(index, 'fin', e.target.value)} />

          <!-- <button class="eliminar-btn" @click=${() => this.eliminarExperiencia(index)}>
            🗑 Eliminar
          </button> -->
          <button-delete
            .showIcon=${true}
            .label=${'Eliminar'}
            @accion=${() => this.eliminarLenguaje(index)}>
          </button-delete>

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
    const algunaValida = this.experiencia.some(exp =>
      exp.empresa?.trim() &&
      exp.inicio &&
      exp.fin &&
      new Date(exp.inicio) <= new Date(exp.fin)
    );

    this.errores = algunaValida ? [] : ['Debe completar al menos una experiencia válida.'];
    this.requestUpdate();

    return this.errores.length === 0;
  }

}

customElements.define('form-experiencia', FormExperiencia);
