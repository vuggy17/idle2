/* eslint-disable import/no-extraneous-dependencies */
import type { RuntimeConfig } from '@idle/env/global';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import * as vite from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const rootPath = join(fileURLToPath(import.meta.url), '..', '..');
export const workspaceRoot = join(rootPath, '..', '..', '..');
const webPublicPath = join(
  workspaceRoot,
  'packages',
  'frontend',
  'core',
  'public',
);

function watchNodeModules(modules: string[]): vite.PluginOption {
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

export function createConfiguration(
  runtimeConfig: RuntimeConfig,
): vite.UserConfig {
  return vite.defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      vanillaExtractPlugin(),
      watchNodeModules(['@idle/component', '@idle/http']),
    ],

    define: {
      runtimeConfig,
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    resolve: {
      alias: {
        $public: resolve(webPublicPath),
      },
    },

    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          secure: false,
          changeOrigin: true,
        },
      },
    },
  });
}
