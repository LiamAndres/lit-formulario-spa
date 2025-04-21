import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormResumen extends LitElement {
  static properties = {
    datos: { type: Object },
    lenguajes: { type: Array },
    experiencia: { type: Array }
  };

  constructor() {
    super();
    this.datos = {};
    this.lenguajes = [];
    this.experiencia = [];
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

    section {
      margin-bottom: 2rem;
    }

    .item {
      margin-bottom: 0.5rem;
    }

    .bloque {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 10px;
      background-color: #f9f9f9;
      margin-bottom: 1rem;
    }

    .label {
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <h2>Resumen Final</h2>

      <section>
        <h3>Datos Básicos</h3>
        <div class="item"><span class="label">Nombre:</span> ${this.datos.nombre}</div>
        <div class="item"><span class="label">Apellido:</span> ${this.datos.apellido}</div>
        <div class="item"><span class="label">Tipo Documento:</span> ${this.datos.tipoDocumento}</div>
        <div class="item"><span class="label">Número:</span> ${this.datos.numeroDocumento}</div>
        <div class="item"><span class="label">Sexo:</span> ${this.datos.sexo}</div>
        <div class="item"><span class="label">Fecha Nacimiento:</span> ${this.datos.fechaNacimiento}</div>
      </section>

      <section>
        <h3>Lenguajes de Programación</h3>
        ${this.lenguajes.map(lang => html`
          <div class="bloque">
            <div><span class="label">Lenguaje:</span> ${lang.nombre}</div>
            <div><span class="label">Años:</span> ${lang.anios}</div>
          </div>
        `)}
      </section>

      <section>
        <h3>Experiencia Laboral</h3>
        ${this.experiencia.map(exp => html`
          <div class="bloque">
            <div><span class="label">Empresa:</span> ${exp.empresa}</div>
            <div><span class="label">Años:</span> ${exp.anios}</div>
            <div><span class="label">Inicio:</span> ${exp.inicio}</div>
            <div><span class="label">Fin:</span> ${exp.fin}</div>
          </div>
        `)}
      </section>
    `;
  }
}

customElements.define('form-resumen', FormResumen);
