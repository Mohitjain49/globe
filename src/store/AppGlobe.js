import * as Cesium from 'cesium';

export class AppGlobe {
    /**
     * This class initializes the Cesium Map on any page that imports this class.
     * It is meant to be a universal class so it can be used in many projects.
     * @param {Cesium.Cartesian3} lastCameraPos The last Camera Position of the app.
     */
    constructor(lastCameraPos = this.createPosition(-84.40082186713498, 33.75542871465707, 1500000)) {
        this.viewer = new Cesium.Viewer(CESIUM_GLOBE_ID, {
            baseLayerPicker: false,
            timeline: false,
            geocoder: false,
            navigationHelpButton: false,
            fullscreenButton: false,
            sceneModePicker: false,
            homeButton: false,
            animation: false,
            baseLayer: Cesium.ImageryLayer.fromWorldImagery({
                style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
            })
        })

        this.setGeocoder(false);
        this.setCamera(lastCameraPos);
    }

    /**
     * This sets the status of the geocoder.
     * @param {String} geocoderDivId This is the id of where the Geocoder will be stored.
     * @param {Boolean} newStatus The new status the geocoder should be set to.
     */
    setGeocoder(newStatus = true) {
        if(newStatus && this.geocoder == null) {
            this.geocoder = new Cesium.Geocoder({
                flightDuration: 3,
                scene: this.viewer.scene,
                container: CESIUM_GEOCODER_ID
            });
            this.setGeocoderPlaceholder();
        } else if(!newStatus && this.geocoder != null) {
            this.geocoder.destroy();
            this.geocoder = null;
        }
    }

    /**
     * This sets the placeholder for the geocoder.
     */
    setGeocoderPlaceholder() {
        const GEOCODER_PLACEHOLDER = "Search Locations...";
        document.getElementsByClassName("cesium-geocoder-input").item(0).placeholder = GEOCODER_PLACEHOLDER;
    }

    /**
     * This destroys the map.
     */
    destroyMap() {
        this.viewer.destroy();
        if(this.geocoder != null) { this.geocoder.destroy(); }
        
        this.viewer = null;
        this.geocoder = null;
    }

    /**
     * This makes a position with three parameters.
     * @param {Number} lon The longitude of the position.
     * @param {Number} lat The latitude of the position.
     * @param {Number} alt The altitude above the position.
     */
    createPosition(lon, lat, alt = 0) {
        return Cesium.Cartesian3.fromDegrees(lon, lat, alt);
    }

    /**
     * This sets the camera of the map at a specific position.
     * @param {Cesium.Cartesian3} Cartesian3Position The position to zoom to.
     */
    setCamera(Cartesian3Position) {
        this.viewer.camera.setView({ destination: Cartesian3Position });
    }

    /**
     * This sets the status of whether or not the user can control how the map looks or not.
     * @param {Boolean} newStatus the boolean that determines its status.
     */
    setCameraController(newStatus) {
        this.viewer.scene.screenSpaceCameraController.enableInputs = newStatus;
    }

    /**
     * This returns a Cartesian 3 position for where the camera is.
     */
    returnCameraPos() {
        return this.viewer.camera.position;
    }

    /**
     * This sets the cursor that is seen on the map.
     * @param {String} cssCursor The CSS value to set the cursor to.
     */
    setViewerCursor(cssCursor) {
        this.viewer.canvas.style.cursor = cssCursor;
    }

    /**
     * This cancels a flight ongoing with the viewer camera.
     */
    cancelCameraFlight() {
        this.viewer.camera.cancelFlight();
    }
}