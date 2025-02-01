<script setup>
import GlobeAppBar from './components/GlobeAppBar.vue';
import SearchMenu from './menus/SearchMenu.vue';
import IncompleteMenu from './menus/IncompleteMenu.vue';

import { useGlobeStore, CESIUM_GLOBE_ID } from './store/GlobeStore.js';
import { onMounted, onUnmounted } from 'vue';

import './styles/globestyle.css';

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
<div :id="CESIUM_GLOBE_ID"></div>
<GlobeAppBar />

<Transition name="globeApp-menu-transition" appear fade>
    <SearchMenu v-if="globeStore.menuOpen == 0" />
</Transition>
<Transition name="globeApp-menu-transition" appear fade>
    <IncompleteMenu v-if="(globeStore.menuOpen > 0 && globeStore.menuOpen < 3)" />
</Transition>
</template>