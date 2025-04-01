import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Force Vite to use 5173
    open: true, // Auto-opens in browser
  },
});

