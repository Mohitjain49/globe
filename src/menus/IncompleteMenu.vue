<template>
<div class="globeApp-menu">
    <MenuHeader :title="INCOMPLETE_MENUS[globeStore.menuOpen].name" />
    <div class="globeApp-menu-body center-flex-display">
        <div class="globeApp-menu-incomplete">
            This page is currently in development.
        </div>
    </div>
</div>
</template>

<script setup>
import "../styles/menu.css";
import { useGlobeStore } from "../store/GlobeStore.js";
import MenuHeader from "../components/MenuHeader.vue";

const globeStore = useGlobeStore();
const INCOMPLETE_MENUS = [
    { name: "Search", icon: "fa-magnifying-glass" },
    { name: "Options", icon: "fa-ellipsis-vertical" },
    { name: "My Hobbies", icon: "fa-gamepad" },
    { name: "My Career", icon: "fa-laptop-code" },
];
</script>