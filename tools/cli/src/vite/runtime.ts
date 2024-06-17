import type { RuntimeConfig } from '@idle/env/global';

export function getRuntimeConfig(): RuntimeConfig {
  const configs: RuntimeConfig = {
    appwriteProjectHost: process.env.APPWRITE_PROJECT_HOST || '',
    appwriteProjectId: process.env.APPWRITE_PROJECT_ID || '',
    cloudinary: {
      apiKey: process.env.CLOUDINARY_API_KEY || '',
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    },
    pusher: {
      authorizeEndpoint: '/api/ws',
      cluster: process.env.PUSHER_APP_CLUSTER || '',
      appKey: process.env.PUSHER_APP_KEY || '',
    },
  };

  return configs;
}
