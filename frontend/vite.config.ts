import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("src/")
    } 
  },
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
  }
});
