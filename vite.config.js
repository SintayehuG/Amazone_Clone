
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // base: '/Ammazon-Clone-2025/', // ✅ required for GitHub Pages or subdirectory
  plugins: [react()],
  server: {
    historyApiFallback: true, // ✅ Fix for refreshing on React Router routes
  },
});
