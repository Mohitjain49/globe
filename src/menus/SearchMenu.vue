<template>
<div class="globeApp-menu">
    <div class="globeApp-menu-top">
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-xmark-circle" />
        </div>
        <div class="globeApp-menu-header"> Search </div>
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-magnifying-glass" style="cursor: default;" />
        </div>
    </div>

    <div class="globeApp-menu-body">
        <div :id="CESIUM_GEOCODER_ID"></div>
    </div>
</div>
</template>

<script setup>
import { CESIUM_GEOCODER_ID } from "../store/GlobeStore.js";
import "../styles/menu.css";
</script>