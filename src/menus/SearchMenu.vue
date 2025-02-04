<template>
<div class="globeApp-menu">
    <div class="globeApp-menu-top">
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-xmark-circle"
                @click="globeStore.setMenuOpen(-1)"
                title="Click To Close Search Menu"
            />
        </div>
        <div class="globeApp-menu-header"> Search </div>
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-magnifying-glass" style="cursor: default;" />
        </div>
    </div>

    <div class="globeApp-menu-body">
        <div :id="CESIUM_GEOCODER_ID"></div>
    </div>
</div>
</template>

<script setup>
import "../styles/menu.css";
import { useGlobeStore, CESIUM_GEOCODER_ID } from "../store/GlobeStore.js";
import { onMounted, onBeforeUnmount } from "vue";

const globeStore = useGlobeStore();

onMounted(() => {
    if(globeStore.globePresent) { globeStore.cesiumGlobe.setGeocoder(true); }
    document.getElementById(CESIUM_GEOCODER_ID).addEventListener(
        "click", (event) => { closeMenuOnNavigation(event); }
    );
});
onBeforeUnmount(() => {
    globeStore.cesiumGlobe.setGeocoder(false);
    document.getElementById(CESIUM_GEOCODER_ID).removeEventListener(
        "click", (event) => { closeMenuOnNavigation(event); }
    );
});

/**
 * This function closes the menu whenever the user navigates to a point.
 * Only works with a screen width of 1000 at most.
 */
function closeMenuOnNavigation(event) {
    if(window.innerWidth > 1000) {
        return;
    } else if(event.target.tagName === 'LI') {
        globeStore.setMenuOpen(-1);
    }
}

/**
 * This returns a boolean for whether or not the user pressed enter to use the geocoder.
 * NOTE: THIS IS CURRENTLY NOT BEING USED.
 */
function getEnterNavigationBoolean(event) {
    return (event.key === "Enter" && event.target.classList.value.includes("cesium-geocoder-input"))
}
</script>