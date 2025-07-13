import * as Cesium from 'cesium';

export const CESIUM_GLOBE_ID = "mohit-website-globe";
export const CESIUM_GEOCODER_ID = "mohit-website-geocoder";

export const useGlobeStore = defineStore("globe-store", () => {
    const router = useRouter();
    const pageViewStore = usePageViewStore();
    const screenStore = useScreenStore();

    const mapLayersIndex = ref(1);
    const showGoogleTileset = ref(false);

    /**
     * @type {import('vue').Ref<AppGlobe>} This is the Cesium Globe that is used within the webpage.
     */
    const cesiumGlobe = ref(null);

    /**
     * @type {Cesium.Primitive} This is the primitive that hosts Google tileset.
     */
    var googleTilesetPrimitive;

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
    async function mountGlobeStore() {
        cesiumGlobe.value = new AppGlobe();
        pageViewStore.setPageViewEL();
        screenStore.setFullScreenEL();

        if(window.innerWidth <= 600 && router.currentRoute.value.path === "/") {
            router.replace("/blank")
        }
        setGlobeELs();

        Cesium.Cesium3DTileset.fromIonAssetId(2275207).then((tileset) => {
            googleTilesetPrimitive = cesiumGlobe.value.viewer.scene.primitives.add(tileset);
            googleTilesetPrimitive.show = false;
        }).catch((e) => {
            console.error(e);
        });
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
     * Based on the boolean, this will set the status of the google tileset.
     */
    function setGoogleTilesetStatus() {
        if(googleTilesetPrimitive == null) {
            showGoogleTileset.value = false;
            return;
        } else {
            googleTilesetPrimitive.show = showGoogleTileset.value;
        }
    }

    /**
     * This function sets the map layers.
     * @param {Number} index The index of the map layers.
     */
    function setMapLayers(index = 1) {
        if(index == mapLayersIndex.value) { return; }
        cesiumGlobe.value.viewer.imageryLayers.removeAll(false);

        if(index == 0) {
            mapLayersIndex.value = 0;
            setImageryLayer(Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL
            }));
        } else if(index == 1) {
            mapLayersIndex.value = 1;
            setImageryLayer(Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
            }));
        } else if(index == 2) {
            mapLayersIndex.value = 2;
            setImageryLayer(Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.ROAD
            }));
        } else if(index == 3) {
            mapLayersIndex.value = 3;
            setImageryLayer(Cesium.ImageryLayer.fromProviderAsync(
                Cesium.TileMapServiceImageryProvider.fromUrl(
                    Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
                )
            ));
        }
    }

    /**
     * This helper function adds the imagery layer to the map.
     * @param {Cesium.ImageryLayer} layer The Cesium Imagery Layer.
     */
    function setImageryLayer(layer) {
        cesiumGlobe.value.viewer.imageryLayers.add(layer);
    }

    return { cesiumGlobe, mapLayersIndex, showGoogleTileset,
        mountGlobeStore, unmountGlobeStore, getNavBtnRoute, setMapLayers, setGoogleTilesetStatus
    }
});