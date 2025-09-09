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

export default defineConfig({
    base: "/globe/",
    server: {
        port: 5050,
        watch: { ignored: ["**/src-tauri/**"] }
    },
    build: { chunkSizeWarningLimit: 5000 },
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
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl)
    }
});