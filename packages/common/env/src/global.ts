import z from 'zod';

export const runtimeFlagsSchema = z.object({
  serverUrlPrefix: z.string(),
  appwriteProjectHost: z.string(),
  appwriteProjectId: z.string(),
});

export type RuntimeConfig = z.infer<typeof runtimeFlagsSchema>;

export function setupGlobal() {
  if (globalThis.$IDLE_SETUP) {
    return;
  }

  runtimeFlagsSchema.parse(runtimeConfig);

  globalThis.$IDLE_SETUP = true;
}
