import * as Cesium from 'cesium';

export const CESIUM_GLOBE_ID = "mohit-website-globe";
export const CESIUM_GEOCODER_ID = "mohit-website-geocoder";

export const useGlobeStore = defineStore("globe-store", () => {
    const router = useRouter();
    const pageViewStore = usePageViewStore();
    const screenStore = useScreenStore();

    const mapLayersIndex = ref(1);

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
     * This function sets the map layers.
     * @param {Number} index The index of the map layers.
     */
    function setMapLayers(index = 1) {
        if(index == 0 && mapLayersIndex.value != 0) {
            const aerialMap = Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL
            });

            cesiumGlobe.value.viewer.imageryLayers.removeAll(false);
            cesiumGlobe.value.viewer.imageryLayers.add(aerialMap);
            mapLayersIndex.value = 0;
        } else if(index == 1 && mapLayersIndex.value != 1) {
            const labelsMap = Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
            });

            cesiumGlobe.value.viewer.imageryLayers.removeAll(false);
            cesiumGlobe.value.viewer.imageryLayers.add(labelsMap);
            mapLayersIndex.value = 1;
        } else if(index == 2&& mapLayersIndex.value != 2) {
            const roadMap = Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.ROAD
            });

            cesiumGlobe.value.viewer.imageryLayers.removeAll(false);
            cesiumGlobe.value.viewer.imageryLayers.add(roadMap);
            mapLayersIndex.value = 2;
        }
    }

    return { cesiumGlobe, mapLayersIndex,
        mountGlobeStore, unmountGlobeStore, getNavBtnRoute, setMapLayers
    }
});