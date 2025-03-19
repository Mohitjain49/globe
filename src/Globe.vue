<script setup>
import GlobeAppBar from './components/GlobeAppBar.vue';
import SearchMenu from './menus/SearchMenu.vue';
import SettingsMenu from './menus/SettingsMenu.vue';
import CareerMenu from './menus/CareerMenu.vue';

import { useGlobeStore, CESIUM_GLOBE_ID } from './store/GlobeStore.js';
import { onMounted, onUnmounted } from 'vue';
import './styles/globestyle.css';

const globeStore = useGlobeStore();
onMounted(() => { globeStore.mountGlobeStore(); });
onUnmounted(() => { globeStore.unmountGlobeStore(); });
</script>

<template>
<div :id="CESIUM_GLOBE_ID"></div>
<GlobeAppBar />

<Transition name="globeApp-menu-transition" appear fade>
    <SearchMenu v-if="globeStore.menuOpen == 0" />
</Transition>
<Transition name="globeApp-menu-transition" appear fade>
    <SettingsMenu v-if="globeStore.menuOpen == 1" />
</Transition>
<Transition name="globeApp-menu-transition" appear fade>
    <CareerMenu v-if="globeStore.menuOpen == 2" />
</Transition>
</template>