<template>
<div class="globeApp-menu">
    <MenuHeader :title="'Search'" />
    <div class="globeApp-menu-body">
        <div :id="CESIUM_GEOCODER_ID" @click="closeMenuOnNavigation"></div>
    </div>
</div>
</template>

<script setup>
const router = useRouter();
const globeStore = useGlobeStore();

onMounted(() => { globeStore.cesiumGlobe.setGeocoder(true); });
onBeforeUnmount(() => { globeStore.cesiumGlobe.setGeocoder(false); });

/**
 * This function closes the menu whenever the user navigates to a point.
 * Only works with a screen width of 1000 at most.
 */
function closeMenuOnNavigation(event) {
    if(window.innerWidth > 1000 || event.target.tagName !== 'LI') { return; }
    router.push('/blank');
}

/**
 * This returns a boolean for whether or not the user pressed enter to use the geocoder.
 * NOTE: THIS IS CURRENTLY NOT BEING USED.
 */
function getEnterNavigationBoolean(event) {
    return (event.key === "Enter" && event.target.classList.value.includes("cesium-geocoder-input"))
}
</script>