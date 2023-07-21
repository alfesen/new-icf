import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
    clearMocks: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use './src/sass/_mixins.scss' as m;
          @import './src/sass/_vars.scss';
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;0,700;1,400&family=Satisfy&display=swap');
        `,
      },
    },
  },
})
