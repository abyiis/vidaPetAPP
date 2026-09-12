import { defineConfig } from 'vite';

export default defineConfig({
  // Capacitor sirve la app empaquetada desde la raíz de su servidor local
  // interno (https://localhost en Android, capacitor://localhost en iOS),
  // así que rutas absolutas ("/assets/...", "/src/...") funcionan igual
  // en dev, en "vite preview" y dentro del WebView nativo.
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    port: 5173
  }
});
