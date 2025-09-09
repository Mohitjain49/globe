import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';

import vue from "@vitejs/plugin-vue";
import Info from "unplugin-info/vite";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import EnvTypes from 'vite-plugin-env-types';

const cesiumSource = "node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = "cesium";
const host = process.env.TAURI_DEV_HOST;

export default defineConfig(({ mode }) => {
    const TAURI_MODE = (mode === "tauri");

    return {
        base: (TAURI_MODE ? "/" : "/globe/"),
        server: {
            port: 5050,
            strictPort: TAURI_MODE,
            host: (TAURI_MODE ? (host || false) : false),
            hmr: ((TAURI_MODE && host) ? { protocol: "ws", host, port: 5051 } : undefined),
            watch: { ignored: ["**/src-tauri/**"] }
        },
        build: {
            outDir: (TAURI_MODE ? 'dist-tauri' : 'dist'),
            chunkSizeWarningLimit: 5000
        },
        plugins: [
            vue(),
            Info(),
            EnvTypes({ dts: "./dts/vite-env.d.ts" }),
            Components({ dts: "./dts/components.d.ts" }),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                dirs: ["./src/store"],
                dts: "./dts/auto-imports.d.ts",
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
        clearScreen: false,
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        define: {
            CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl)
        }
    }
});