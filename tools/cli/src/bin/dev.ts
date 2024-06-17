import { existsSync } from 'node:fs';
import { join } from 'node:path';

import dotenv from 'dotenv';
import { createServer } from 'vite';

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
  const server = await createServer(config);
  await server.listen();
  server.printUrls();
} catch (error) {
  console.log('🚀 ~ error:', error);
}
