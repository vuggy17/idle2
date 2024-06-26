import z, { ZodError } from 'zod';

export const runtimeFlagsSchema = z.object({
  appwriteProjectHost: z.string(),
  appwriteProjectId: z.string(),
  cloudinary: z.object({
    apiKey: z.string(),
    cloudName: z.string(),
  }),
  pusher: z.object({
    authorizeEndpoint: z.string(),
    cluster: z.string(),
    appKey: z.string(),
  }),
});

export type RuntimeConfig = z.infer<typeof runtimeFlagsSchema>;

export function setupGlobal() {
  if (globalThis.$IDLE_SETUP) {
    return;
  }
  try {
    runtimeFlagsSchema.parse(runtimeConfig);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Missing env variable, try restart pnpm dev command');
    }
  }
  globalThis.$IDLE_SETUP = true;
}
