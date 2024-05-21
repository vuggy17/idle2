import { existsSync } from 'node:fs';
import { join } from 'node:path';

import dotenv from 'dotenv';
import { build, preview } from 'vite';

import { projectRoot } from '../config';
import { createViteConfig } from '../vite/create-vite-config';

const files = ['.env'];

for (const file of files) {
  if (existsSync(join(projectRoot, file))) {
    dotenv.config({
      path: join(projectRoot, file),
    });
    console.log(`${file} at ${projectRoot} loaded`);
    break;
  }
}

const cwd = join(projectRoot, 'packages', 'frontend', 'web');

try {
  const config = createViteConfig(cwd);
  await build(config);
  const previewServer = await preview(config);
  previewServer.printUrls();
} catch (error) {
  console.log('🚀 ~ error:', error);
}
