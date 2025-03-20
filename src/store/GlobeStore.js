import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { usePageViewStore, useScreenStore, getBtnRoute } from "./ExtraStores.js";
import { POINTS } from "./Points.js";

import AppGlobe from "./AppGlobe.js";
import * as Cesium from 'cesium';

export const CESIUM_GLOBE_ID = "mohit-website-globe";
export const CESIUM_GEOCODER_ID = "mohit-website-geocoder";

export const useGlobeStore = defineStore("globe-store", () => {
    const router = useRouter();
    const pageViewStore = usePageViewStore();
    const screenStore = useScreenStore();

    /**
     * @type {import('vue').Ref<AppGlobe>} This is the Cesium Globe that is used within the webpage.
     */
    const cesiumGlobe = ref(null);

    /**
     * This returns the "blank" route if the visitor is already visiting that route.
     * @param {String} btnRoute The route to navigate to upon clicking the button.
     */
    function getNavBtnRoute(btnRoute = "/") {
        return getBtnRoute(btnRoute);
    }

    /**
     * This mounts the globe store when used by the Globe Page.
     */
    function mountGlobeStore() {
        cesiumGlobe.value = new AppGlobe();
        pageViewStore.setPageViewEL();
        screenStore.setFullScreenEL();

        if(window.innerWidth <= 600 && router.currentRoute.value.path === "/") {
            router.replace("/blank")
        }

        initPoints();
        setGlobeELs();
    }

    /**
     * This unmounts the globe store when the user exits the Globe Page.
     */
    function unmountGlobeStore() {
        pageViewStore.removePageViewEL();
        screenStore.removeFullScreenEL();
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
     * This function initializes all points for the map.
     */
    function initPoints() {
        let mapEntities = cesiumGlobe.value.viewer.entities;
        for(let i = 0; i < POINTS.length; i++) {
            const point = POINTS[i];
            mapEntities.add({
                position: cesiumGlobe.value.createPosition(point.lon, point.lat),
                point: { pixelSize: 15, color: Cesium.Color.CRIMSON }
            });
        }
    }

    return { cesiumGlobe,
        mountGlobeStore, unmountGlobeStore, getNavBtnRoute
    }
});