/**
 * Componente principal de la SPA (Single Page Application).
 * Controla el flujo del formulario paso a paso: datos básicos → lenguajes → experiencia → resumen.
 * Se comunica con los subcomponentes a través de propiedades (.prop) y eventos personalizados (@evento).
 * No utiliza ningún router externo: maneja el "routing" manualmente con la propiedad `paso`.
 */

import { LitElement, html, css } from 'https://unpkg.com/lit@3.0.0/index.js?module';

export class AppRoot extends LitElement {
    static properties = {
        paso: { type: String },
        pasoValido: { type: Boolean }
    };

    constructor() {
        super();

        // Estado inicial del flujo del formulario
        this.paso = 'datos'; // pantalla inicial
        this.pasoValido = false; // indica si el paso actual es válido o no

        // Datos recolectados en cada paso
        this.datosBasicos = {};
        this.lenguajes = [{ nombre: '', anios: '' }]; // lista de lenguajes programados
        this.experiencia = [{ empresa: '', anios: '', inicio: '', fin: '' }];

    }

    // Estilos generales del contenedor principal y botones
    static styles = css`

        .nav {
            margin-top: 2rem;
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }

        input, select {
            width: 100%;
            padding: 0.6rem;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-size: 1rem;
            box-sizing: border-box;
        }

    
    `;

    firstUpdated() {
        this._verificarValidez();
        this.addEventListener('actualizar-datos', () => this._verificarValidez());
        this.addEventListener('actualizar-lenguajes', () => this._verificarValidez());
        this.addEventListener('actualizar-experiencia', () => this._verificarValidez());
    }

    _verificarValidez() {
        let form;
        if (this.paso === 'datos') form = this.renderRoot.querySelector('form-datos');
        else if (this.paso === 'lenguajes') form = this.renderRoot.querySelector('form-lenguajes');
        else if (this.paso === 'experiencia') form = this.renderRoot.querySelector('form-experiencia');
        this.pasoValido = form?.isValid?.() ?? false;
    }

    /**
     * Lógica para avanzar al siguiente paso del formulario.
     * Valida el paso actual antes de continuar.
    */
    siguiente() {
        if (!this.pasoValido) return;

        if (this.paso === 'datos') this.paso = 'lenguajes';
        else if (this.paso === 'lenguajes') this.paso = 'experiencia';
        else if (this.paso === 'experiencia') this.paso = 'resumen';
        
        // Esperamos a que el nuevo form se renderice antes de validar
        this.updateComplete.then(() => this._verificarValidez());
    }

    /**
     * Lógica para retroceder al paso anterior.
     */
    anterior() {
        if (this.paso === 'resumen') this.paso = 'experiencia';
        else if (this.paso === 'experiencia') this.paso = 'lenguajes';
        else if (this.paso === 'lenguajes') this.paso = 'datos';

        this.updateComplete.then(() => this._verificarValidez());
    }

    // Recibe los datos emitidos por form-datos
    actualizarDatos(e) {
        this.datosBasicos = e.detail;
        console.log('Datos actualizados:', this.datosBasicos);
    }

    // Recibe los lenguajes emitidos por form-lenguajes
    actualizarLenguajes(e) {
        this.lenguajes = e.detail;
        console.log('Lenguajes actualizados:', this.lenguajes);
    }

    // Recibe la experiencia emitida por form-experiencia
    actualizarExperiencia(e) {
        this.experiencia = e.detail;
        console.log('Experiencia actualizada:', this.experiencia);
    }      


    render() {
        return html`
            <main>
                <card-container>
                    <!-- Render dinámico según el paso actual -->
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
                
                    <!-- Botones de navegación dentro del card-container -->
                    <div class="nav">
                        ${this.paso !== 'datos' ? html`
                            <button-secondary
                                .label=${'Anterior'}
                                @accion=${this.anterior}>
                            </button-secondary>` : ''}
                        ${this.paso !== 'resumen' ? html`
                            <button-primary
                                .label=${'Siguiente'}
                                .disabled=${!this.pasoValido}
                                @click=${this.siguiente}>
                            </button-primary>` : ''}
                    </div> <!-- fin de div class nav -->
                </card-container>
            </main>
        `;
    }
}

customElements.define('app-root', AppRoot);
