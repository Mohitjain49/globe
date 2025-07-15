import * as Cesium from 'cesium';

export const CESIUM_GLOBE_ID = "mohit-website-globe";
export const CESIUM_GEOCODER_ID = "mohit-website-geocoder";
const ONLINE_TEST_URL = "https://mohitjain49.github.io/globe/static-icons/Personal_Icon_Green_Expanded.png";

export const useGlobeStore = defineStore("globe-store", () => {
    const router = useRouter();
    const pageViewStore = usePageViewStore();
    const screenStore = useScreenStore();

    const appConnected = ref(false);
    const mapLayersIndex = ref(1);
    const showGoogleTileset = ref(false);

    var appConnectedInterval = null;

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
        setOnlineInterval();

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

        if(appConnectedInterval == null) { return; }
        clearInterval(appConnectedInterval);
        appConnectedInterval = null;
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
        if(window.innerWidth <= 1000) { router.push('/blank'); }

        if(index == 0 && appConnected.value) {
            mapLayersIndex.value = 0;
            setImageryLayer(Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL
            }));
        } else if(index == 1 && appConnected.value) {
            mapLayersIndex.value = 1;
            setImageryLayer(Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
            }));
        } else if(index == 2 && appConnected.value) {
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
     * This function changes the map layers based on whether the user is connected online or not.
     * @param {Boolean} connected the status of whether the user is connected online.
     */
    function setMapLayersOnConnection(connected = true) {
        const previousStatus = appConnected.value;
        appConnected.value = connected;

        if(!previousStatus && connected) {
            setTimeout(() => { setMapLayers(1); }, 3000);
        } else {
            setMapLayers(connected ? ((mapLayersIndex.value == 3 && !previousStatus) ? 1 : mapLayersIndex.value) : 3);
        }
    }

    /**
     * This helper function adds the imagery layer to the map.
     * @param {Cesium.ImageryLayer} layer The Cesium Imagery Layer.
     */
    function setImageryLayer(layer) {
        cesiumGlobe.value.viewer.imageryLayers.add(layer);
    }

    /**
     * This function sets the online store's event listeners.
     */
    function setOnlineInterval() {
        if(appConnectedInterval != null) { return; }
        setMapLayersOnConnection(navigator.onLine);

        appConnectedInterval = setInterval(async() => {
            try {
                const res = await fetch(ONLINE_TEST_URL, { method: "HEAD", cache: "no-store" });
                setMapLayersOnConnection(res.ok);
            } catch(e) {
                setMapLayersOnConnection(false);
            }
        }, 5000);
    }

    return { cesiumGlobe, mapLayersIndex, showGoogleTileset,
        mountGlobeStore, unmountGlobeStore, getNavBtnRoute, setMapLayers, setGoogleTilesetStatus
    }
});