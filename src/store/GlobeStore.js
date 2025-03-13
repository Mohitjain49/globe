import { defineStore } from "pinia";
import { ref, nextTick } from "vue";

import { usePageViewStore, useScreenStore } from "./ExtraStores.js";
import AppGlobe from "./AppGlobe.js";
import * as Cesium from 'cesium';

export const CESIUM_GLOBE_ID = "mohit-website-globe";
export const CESIUM_GEOCODER_ID = "mohit-website-geocoder";

export const useGlobeStore = defineStore("globe-store", () => {
    const pageViewStore = usePageViewStore();
    const screenStore = useScreenStore();

    const globePresent = ref(false);
    const menuOpen = ref(-1);

    /**
     * @type {import('vue').Ref<AppGlobe>} This is the Cesium Globe that is used within the webpage.
     */
    const cesiumGlobe = ref(null);

    /**
     * This mounts the globe store when used by the Globe Page.
     */
    function mountGlobeStore() {
        if(globePresent.value) { return; }
        globePresent.value = true;

        document.title = "Mohit Jain | My Globe";
        cesiumGlobe.value = new AppGlobe();
        
        menuOpen.value = ((window.innerWidth > 600) ? 0 : -1);
        nextTick().then(() => {
            if(menuOpen.value == 0) { cesiumGlobe.value.setGeocoder(); }
        })

        pageViewStore.setPageViewEL();
        screenStore.setFullScreenEL();
        setGlobeELs();
    }

    /**
     * This unmounts the globe store when the user exits the Globe Page.
     */
    function unmountGlobeStore() {
        if(!globePresent.value) { return; }
        globePresent.value = false;
        setMenuOpen(-1);

        pageViewStore.removePageViewEL();
        dateStore.stopDateInterval();
        screenStore.removeFullScreenEL();

        removeGlobeELs();
        cesiumGlobe.value.destroyMap();
    }

    /**
     * This functions sets the event listeners for the map.
     */
    function setGlobeELs() {
        const eventHandler = cesiumGlobe.value.viewer.screenSpaceEventHandler;
        const eventTypes = Cesium.ScreenSpaceEventType;

        eventHandler.setInputAction(
            (event) => {},
            eventTypes.LEFT_DOWN
        );
        eventHandler.setInputAction(
            (event) => {},
            eventTypes.MOUSE_MOVE
        );
        eventHandler.setInputAction(
            (event) => {},
            eventTypes.LEFT_UP
        );
        eventHandler.setInputAction(
            (event) => {},
            eventTypes.LEFT_CLICK
        );
        eventHandler.setInputAction(
            (event) => {},
            eventTypes.RIGHT_CLICK
        );
        eventHandler.setInputAction(
            (event) => {},
            eventTypes.LEFT_DOUBLE_CLICK
        );
    }

    /**
     * This removes the event listeners for the map.
     */
    function removeGlobeELs() {
        const eventHandler = cesiumGlobe.value.viewer.screenSpaceEventHandler;
        const eventTypes = Cesium.ScreenSpaceEventType;

        eventHandler.removeInputAction(eventTypes.LEFT_DOWN);
        eventHandler.removeInputAction(eventTypes.MOUSE_MOVE);
        eventHandler.removeInputAction(eventTypes.LEFT_UP);
        eventHandler.removeInputAction(eventTypes.LEFT_CLICK);
        eventHandler.removeInputAction(eventTypes.RIGHT_CLICK);
        eventHandler.removeInputAction(eventTypes.LEFT_DOUBLE_CLICK);
    }

    /**
     * This sets which menu should be opened. 
     * @param {Number} index The index of the menu. Default value is -1.
     */
    function setMenuOpen(index = -1) {
        menuOpen.value = ((menuOpen.value == index) ? -1 : index);
    }

    return { cesiumGlobe, globePresent, menuOpen,
        mountGlobeStore, unmountGlobeStore, setMenuOpen
    }
});