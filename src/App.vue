<template>
<RouterView :key="$route.path" />
</template>

<script setup>
import "./styles/mainstyles.css";
import 'cesium/Build/Cesium/Widgets/widgets.css';
</script>