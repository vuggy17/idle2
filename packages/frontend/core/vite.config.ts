import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { getRuntimeConfig } from '../../common/env/src/runtime';

import type { PluginOption } from 'vite';
import { resolve } from 'path';

export function watchNodeModules(modules: string[]): PluginOption {
  return {
    name: 'watch-node-modules',
    config() {
      return {
        server: {
          watch: {
            ignored: modules.map((m) => `!**/node_modules/${m}/**`),
          },
        },
        optimizeDeps: {
          exclude: modules,
        },
      };
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    watchNodeModules(['@idle/component']),
  ],

  define: {
    runtimeConfig: getRuntimeConfig(),
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  resolve: {
    alias: {
      $public: resolve('./public'),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      },
    },
  },
});
