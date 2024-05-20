import { mergeConfig } from 'vite';
import { createConfiguration } from './config';

import { getRuntimeConfig } from './runtime';
import { resolve } from 'node:path';

export function createViteConfig(cwd: string) {
  const runtimeConfig = getRuntimeConfig();
  const config = createConfiguration(runtimeConfig);
  return mergeConfig(config, {
    root: resolve(cwd),
  });
}
