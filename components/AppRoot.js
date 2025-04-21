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

        .form-card {
            background-color: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
            width: 800px;
            margin: auto;
        }

        .nav {
            margin-top: 2rem;
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }

        button {
            font-size: 1rem;
            border-radius: 6px;
            padding: 0.6rem 1.2rem;
            border: none;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        .btn-primary {
            background-color: #2563eb;
            color: white;
        }

        .btn-primary:hover {
            background-color: #1d4ed8;
        }

        .btn-secondary {
            background-color: #e5e7eb;
            color: black;
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

    siguiente() {
        if (this.paso === 'datos'){
            const form = this.renderRoot.querySelector('form-datos');
            if (!form.isValid()) return;
            this.paso = 'lenguajes';
        }
        else if (this.paso === 'lenguajes') {
            const form = this.renderRoot.querySelector('form-lenguajes');
            if (!form.isValid()) return;
            this.paso = 'experiencia';
          }
        else if (this.paso === 'experiencia') {
        const form = this.renderRoot.querySelector('form-experiencia');
        if (!form.isValid()) return;
        this.paso = 'resumen';
        }
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
                <div class="form-card">
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
                
                    <!-- Botones de navegación dentro del form-card -->
                    <div class="nav">
                        ${this.paso !== 'datos' ? html`<button class="btn-secondary" @click=${this.anterior}>Anterior</button>` : ''}
                        ${this.paso !== 'resumen' ? html`<button class="btn-primary" @click=${this.siguiente}>Siguiente</button>` : ''}
                    </div> <!-- fin de div class nav -->
                </div> <!-- fin de div class form-card -->
            </main>
        `;
    }
}

customElements.define('app-root', AppRoot);
