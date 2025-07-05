<script setup>
import './styles/globestyle.css';
import './styles/menu.css';
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