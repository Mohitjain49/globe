<template>
<div class="globeApp-menu">
    <div class="globeApp-menu-top">
        <div class="globeApp-menu-header"> Search </div>
        <div class="globeApp-menu-top-iconContainer" @click="globeStore.setMenuOpen(-1)">
            <font-awesome-icon icon="fa-xmark" title="Click To Close Search Menu" />
        </div>
    </div>

    <div class="globeApp-menu-body">
        <div :id="CESIUM_GEOCODER_ID" @click="closeMenuOnNavigation"></div>
    </div>
</div>
</template>

<script setup>
import "../styles/menu.css";
import { useGlobeStore, CESIUM_GEOCODER_ID } from "../store/GlobeStore.js";
import { onMounted, onBeforeUnmount } from "vue";

const globeStore = useGlobeStore();

onMounted(() => { if(globeStore.globePresent) { globeStore.cesiumGlobe.setGeocoder(true); } });
onBeforeUnmount(() => { globeStore.cesiumGlobe.setGeocoder(false); });

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