# VidaPet

App para organizar la salud y cuidados de tus mascotas (citas, servicios, historial y notas clínicas). 100% offline — todos los datos se guardan en `localStorage` del dispositivo.

## Qué cambió en esta versión

1. **Cambio de idioma corregido.** Antes solo se traducían los 5 botones del menú inferior; el resto de la app (formularios, modales, estados vacíos, toasts) quedaba en español y además se re-escribía en español cada vez que se navegaba a otra pantalla. Ahora hay un diccionario central (`src/i18n.js`) que traduce toda la interfaz y sobrevive a los re-renders.
2. **Estado vacío en Servicios.** Si todavía no hay mascotas registradas, la pantalla de Servicios (accesible desde la barra inferior) ya no muestra el selector de servicios: muestra un mensaje sugiriendo crear una mascota primero, igual que ya hacían Agenda e Historial.
3. **Nueva tarjeta "Próxima cita"** en la vista Mascotas: muestra de un vistazo la siguiente cita agendada de la mascota seleccionada, sin tener que entrar a Agenda.
4. **Bundler Vite + npm.** El proyecto pasó de scripts sueltos (`<script src="app.js">`) a un proyecto npm con módulos ES, listo para compilar y empaquetar como app nativa.
5. **Offline real.** Bootstrap, los iconos y las fuentes (antes cargados desde CDNs externos) ahora se empaquetan localmente con Vite. La app no depende de internet para verse o funcionar correctamente dentro del WebView nativo.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173 con recarga en caliente
```

## Build de producción (web)

```bash
npm run build       # genera dist/
npm run preview     # sirve dist/ para probarlo tal cual quedará empaquetado
```

## Convertir en app Android y generar el `.aab`

El proyecto ya trae `capacitor.config.json` listo (`appId: com.vidapet.app`). Pasos:

1. Instalar Capacitor (una sola vez):
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```
2. Compilar el sitio y añadir la plataforma Android:
   ```bash
   npm run build
   npx cap add android
   ```
3. Cada vez que cambies el código web, sincroniza antes de compilar la app nativa:
   ```bash
   npm run build && npx cap sync android
   ```
4. Abrir el proyecto nativo en Android Studio:
   ```bash
   npx cap open android
   ```
5. Generar una **clave de firma** (una sola vez, guárdala fuera del repo):
   ```bash
   keytool -genkey -v -keystore vidapet-release.keystore -alias vidapet -keyalg RSA -keysize 2048 -validity 10000
   ```
6. Generar el AAB firmado:
   - Desde Android Studio: `Build → Generate Signed Bundle / APK… → Android App Bundle`, usando el keystore del paso 5.
   - O por línea de comandos, configurando `android/keystore.properties` con las credenciales y luego:
     ```bash
     cd android
     ./gradlew bundleRelease
     ```
   El archivo queda en `android/app/build/outputs/bundle/release/app-release.aab`. Ese es el que se sube a Play Console.

### Antes de subir a Play Store
- Cuenta de desarrollador de Google Play (pago único de $25 USD).
- Ícono adaptativo y splash screen en las resoluciones que pide Android — se pueden generar automáticamente con `@capacitor/assets` a partir de `public/assets/icons/logo.svg`.
- Política de privacidad publicada (Play Console la exige aunque los datos se queden solo en el dispositivo).
- Probar el AAB en un dispositivo/emulador real antes de publicar (`npx cap run android`).

## Estructura del proyecto

```
index.html          Marcado de todas las vistas (SPA de una sola página) + atributos data-i18n
src/
  main.js            Entry point de Vite: empaqueta Bootstrap, iconos, fuentes y estilos
  app.js             Lógica de UI / navegación / render de cada vista
  store.js           Persistencia en localStorage (mascotas, citas, servicios, historial)
  i18n.js            Diccionario ES/EN + helpers de traducción
  styles.css         Estilos propios
public/
  assets/icons/      Ícono/logo servidos tal cual (sin procesar por Vite)
capacitor.config.json
vite.config.js
```
