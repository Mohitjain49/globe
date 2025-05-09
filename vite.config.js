import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from 'vite-plugin-static-copy';

const cesiumSource = "node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = "cesium";

export default defineConfig({
    base: "/globe/",
    server: { port: 5050 },
    build: { chunkSizeWarningLimit: 5000 },
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
                { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
                { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
                { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
            ],
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl)
    }
});