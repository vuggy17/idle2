import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import fg from 'fast-glob';

import { projectRoot } from '@idle/cli/src/config/index';
import { createViteConfig } from '@idle/cli/src/vite/create-vite-config';

const cwd = join(projectRoot, 'packages', 'frontend', 'web');
const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default mergeConfig(createViteConfig(cwd), {
  test: {
    setupFile: [resolve(rootDir, './scripts/setup-global.ts')],
    exclude: ['**/node_modules', '**/dist', '**/build', '**/out,'],
    include: [
      // rootDir cannot be used as a pattern on windows
      fg.convertPathToPattern(rootDir) +
        'packages/{common,frontend}/**/*.spec.{ts,tsx}',
    ],
    testTimeout: 5000,
  },
});
