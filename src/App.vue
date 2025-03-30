<script setup>
import GlobeAppBar from './components/GlobeAppBar.vue';

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

<RouterView v-slot="{ Component, route }">
    <Transition name="globeApp-menu-transition" appear fade>
        <component :is="Component" :key="route.path" />
    </Transition>
</RouterView>
</template>