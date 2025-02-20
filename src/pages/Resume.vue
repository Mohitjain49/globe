<template>
<div class="resume-sidebar">
    <RouterLink to="/" class="resume-sidebar-icon" :title="GLOBE_ICON_TITLE">
        <font-awesome-icon icon="fa-arrow-left" style="font-size: 25px;" />
        <span>Globe</span>
    </RouterLink>
    <div>
        <a :href="CONTACT_LINK" class="resume-sidebar-icon" :title="CONTACT_ICON_TITLE">
            <font-awesome-icon icon="fa-paper-plane" />
            <span>Contact</span>
        </a>
        <a :href="MAIN_WEBSITE" class="resume-sidebar-icon" :title="HOME_ICON_TITLE">
            <font-awesome-icon icon="fa-house" />
            <span>Home</span>
        </a>
    </div>
</div>

<div id="resume-container" @click="() => {webData.setNavBarDropdown(-1)}">
    <iframe :src="resume" height="100%" width="100%"></iframe>
</div>
</template>

<script setup>
import resume from "/Mohit_Jain_Resume.pdf";
import { MAIN_WEBSITE } from "../routes.js";
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
    document.title = "Mohit Jain | My Resume";
    document.body.style.overflowY = "hidden";
});
onUnmounted(() => {
    document.body.style.overflowY = "";
});

const CONTACT_LINK = (MAIN_WEBSITE + "contact");
const GLOBE_ICON_TITLE = "Go To Globe";
const HOME_ICON_TITLE = "Back To Main Website";
const CONTACT_ICON_TITLE = "Contact Me!"
</script>

<style scoped>
#resume-container {
    position: absolute;
    top: 0px;
    left: 50px;
    height: 100%;
    width: calc(100% - 50px);
    min-width: 300px;
}
.resume-sidebar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 50px;
    height: 100%;
    background: var(--blue-one);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

/**
 * These styles were mostly copied from the Globe App Bar.
 */

.resume-sidebar-icon {
    user-select: none;
    cursor: pointer;
    width: 50px;
    height: 52px;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--blue-five);
    transition: var(--default-transition);
}
.resume-sidebar-icon:hover {
    background-color: var(--blue-three);
    color: black;
}

.resume-sidebar-icon svg {
    font-size: 22px;
}
.resume-sidebar-icon span {
    margin-top: 2px;
    font-size: 10px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
}
</style>