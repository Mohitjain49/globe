<script setup>
import GlobeAppBar from './components/GlobeAppBar.vue';
import SearchMenu from './menus/SearchMenu.vue';
import SettingsMenu from './menus/SettingsMenu.vue';
// import TimeMenu from './menus/TimeMenu.vue'; ** TO BE ADDED AT A LATER DATE.
import IncompleteMenu from './menus/IncompleteMenu.vue';

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

<!-- TO BE ADDED AT A LATER DATE.
<Transition name="globeApp-menu-transition" appear fade>
    <TimeMenu v-if="globeStore.menuOpen == 2" />
</Transition>
-->

<Transition name="globeApp-menu-transition" appear fade>
    <IncompleteMenu v-if="(globeStore.menuOpen > 1)" />
</Transition>
</template>