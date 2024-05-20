import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { config } from 'dotenv';
import { projectRoot } from '../config';
import { createViteConfig } from '../vite/create-vite-config';
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import { createServer } from 'vite';

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
  const server = await createServer(config);
  await server.listen();
  server.printUrls();
} catch (error) {
  console.log('🚀 ~ error:', error);
}
