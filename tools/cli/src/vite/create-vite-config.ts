/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'node:path';

import { mergeConfig } from 'vite';

import { createConfiguration } from './config';
import { getRuntimeConfig } from './runtime';

export function createViteConfig(cwd: string) {
  const runtimeConfig = getRuntimeConfig();
  const config = createConfiguration(runtimeConfig);
  return mergeConfig(config, {
    root: resolve(cwd),
  });
}
