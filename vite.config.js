import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vitePluginCesium from 'vite-plugin-cesium';

export default defineConfig({
    base: "/globe",
    server: { port: 5050 },
    build: { chunkSizeWarningLimit: 5000 },
    plugins: [
        vue(),
        vitePluginCesium({ rebuildCesium: false })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});