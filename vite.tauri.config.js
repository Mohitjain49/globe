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
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
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

    // 1. prevent vite from obscuring rust errors
    clearScreen: false,

    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 5050,
        strictPort: true,
        host: host || false,
        hmr: host ? { protocol: "ws", host, port: 5051 } : undefined,
        watch: { ignored: ["**/src-tauri/**"] }, // 3. tell vite to ignore watching `src-tauri`
    },
    build: {
        outDir: 'dist-tauri'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl)
    }
}));
