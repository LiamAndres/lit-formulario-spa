/**
 * main.js
 * Punto de entrada de la aplicación (Entry Point)
 *
 * Este archivo importa y registra los componentes Web Components usados en el proyecto.
 * Al importarlos, estos se registran automáticamente en el `customElements` registry
 * y se pueden usar como etiquetas HTML personalizadas (Custom Elements).
 *
 * Este archivo se carga desde el <script type="module"> del index.html
 * y garantiza que toda la app se inicialice correctamente.
 */

// Componente raíz que contiene toda la lógica de navegación y paso de datos
import './components/AppRoot.js';

// Formularios correspondientes a cada paso del flujo
import './components/FormDatos.js';
import './components/FormLenguajes.js';
import './components/FormExperiencia.js';
import './components/FormResumen.js';

import './components/atoms/CardContainer.js';
import './components/atoms/ButtonPrimary.js';
import './components/atoms/ButtonSecondary.js';



