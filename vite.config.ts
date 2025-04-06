import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      'components': '/src/components',
      'pages': '/src/pages',
      'layouts': '/src/layouts',
      'routes': '/src/routes',
      'assets': '/src/assets',
      'config': '/src/config',
      'hooks': '/src/hooks',
      'interfaces': '/src/interfaces',
      'store': '/src/store',
      'utils': '/src/utils',
      'service': '/src/service',
      'contexts': '/src/contexts'
    }
  }
})
