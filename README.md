# VidaPet

[![Google Play Store](https://img.shields.io/badge/Google_Play-VidaPet-green?style=for-the-badge&logo=google-play)](https://play.google.com/store/apps/details?id=co.edu.upb.vidapet&hl=es_CO)
[![Built with Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Powered by Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)

**VidaPet** es una aplicación móvil moderna desarrollada para el cuidado, seguimiento e historial de mascotas. Diseñada e impulsada por estudiantes e investigadores de la Universidad Pontificia Bolivariana (UPB), la aplicación ofrece una experiencia fluida e intuitiva para que los dueños de mascotas mantengan al día la información médica, recordatorios y detalles generales de sus compañeros de vida.

---

## Descarga e Instalación

La aplicación está disponible oficialmente en la tienda de Google Play para dispositivos Android:

**[Descargar VidaPet en Google Play Store](https://play.google.com/store/apps/details?id=co.edu.upb.vidapet&hl=es_CO)**

---

## Características Principales

- **Gestión de Perfiles de Mascotas:** Registra datos clave de tus mascotas, como nombre, raza, edad, peso e imágenes.
- **Historial de Salud y Vacunación:** Lleva un control claro y organizado sobre vacunas, desparasitaciones y visitas al veterinario.
- **Recordatorios y Citas:** Configura alertas oportunas para medicamentos, controles médicos y aseo.
- **Soporte Multilingüe (i18n):** Interfaz adaptada con soporte de internacionalización para cambiar fácilmente de idioma.
- **Experiencia Rápida y Fluida:** Construida con una interfaz moderna y ligera impulsada por Vite.

---

## Tecnologías Utilizadas

- **Frontend Core:** JavaScript (ES6+), HTML5, CSS3.
- **Herramienta de Construcción:** [Vite](https://vitejs.dev/) (para un desarrollo y compilación ultrarrápidos).
- **Envoltorio Móvil:** [Capacitor](https://capacitorjs.com/) (para compilar a Android nativo).
- **Internacionalización:** i18n integrado.
- **Plataforma Objetivo:** Android (Java / Gradle).
- **Institución:** Universidad Pontificia Bolivariana (UPB).

---

## Desarrollo Local e Instalación

Si deseas ejecutar o compilar el proyecto localmente, sigue estos pasos:

### Prerrequisitos

- **Node.js** (v16.0 o superior)
- **npm** o **yarn**
- **Android Studio** (con SDK de Android configurado para la compilación móvil)

### Pasos de Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/vidaPetAPP.git
   cd vidaPetAPP-main
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en entorno de desarrollo web:**
   ```bash
   npm run dev
   ```

4. **Construir el proyecto web:**
   ```bash
   npm run build
   ```

5. **Sincronizar con el proyecto de Android mediante Capacitor:**
   ```bash
   npx cap sync android
   ```

6. **Abrir el proyecto en Android Studio:**
   ```bash
   npx cap open android
   ```
   *Desde Android Studio puedes ejecutar la app en un emulador o en un dispositivo físico conectado.*

---

## Estructura del Proyecto

```text
vidaPetAPP-main/
├── android/              # Proyecto nativo de Android (Gradle, Capacitor config)
├── assets/               # Recursos estáticos (Logos, iconos, vectores SVG)
├── public/               # Archivos públicos para el build
├── src/                  # Código fuente principal de la aplicación
│   ├── app.js            # Lógica principal de la aplicación
│   ├── i18n.js           # Configuración e idioma
│   ├── store.js          # Gestión de estado/datos
│   ├── main.js           # Punto de entrada de la aplicación
│   └── styles.css        # Estilos globales
├── capacitor.config.json # Configuración global de Capacitor
├── index.html            # Punto de entrada HTML
├── package.json          # Dependencias y scripts
└── vite.config.js        # Configuración del empaquetador Vite
```

---

## 📄 Licencia y Créditos

Desarrollado como proyecto institucional de la **Universidad Pontificia Bolivariana (UPB)**. Todos los derechos reservados.
