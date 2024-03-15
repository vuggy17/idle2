/* eslint-disable vars-on-top, no-var */
import { RuntimeConfig } from '@idle/env/global';

declare global {
  var process: {
    env: Record<string, string>;
  };
  var runtimeConfig: RuntimeConfig;
  var $IDLE_SETUP: boolean | undefined;
}
