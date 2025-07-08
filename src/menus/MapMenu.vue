<template>
<div class="globeApp-menu">
    <MenuHeader :title="'Map Settings'" />
    <h2 class="map-menu-header layers"> Map Layers </h2>

    <div class="map-sidebar-layers-container">
        <button :class="getLayerBtnClasses(0)" @click="globeStore.setMapLayers(0)">
            <img :src="AerialBing" />
            <p> Bing Maps (Aerial) </p>
        </button>
        <button :class="getLayerBtnClasses(1)" @click="globeStore.setMapLayers(1)">
            <img :src="AerialLabelsBing" />
            <p> Bing Maps (Labels) </p>
        </button>
        <button :class="getLayerBtnClasses(2)" @click="globeStore.setMapLayers(2)">
            <img :src="RoadsBing" />
            <p> Bing Maps (Roads) </p>
        </button>
    </div>

    <h2 class="map-menu-header"> 3D Tiles </h2>
    <div class="map-menu-opt">
        <label class="map-menu-opt-checkbox">
            <span> Google 3D Tiles </span>
            <input type="checkbox" v-model="globeStore.showGoogleTileset" @change="globeStore.setGoogleTilesetStatus()" />
        </label>
    </div>
</div>
</template>

<script setup>
import AerialBing from '@/assets/bing-aerial-maps.png';
import AerialLabelsBing from '@/assets/bing-aerial-labels-maps.png';
import RoadsBing from '@/assets/bing-road-maps.png';

const globeStore = useGlobeStore();

/**
 * This function returns the classes of "layer" button.
 * @param {Number} index The index of the button.
 */
function getLayerBtnClasses(index = 0) {;
    return ['map-sidebar-layerBtn', ((index == globeStore.mapLayersIndex) ? 'selected' : '')]
}
</script>

<style scoped>
.map-menu-header {
    width: fit-content;
    margin-top: 30px;
    margin-bottom: 10px;
    margin-left: 20px;
    padding: 0;
    font-family: 'Lexend', sans-serif;
    font-size: 25px;
    line-height: 32px;
    color: var(--blue-cobalt);
    font-weight: bold;
    border-bottom: 1px dotted;
}
.map-menu-header.layers {
    margin-top: 10px;
    margin-left: 25px;
}

.map-sidebar-layers-container {
    width: calc(100% - 40px);
    height: 120px;
    margin-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    gap: 20px;
}

.map-sidebar-layerBtn {
    height: 110px;
    width: 75px;
    border: 2px solid var(--blue-cobalt);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--blue-one);
    transition: var(--default-transition);
}
.map-sidebar-layerBtn:hover {
    border-color: black;
}

.map-sidebar-layerBtn p {
    margin: 0px 3px;
    padding: 0px;
    text-align: center;
    color: black;
    font-size: 12px;
    line-height: 15px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    transition: var(--default-transition);
}
.map-sidebar-layerBtn img {
    width: 45px;
    height: 45px;
    margin-bottom: 6px;
    user-select: none;
}
.map-sidebar-layerBtn svg {
    width: 45px;
    height: 45px;
    margin-bottom: 6px;
    user-select: none;
}

.map-sidebar-layerBtn.selected {
    border-color: var(--globe-green-opaque);
    box-shadow: 0px 0px 10px var(--globe-green-opaque);
}
.map-sidebar-layerBtn.selected p {
    color: var(--globe-green-opaque);
}

.map-menu-opt {
    height: fit-content;
    margin-bottom: 4px;
    justify-content: flex-start;
    display: flex;
    width: calc(100% - 40px);
    margin-left: 20px;
    align-items: center;
}

.map-menu-opt-checkbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--blue-cobalt);
    font-size: 15px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    cursor: pointer;
    user-select: none;
}
.map-menu-opt-checkbox svg {
    width: 16px;
    user-select: none;
    margin-right: 5px;
}
.map-menu-opt-checkbox input {
    position: relative;
    top: 1px;
    left: 1px;
}
</style>