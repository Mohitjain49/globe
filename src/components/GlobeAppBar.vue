<template>
<div class="globe-appBar">
    <div class="globe-appBar-top center-flex-display">
        <div class="globe-appBar-icon" :title="SEARCH_ICON_TITLE" @click="globeStore.setMenuOpen(0)">
            <font-awesome-icon icon="fa-magnifying-glass" />
            <span>Search</span>
        </div>
        <div class="globe-appBar-icon" :title="INTERESTS_ICON_TITLE" @click="globeStore.setMenuOpen(2)">
            <font-awesome-icon icon="fa-gamepad" />
            <span>Hobbies</span>
        </div>
        <div class="globe-appBar-icon" :title="WORK_ICON_TITLE" @click="globeStore.setMenuOpen(3)">
            <font-awesome-icon icon="fa-laptop-code" />
            <span>Career</span>
        </div>
    </div>
    <div class="globe-appBar-bottom" style="justify-content: flex-end;">
        <div class="globe-appBar-icon" :title="OPTIONS_ICON_TITLE" @click="globeStore.setMenuOpen(1)">
            <font-awesome-icon icon="fa-ellipsis-vertical" />
            <span>Options</span>
        </div>
        <div class="globe-appBar-icon screen" :title="screenStore.elementTitle" @click="screenStore.setFullScreen()">
            <font-awesome-icon :icon="screenStore.faIcon" />
        </div>
    </div>
</div>
</template>

<script setup>
import { useGlobeStore } from '../store/GlobeStore.js';
import { useScreenStore } from '../store/ExtraStores.js';

const globeStore = useGlobeStore();
const screenStore = useScreenStore();

const SEARCH_ICON_TITLE = "Search Locations";
const INTERESTS_ICON_TITLE = "My Hobbies";
const WORK_ICON_TITLE = "My Career";
const OPTIONS_ICON_TITLE = "Options";
</script>

<style scoped>
.globe-appBar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 55px;
    background: var(--blue-zero);
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

.globe-appBar-bottom {
    height: fit-content;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.globe-appBar-top {
    height: fit-content;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
}

.globe-appBar-icon {
    user-select: none;
    cursor: pointer;
    height: 51px;
    width: calc(100% - 4px);
    border: var(--empty-border);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--blue-cobalt);
    font-size: 24px;
    transition: var(--default-transition);
}
.globe-appBar-icon:hover {
    background-color: var(--blue-three);
    color: black;
    border-color: black;
}

.globe-appBar-icon span {
    margin-top: 2px;
    font-size: 11px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}
.globe-appBar-icon.screen {
    font-size: 28px;
}
</style>