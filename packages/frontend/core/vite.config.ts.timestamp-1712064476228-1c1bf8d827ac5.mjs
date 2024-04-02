// vite.config.ts
import { vanillaExtractPlugin } from "file:///workspaces/idle2/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import react from "file:///workspaces/idle2/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///workspaces/idle2/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { defineConfig } from "file:///workspaces/idle2/node_modules/vite/dist/node/index.js";

// ../../common/env/src/runtime.ts
function getRuntimeConfig() {
  const configs = {
    appwriteProjectHost: process.env.APPWRITE_PROJECT_HOST,
    appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
    serverUrlPrefix: process.env.SERVER_URL_PREFIX
  };
  if (process.env.NODE_ENV === "development") {
    configs.serverUrlPrefix = "http://localhost:8080";
  }
  return configs;
}

// vite.config.ts
import { resolve } from "path";
function watchNodeModules(modules) {
  return {
    name: "watch-node-modules",
    config() {
      return {
        server: {
          watch: {
            ignored: modules.map((m) => `!**/node_modules/${m}/**`)
          }
        },
        optimizeDeps: {
          exclude: modules
        }
      };
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    watchNodeModules(["@idle/component"])
  ],
  define: {
    runtimeConfig: getRuntimeConfig()
  },
  preview: {
    port: 4300,
    host: "localhost"
  },
  resolve: {
    alias: {
      $public: resolve("./public")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default,
  watchNodeModules
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vY29tbW9uL2Vudi9zcmMvcnVudGltZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2VzL2lkbGUyL3BhY2thZ2VzL2Zyb250ZW5kL2NvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2VzL2lkbGUyL3BhY2thZ2VzL2Zyb250ZW5kL2NvcmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3dvcmtzcGFjZXMvaWRsZTIvcGFja2FnZXMvZnJvbnRlbmQvY29yZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbic7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBnZXRSdW50aW1lQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2Vudi9zcmMvcnVudGltZSc7XG5cbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXRjaE5vZGVNb2R1bGVzKG1vZHVsZXM6IHN0cmluZ1tdKTogUGx1Z2luT3B0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnd2F0Y2gtbm9kZS1tb2R1bGVzJyxcbiAgICBjb25maWcoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgaWdub3JlZDogbW9kdWxlcy5tYXAoKG0pID0+IGAhKiovbm9kZV9tb2R1bGVzLyR7bX0vKipgKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgICAgICBleGNsdWRlOiBtb2R1bGVzLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgdmFuaWxsYUV4dHJhY3RQbHVnaW4oKSxcbiAgICB3YXRjaE5vZGVNb2R1bGVzKFsnQGlkbGUvY29tcG9uZW50J10pLFxuICBdLFxuXG4gIGRlZmluZToge1xuICAgIHJ1bnRpbWVDb25maWc6IGdldFJ1bnRpbWVDb25maWcoKSxcbiAgfSxcblxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogNDMwMCxcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgfSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICRwdWJsaWM6IHJlc29sdmUoJy4vcHVibGljJyksXG4gICAgfSxcbiAgfSxcblxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi93b3Jrc3BhY2VzL2lkbGUyL3BhY2thZ2VzL2NvbW1vbi9lbnYvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlcy9pZGxlMi9wYWNrYWdlcy9jb21tb24vZW52L3NyYy9ydW50aW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL2lkbGUyL3BhY2thZ2VzL2NvbW1vbi9lbnYvc3JjL3J1bnRpbWUudHNcIjtpbXBvcnQgdHlwZSB7IFJ1bnRpbWVDb25maWcgfSBmcm9tICcuL2dsb2JhbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSdW50aW1lQ29uZmlnKCk6IFJ1bnRpbWVDb25maWcge1xuICBjb25zdCBjb25maWdzOiBSdW50aW1lQ29uZmlnID0ge1xuICAgIGFwcHdyaXRlUHJvamVjdEhvc3Q6IHByb2Nlc3MuZW52LkFQUFdSSVRFX1BST0pFQ1RfSE9TVCxcbiAgICBhcHB3cml0ZVByb2plY3RJZDogcHJvY2Vzcy5lbnYuQVBQV1JJVEVfUFJPSkVDVF9JRCxcbiAgICBzZXJ2ZXJVcmxQcmVmaXg6IHByb2Nlc3MuZW52LlNFUlZFUl9VUkxfUFJFRklYLFxuICB9O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIGNvbmZpZ3Muc2VydmVyVXJsUHJlZml4ID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCc7XG4gIH1cblxuICByZXR1cm4gY29uZmlncztcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyw0QkFBNEI7QUFDL1UsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsb0JBQW9COzs7QUNEdEIsU0FBUyxtQkFBa0M7QUFDaEQsUUFBTSxVQUF5QjtBQUFBLElBQzdCLHFCQUFxQixRQUFRLElBQUk7QUFBQSxJQUNqQyxtQkFBbUIsUUFBUSxJQUFJO0FBQUEsSUFDL0IsaUJBQWlCLFFBQVEsSUFBSTtBQUFBLEVBQy9CO0FBRUEsTUFBSSxRQUFRLElBQUksYUFBYSxlQUFlO0FBQzFDLFlBQVEsa0JBQWtCO0FBQUEsRUFDNUI7QUFFQSxTQUFPO0FBQ1Q7OztBRFBBLFNBQVMsZUFBZTtBQUVqQixTQUFTLGlCQUFpQixTQUFpQztBQUNoRSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQ1AsYUFBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0wsU0FBUyxRQUFRLElBQUksQ0FBQyxNQUFNLG9CQUFvQixDQUFDLEtBQUs7QUFBQSxVQUN4RDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGNBQWM7QUFBQSxVQUNaLFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxxQkFBcUI7QUFBQSxJQUNyQixpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQztBQUFBLEVBQ3RDO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixlQUFlLGlCQUFpQjtBQUFBLEVBQ2xDO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsU0FBUyxRQUFRLFVBQVU7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
