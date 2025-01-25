<template>
<div class="globe-appBar">
    <div class="globe-appBar-side" style="justify-content: left;">
        <a :href="MAIN_WEBSITE" class="globe-appBar-icon" :title="HOME_ICON_TITLE">
            <font-awesome-icon icon="fa-house" />
        </a>
    </div>
    <div class="globe-appBar-center center-flex-display">
        <div class="globe-appBar-icon globe-appBar-mainOpt" :title="SEARCH_ICON_TITLE">
            <font-awesome-icon icon="fa-map-location-dot" />
            <span>Search</span>
        </div>
        <div class="globe-appBar-icon globe-appBar-mainOpt" :title="INTERESTS_ICON_TITLE">
            <font-awesome-icon icon="fa-display" />
            <span>My Hobbies</span>
        </div>
        <div class="globe-appBar-icon globe-appBar-mainOpt" :title="WORK_ICON_TITLE">
            <font-awesome-icon icon="fa-laptop-code" />
            <span>My Career</span>
        </div>
    </div>
    <div class="globe-appBar-side" style="justify-content: right;">
        <div class="globe-appBar-icon" :title="HOME_ICON_TITLE">
            <font-awesome-icon icon="fa-expand" />
        </div>
    </div>
</div>
</template>

<script setup>
import { MAIN_WEBSITE } from '@/routes.js';
const HOME_ICON_TITLE = ("Back To Main Website (" + MAIN_WEBSITE + ")");
const SEARCH_ICON_TITLE = "Search Locations";
const INTERESTS_ICON_TITLE = "My Hobbies";
const WORK_ICON_TITLE = "My Career";
</script>

<style scoped>
.globe-appBar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(to top, var(--blue-one) 0%, var(--blue-two) 100%);
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.globe-appBar-side {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
}

.globe-appBar-center {
    width: fit-content;
    height: 100%;
}

.globe-appBar-icon {
    cursor: pointer;
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--blue-five);
    font-size: 24px;
    transition: var(--default-transition);
}
.globe-appBar-icon:hover {
    background-color: var(--blue-three);
    color: black;
}

.globe-appBar-mainOpt {
    height: fit-content;
    width: fit-content;
    padding: 4px 15px;
    margin: 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--blue-five);
    border-radius: 7px;
    color:var(--blue-five);
    font-size: 18px;
}
.globe-appBar-mainOpt span {
    font-family: 'Lexend', sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin-left: 5px;
}
</style>