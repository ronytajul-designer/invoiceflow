import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative asset paths so the build works at any URL, including
  // https://<user>.github.io/invoiceflow/ on GitHub Pages.
  base: './',
  plugins: [react(), tailwindcss()],
});
