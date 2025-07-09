import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';

import vue from "@vitejs/plugin-vue";
import swc from "unplugin-swc";

import Info from "unplugin-info/vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

const cesiumSource = "node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = "cesium";

export default defineConfig({
    base: "./",
    server: { port: 5050 },
    build: {
        chunkSizeWarningLimit: 5000,
        outDir: 'dist-electron',
        emptyOutDir: true
    },
    plugins: [
        vue(),
        swc.vite(),
        Info(),
        Components({ dts: true }),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            dirs: ["./src/store"],
            dts: true,
            vueTemplate: true
        }),
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