import { defineStore } from "pinia";
import { ref } from "vue";

import AppGlobe from "./AppGlobe.js";
import * as Cesium from 'cesium';

export const useMenuStore = defineStore("MenuStore", () => {
    const menuOpen = ref(0);

    return { menuOpen }
})