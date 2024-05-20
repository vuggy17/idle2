import { config } from 'dotenv';
import { existsSync } from 'fs';
import { register } from 'module';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { build, preview } from 'vite';
import { projectRoot } from '../config';
import { createViteConfig } from '../vite/create-vite-config';

register('ts-node/esm', pathToFileURL('./'));
const files = ['.env'];

for (const file of files) {
  if (existsSync(join(projectRoot, file))) {
    config({
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
