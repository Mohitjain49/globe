<script setup>
import GlobeAppBar from './components/GlobeAppBar.vue';
// import GlobeBar from './components/GlobeBar.vue';
import GlobePoints from './components/GlobePoints.vue';

import GlobeRCM from './components/GlobeRCM.vue';
import GlobeHover from './components/GlobeHover.vue';

import { useGlobeStore, CESIUM_GLOBE_ID, CESIUM_GEOCODER_ID } from './store/GlobeStore.js';
import { onMounted, onUnmounted } from 'vue';

import './styles/globestyle.css';
import "./styles/globemenus.css";

const globeStore = useGlobeStore();
onMounted(() => {
    document.title = "Mohit Jain | My Globe";
    globeStore.mountGlobeStore();
})
onUnmounted(() => {
    globeStore.unmountGlobeStore();
})
</script>

<template>
<div :id="CESIUM_GLOBE_ID">
    <div :id="CESIUM_GEOCODER_ID" :style="globeStore.geocoderDisplay"
        @click="globeStore.closeRCM"
        @contextmenu="globeStore.closeRCM">
    </div>
</div>

<GlobeAppBar />
<Transition name="globeMenuTransition" appear fade>
    <GlobePoints v-if="globeStore.featureIndex == 2" />
</Transition>

<GlobeRCM v-if="globeStore.globeRCMHandler.rcmOpen == 0" />
<GlobeHover v-if="globeStore.hoverPointHandler.title !== ''" />
</template>