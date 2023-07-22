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
          @use './src/sass/abstracts/mixins' as m;
          @import './src/sass/abstracts/vars';
          
          @import './src/sass/layout/layout';
          
          @import './src/sass/base/base';
          @import './src/sass/typography/typography';
          
          @import './src/sass/components/general';
        `,
      },
    },
  },
})
