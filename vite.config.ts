import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      allowedHosts: ['smartshrip.com.tw'],
      proxy: {
        '/events': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          timeout: 0,
          configure: (proxy) => {
            proxy.on('error', (err: any) => {
              if (err.code === 'ECONNRESET' || err.code === 'EPIPE' || err.code === 'ECANCELED') return;
              console.error('[vite] events proxy error:', err.message);
            });
          },
        },
        '/auth':   { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/ponds':  { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/sensors':{ target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/cameras':{
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          timeout: 0,
          configure: (proxy) => {
            proxy.on('error', (err: any) => {
              if (err.code === 'ECONNRESET' || err.code === 'EPIPE' || err.code === 'ECANCELED') return;
              console.error('[vite] cameras proxy error:', err.message);
            });
          },
        },
        '/harvest':{ target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/admin':  { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/static': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/uploads':{ target: 'http://127.0.0.1:8000', changeOrigin: true },
      },
    },
  };
});
