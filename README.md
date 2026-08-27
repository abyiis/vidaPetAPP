# VidaPet — Community

VidaPet es una aplicación web progresiva y SPA (Single Page Application) enfocada en la gestión, cuidado e historial médico de mascotas. Diseñada con un enfoque *mobile-first*, permite a los propietarios registrar sus mascotas, agendar eventos o citas médicas, llevar un control de servicios prestados y consultar un historial completo en un solo lugar.

---

## Diseño y Wireframes

El diseño de la interfaz y el flujo de la experiencia de usuario (UX/UI) han sido prototipados y estructurados previamente en Figma:

**[Ver Wireframes y Diseño en Figma](https://www.figma.com/design/LaIEKBFpgWoeRzzAroseyr/VidaPet--Community-?node-id=0-1&t=CRtPCKlKfbSKpZXS-1)**

---

## Paleta de Colores y Tokens

La aplicación maneja un sistema de variables CSS (*Design Tokens*) adaptativo con soporte para **Modo Claro** y **Modo Oscuro**:

### Colores Principales
* **Primario:** `#0088CC` (Azul principal)
* **Secundario:** `#00B4D8` (Azul celeste)
* **Gradiente Principal:** `linear-gradient(135deg, #0088CC 0%, #00B4D8 100%)`
* **Acento:** `#2EE6C5` (Verde turquesa)
* **Peligro / Alerta:** `#FF5C6C` (Rojo coral)

### Modo Claro (Light Mode)
* **Fondo de pantalla (`--vp-bg`):** `#F4F8FA`
* **Superficie (`--vp-surface`):** `#FFFFFF`
* **Superficie Secundaria (`--vp-surface-2`):** `#EEF4F7`
* **Texto Primario (`--vp-text`):** `#132433`
* **Texto Secundario (`--vp-text-muted`):** `#6B8394`
* **Bordes (`--vp-border`):** `#E2ECF0`

### Modo Oscuro (Dark Mode)
* **Fondo de pantalla (`--vp-bg`):** `#0D1620`
* **Superficie (`--vp-surface`):** `#16212C`
* **Superficie Secundaria (`--vp-surface-2`):** `#1D2B38`
* **Texto Primario (`--vp-text`):** `#EAF2F6`
* **Texto Secundario (`--vp-text-muted`):** `#8AA0AF`
* **Bordes (`--vp-border`):** `#243444`

---

## Características y Funcionalidades (Features)

1. **Gestión de Mascotas**
   * Registro completo de perfil: nombre, especie (perro, gato, ave, etc.), raza, color, sexo, fecha de nacimiento, peso, altura y comentarios adicionales.
   * Carga y vista previa de foto de perfil por mascota.
   * Opción para cambiar de mascota activa rápidamente o eliminar registro.

2. **Agenda y Calendario Interactivo**
   * Calendario mensual dinámico con indicadores visuales de eventos agendados.
   * Creación y clasificación de citas: **Vacunas**, **Medicamentos** y **Consultas**.
   * Opciones para **reagendar** o **cancelar** citas programadas.
   * Vista detallada de eventos agrupados por día o eventos próximos.

3. **Módulo de Servicios**
   * Registro rápido mediante contador tipo *stepper* para servicios comunes: Medicamentos, Antipulgas, Consultas, Vacunas, Baño/corte de uñas y Corte de pelo.
   * Opción para incluir notas específicas (dosis, indicaciones) y seleccionar la fecha exacta de realización.

4. **Historial y Auditoría**
   * Registro cronológico automático de todas las acciones del sistema (altas, ediciones, bajas, citas, servicios y notas).
   * Filtros dinámicos por tipo: *Todos, Mascotas, Citas, Servicios* y *Notas*.
   * Buscador en tiempo real por palabra clave y opción de eliminación individual de registros.

5. **Notas Clínicas / Manuales**
   * Creación de notas de observación o recordatorios clínicos asignados a una mascota específica o generales.

6. **Configuración y Personalización**
   * **Modo Oscuro / Claro:** Alternancia de tema en tiempo real.
   * **Soporte Bilingüe (i18n):** Cambio de idioma de la interfaz entre Español e Inglés.
   * Modales informativos sobre la app, política de privacidad, términos y contacto.

7. **Persistencia Local y Funcionalidad Offline**
   * Arquitectura basada en `localStorage` mediante una capa de datos desacoplada (`store.js`), garantizando funcionamiento 100% offline sin necesidad de servidor backend.

---

## Tecnologías Utilizadas

* **HTML5** & **CSS3** (Design Tokens, variables nativas, flexbox y CSS grid)
* **JavaScript (ES6+)** (Arquitectura orientada a eventos y programación modular)
* **Bootstrap 5.3 & Bootstrap Icons** (Maquetación base y sistema de componentes modales/toast)
* **Google Fonts** (*Poppins* para encabezados e *Inter* para cuerpo de texto)
