import { getRuntimeConfig } from '@idle/cli/src/vite/runtime';
import { setupGlobal } from '@idle/env/global';

globalThis.runtimeConfig = getRuntimeConfig();
setupGlobal();
