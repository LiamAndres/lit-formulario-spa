/**
 * <form-resumen>
 * Componente visual de resumen que muestra los datos ingresados en pasos anteriores:
 * - Información básica (nombre, documento, sexo, fecha)
 * - Lenguajes de programación con años de experiencia
 * - Experiencia laboral con fechas y duración
 * 
 * No permite editar datos, es solo de lectura.
 * Este componente recibe toda la información como propiedades desde el componente padre (app-root).
 */

import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormResumen extends LitElement {
  static properties = {
    datos: { type: Object }, // Datos básicos: nombre, apellido, documento, etc.
    lenguajes: { type: Array }, // Lista de lenguajes: nombre + años
    experiencia: { type: Array } // Lista de experiencias: empresa, años, inicio, fin
  };

  constructor() {
    super(); // Llama al constructor de LitElement
    this.datos = {};
    this.lenguajes = [];
    this.experiencia = [];
  }

  // Estilos del componente
  static styles = css`
    :host {
      display: block;
      max-width: 1000px;
      margin: auto;
      font-family: system-ui, sans-serif;
    }

    h2 {
      margin-bottom: 1rem;
    }

    section {
      margin-bottom: 2rem;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .label {
      font-weight: 600;
      color: #374151;
    }

    .value {
      margin-bottom: 0.8rem;
      color: #111827;
    }

    .row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;
      padding: 0.5rem 0;
    }

    .title {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .bloque {
      margin-bottom: 1rem;
    }
  `;

  /**
   * Renderiza las secciones del resumen:
   * 1. Información Básica
   * 2. Lenguajes de programación
   * 3. Experiencia laboral
   */
  render() {
    return html`
      <h2>Resumen Final</h2>

      <!-- Sección: Datos básicos -->
      <section class="card">
        <div class="title">Información Básica</div>
        <div class="grid">
          <div>
            <div class="label">Nombre Completo</div>
            <div class="value">${this.datos.nombre} ${this.datos.apellido}</div>
          </div>
          <div>
            <div class="label">Documento</div>
            <div class="value">${this.datos.tipoDocumento} - ${this.datos.numeroDocumento}</div>
          </div>
          <div>
            <div class="label">Sexo</div>
            <div class="value">${this.datos.sexo}</div>
          </div>
          <div>
            <div class="label">Fecha de Nacimiento</div>
            <div class="value">${this.datos.fechaNacimiento}</div>
          </div>
        </div>
      </section>

      <!-- Sección: Lenguajes -->
      <section class="card">
        <div class="title">Lenguajes de Programación</div>
        ${this.lenguajes.map(lang => html`
          <div class="row">
            <span>${lang.nombre}</span>
            <span>${lang.anios} años</span>
          </div>
        `)}
      </section>

      <!-- Sección: Experiencia -->
      <section  class="card">
        <div class="title">Experiencia Laboral</div>
        ${this.experiencia.map(exp => html`
          <div class="bloque">
            <div class="row">
              <span>${exp.empresa}</span>
              <span>${exp.inicio} - ${exp.fin}</span>
            </div>
            <div class="value" style="text-align:right">${exp.anios} años de experiencia</div>
          </div>
        `)}
      </section>
    `;
  }
}

customElements.define('form-resumen', FormResumen);
