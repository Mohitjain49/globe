<template>
<RouterView :key="$route.path" />
</template>

<script setup>
import "./styles/mainstyles.css";
import 'cesium/Build/Cesium/Widgets/widgets.css';

import { usePWAStore } from "./store/ExtraStores.js";
import { onMounted } from "vue";

const pwaStore = usePWAStore();
onMounted(() => { pwaStore.mountInstallHandler(); });
</script>