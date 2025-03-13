<template>
<div class="globeApp-menu">
    <div class="globeApp-menu-top">
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-xmark-circle"
                @click="globeStore.setMenuOpen(-1)"
                title="Click To Close Menu"
            />
        </div>
        <div class="globeApp-menu-header"> {{ INCOMPLETE_MENUS[globeStore.menuOpen].name }} </div>
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon :icon="INCOMPLETE_MENUS[globeStore.menuOpen].icon" style="cursor: default;" />
        </div>
    </div>

    <div class="globeApp-menu-body center-flex-display">
        <div class="globeApp-menu-incomplete"> {{ MESSAGE }} </div>
    </div>
</div>
</template>

<script setup>
import "../styles/menu.css";
import { useGlobeStore } from "../store/GlobeStore.js";
const globeStore = useGlobeStore();

const INCOMPLETE_MENUS = [
    { name: "Search", icon: "fa-magnifying-glass" },
    { name: "Options", icon: "fa-ellipsis-vertical" },
    { name: "My Hobbies", icon: "fa-gamepad" },
    { name: "My Career", icon: "fa-laptop-code" },
];

const MESSAGE = "This page is currently in development.";
</script>