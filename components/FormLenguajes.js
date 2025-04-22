/**
 * <form-lenguajes>
 * Componente que permite al usuario ingresar uno o varios lenguajes de programación y sus años de experiencia.
 * 
 * Cada lenguaje ingresado se muestra en una fila editable.
 * Permite agregar o eliminar lenguajes dinámicamente.
 * 
 * La validación asegura que al menos un lenguaje tenga un nombre y años válidos (> 0).
 * Emite el evento personalizado `@actualizar-lenguajes` hacia el componente padre con los datos actualizados.
 */

import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

class FormLenguajes extends LitElement {
  static properties = {
    lenguajes: { type: Array } // Lista de lenguajes [{ nombre: '', anios: '' }]
  };

  constructor() {
    super();
    this.lenguajes = [
      { nombre: '', anios: '' }
    ];
    this.errores = []; // Se utiliza para mostrar mensajes de validación generales
  }

  // Estilos propios del componente
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

    .error {
      color: red;
      font-size: 0.8rem;
      grid-column: span 3;
    }
  `;

  /**
   * Actualiza el valor de un campo (nombre o anios) para un lenguaje específico.
   * Luego emite el evento para sincronizar con el componente padre.
   */
  actualizarCampo(index, campo, valor) {
    const nuevos = [...this.lenguajes];
    nuevos[index][campo] = valor;
    this.lenguajes = nuevos;
    this._emitirCambio();
  }

  /**
   * Agrega una nueva fila vacía para ingresar otro lenguaje.
   */
  agregarLenguaje() {
    this.lenguajes = [...this.lenguajes, { nombre: '', anios: '' }];
    this._emitirCambio();
  }

  /**
   * Elimina el lenguaje en el índice indicado.
   */
  eliminarLenguaje(index) {
    this.lenguajes = this.lenguajes.filter((_, i) => i !== index);
    this._emitirCambio();
  }

  /**
   * Emite el evento 'actualizar-lenguajes' al componente padre (AppRoot),
   * para mantener sincronizados los datos en la SPA.
   */
  _emitirCambio() {
    this.dispatchEvent(new CustomEvent('actualizar-lenguajes', {
      detail: this.lenguajes,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Renderiza el formulario con múltiples filas para ingresar lenguajes.
   * Muestra errores generales si existen (debajo de la lista).
   */
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

      <button-primary
        .label=${'Agregar lenguaje'}
        @accion=${this.agregarLenguaje}>
      </button-primary>
    `;
  }

  /**
   * Método público invocado desde AppRoot para validar el formulario.
   * Valida que al menos un lenguaje tenga nombre no vacío y años > 0.
   */
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
