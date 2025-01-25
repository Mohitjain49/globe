<template>
<div class="globe-appBar">
    <div id="globe-appBar-left" class="globe-appBar-side" style="justify-content: left;">
        <a :href="MAIN_WEBSITE" class="globe-appBar-icon" :title="HOME_ICON_TITLE">
            <font-awesome-icon icon="fa-house" />
        </a>
        <RouterLink to="/resume" class="globe-appBar-icon" :title="RESUME_ICON_TITLE">
            <font-awesome-icon icon="fa-file-lines" />
        </RouterLink>
    </div>
    <div class="globe-appBar-center center-flex-display">
        <template v-if="checkMobileMode()">
            <a :href="MAIN_WEBSITE" class="globe-appBar-icon" :title="HOME_ICON_TITLE">
                <font-awesome-icon icon="fa-house" />
            </a>
            <RouterLink to="/resume" class="globe-appBar-icon" :title="RESUME_ICON_TITLE">
                <font-awesome-icon icon="fa-file-lines" />
            </RouterLink>
        </template>
        
        <div :class="getMainOptClass()" :title="SEARCH_ICON_TITLE">
            <font-awesome-icon icon="fa-map-location-dot" />
            <span>Search</span>
        </div>
        <div :class="getMainOptClass()" :title="INTERESTS_ICON_TITLE">
            <font-awesome-icon icon="fa-display" />
            <span>My Hobbies</span>
        </div>
        <div :class="getMainOptClass()" :title="WORK_ICON_TITLE">
            <font-awesome-icon icon="fa-laptop-code" />
            <span>My Career</span>
        </div>
    </div>
    <div class="globe-appBar-side" style="justify-content: right;">
        <div class="globe-appBar-icon" :title="SETTINGS_ICON_TITLE">
            <font-awesome-icon icon="fa-gear" />
        </div>
        <div :class="['globe-appBar-icon', timeIconClass]" @click="toggleTimeClass()"
            :title="(getTimeClassBoolean() ? 'Click To Hide Time' : 'Click To Show Time')">

            <font-awesome-icon v-if="!getTimeClassBoolean()" icon="fa-clock" />
            <template v-if="getTimeClassBoolean()">
                <span> {{ dateStore.dateStrings.timeSection }} </span>
                <span> {{ dateStore.dateStrings.daySection }} </span>
            </template>
        </div>
        <div v-if="!checkMobileMode()" class="globe-appBar-icon"
            :title="screenStore.elementTitle"
            @click="screenStore.setFullScreen()">
            
            <font-awesome-icon :icon="screenStore.faIcon" />
        </div>
    </div>
</div>
</template>

<script setup>
import { MAIN_WEBSITE } from '../routes.js';

import { ref } from 'vue';
import { usePageViewStore, useDateStore, useScreenStore } from '../store/ExtraStores.js';

const pageViewStore = usePageViewStore();
const dateStore = useDateStore();
const screenStore = useScreenStore();
const timeIconClass = ref('globe-appBar-time');

/**
 * This function toggles whether the time section shows the time or just a clock icon.
 */
function toggleTimeClass() {
    timeIconClass.value = (getTimeClassBoolean() ? '' : 'globe-appBar-time');
}

/**
 * This returns true if the time is displayed, false is its just a time icon.
 */
function getTimeClassBoolean() {
    return (timeIconClass.value === 'globe-appBar-time');
}

/**
 * This returns the classes for the main options of the app bar.
 */
function getMainOptClass() {
    return ['globe-appBar-icon', (checkMobileMode() ? '' : 'globe-appBar-mainOpt')];
}

/**
 * This returns whether or not the page view is in mobile mode.
 */
function checkMobileMode() {
    return (pageViewStore.pageView == 1);
}

const HOME_ICON_TITLE = ("Back To Main Website (" + MAIN_WEBSITE + ")");
const RESUME_ICON_TITLE = "View My Resume";
const SEARCH_ICON_TITLE = "Search Locations";
const INTERESTS_ICON_TITLE = "My Hobbies";
const WORK_ICON_TITLE = "My Career";
const SETTINGS_ICON_TITLE = "Settings";
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
    width: 165px; /* This is the width of the "longer" side. */
    height: 100%;
    display: flex;
    align-items: center;
}

.globe-appBar-center {
    width: fit-content;
    height: 100%;
}

.globe-appBar-icon {
    user-select: none;
    cursor: pointer;
    width: 45px;
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
    border: 2px solid var(--blue-five);
    border-radius: 7px;
    color:var(--blue-five);
    font-size: 18px;
}
.globe-appBar-mainOpt span {
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    margin-left: 5px;
}

.globe-appBar-time {
    width: 85px;
    flex-direction: column;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color:var(--blue-five);
    font-size: 14px;
}
.globe-appBar-time span {
    display: block !important;
}

@media (max-width: 850px) {
    #globe-appBar-left {
        display: none;
    }
    .globe-appBar-icon span {
        display: none;
    }
}
</style>