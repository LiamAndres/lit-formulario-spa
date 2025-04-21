import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

export class AppRoot extends LitElement {
    static properties = {
        paso: { type: String }
    };

    constructor() {
        super();
        this.paso = 'datos'; // pantalla inicial

        this.datosBasicos = {};
        this.lenguajes = [{ nombre: '', anios: '' }]; // lista de lenguajes programados
        this.experiencia = [{ empresa: '', anios: '', inicio: '', fin: '' }];



    }

    static styles = css`
    .nav {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
  `;

    siguiente() {
        if (this.paso === 'datos') this.paso = 'lenguajes';
        else if (this.paso === 'lenguajes') this.paso = 'experiencia';
        else if (this.paso === 'experiencia') this.paso = 'resumen';
    }

    anterior() {
        if (this.paso === 'resumen') this.paso = 'experiencia';
        else if (this.paso === 'experiencia') this.paso = 'lenguajes';
        else if (this.paso === 'lenguajes') this.paso = 'datos';
    }

    actualizarDatos(e) {
        this.datosBasicos = e.detail;
        console.log('Datos actualizados:', this.datosBasicos);
    }

    actualizarLenguajes(e) {
        this.lenguajes = e.detail;
        console.log('Lenguajes actualizados:', this.lenguajes);
    }
    actualizarExperiencia(e) {
        this.experiencia = e.detail;
        console.log('Experiencia actualizada:', this.experiencia);
    }      


    render() {
        return html`
      <main>
        ${this.paso === 'datos' ? html`
            <form-datos
                .datos=${this.datosBasicos}
                @actualizar-datos=${this.actualizarDatos}
            ></form-datos>` : ''}
        ${this.paso === 'lenguajes' ? html`
            <form-lenguajes
                .lenguajes=${this.lenguajes}
                @actualizar-lenguajes=${this.actualizarLenguajes}
            ></form-lenguajes>` : ''}
        ${this.paso === 'experiencia' ? html`
            <form-experiencia
                .experiencia=${this.experiencia}
                @actualizar-experiencia=${this.actualizarExperiencia}
            ></form-experiencia>` : ''}
        ${this.paso === 'resumen' ? html`
            <form-resumen
                .datos=${this.datosBasicos}
                .lenguajes=${this.lenguajes}
                .experiencia=${this.experiencia}
            ></form-resumen>` : ''}
        
        <div class="nav">
          ${this.paso !== 'datos' ? html`<button @click=${this.anterior}>Anterior</button>` : ''}
          ${this.paso !== 'resumen' ? html`<button @click=${this.siguiente}>Siguiente</button>` : ''}
        </div>
      </main>
    `;
    }
}

customElements.define('app-root', AppRoot);
