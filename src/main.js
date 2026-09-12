/* =========================================================
   VIDAPET · MAIN.JS
   Punto de entrada de Vite.
   Antes: Bootstrap, iconos y fuentes se cargaban desde CDNs
   (jsdelivr / fonts.googleapis.com) directamente en index.html.
   Eso rompe la app dentro del WebView nativo (AAB) sin datos
   o con red inestable, y es justo lo que el taller académico
   pide evitar ("la app no debe requerir internet").
   Ahora todo se empaqueta localmente con Vite y queda dentro
   del bundle final: la app funciona 100% offline. ========= */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import * as bootstrap from 'bootstrap';

import './styles.css';

// app.js usa `bootstrap.Modal.getOrCreateInstance(...)` como global.
window.bootstrap = bootstrap;

import './app.js';
