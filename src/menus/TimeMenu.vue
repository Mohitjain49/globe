<template>
<div class="globeApp-menu">
    <div class="globeApp-menu-top">
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-xmark-circle"
                @click="globeStore.setMenuOpen(-1)"
                title="Click To Close Time Menu"
            />
        </div>
        <div class="globeApp-menu-header"> Time </div>
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-clock" style="cursor: default;" />
        </div>
    </div>

    <div class="globeApp-menu-body">
        
    </div>
</div>
</template>

<script setup>
import "../styles/menu.css";
import { useGlobeStore } from "../store/GlobeStore.js";
const globeStore = useGlobeStore();
</script>