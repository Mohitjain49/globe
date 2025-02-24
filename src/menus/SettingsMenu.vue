<template>
<div class="globeApp-menu">
    <div class="globeApp-menu-top">
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-xmark-circle"
                @click="globeStore.setMenuOpen(-1)"
                title="Click To Close Settings Menu"
            />
        </div>
        <div class="globeApp-menu-header"> Options </div>
        <div class="globeApp-menu-top-iconContainer">
            <font-awesome-icon icon="fa-ellipsis-vertical" style="cursor: default;" />
        </div>
    </div>

    <div class="globeApp-menu-body">
        <div v-for="action in ACTIONS_ONE" class="globeApp-menu-button" @click="action.func()">
            <font-awesome-icon :icon="action.icon" />
            <span> {{ action.name }} </span>
        </div>
        <div class="globeApp-menu-line"></div>

        <div class="globeApp-menu-button" @click="screenStore.setFullScreen()">
            <font-awesome-icon :icon="screenStore.faIcon" />
            <span> {{ screenStore.elementTitle }} </span>
        </div>
        <div class="globeApp-menu-button" @click="reloadPage()">
            <font-awesome-icon icon="fa-rotate-right" />
            <span> Reload Page </span>
        </div>
        <div class="globeApp-menu-line"></div>

        <div v-for="action in ACTIONS_THREE" class="globeApp-menu-button" @click="action.func()">
            <font-awesome-icon :icon="action.icon" />
            <span> {{ action.name }} </span>
        </div>
        <div class="globeApp-menu-line"></div>

        <div class="globeApp-menu-button" @click="openEmail()">
            <font-awesome-icon icon="fa-envelope" />
            <span> Email Me </span>
        </div>
        <div class="globeApp-menu-button" @click="openGithubAccount()"
            @mouseenter="hoverGithub = true"
            @mouseleave="hoverGithub = false">
            
            <img :src="(hoverGithub ? black_github : blue_github)" />
            <span> My GitHub Profile </span>
        </div>
        <div class="globeApp-menu-button" @click="openLinkedinAccount()"
            @mouseenter="hoverLinkedin = true"
            @mouseleave="hoverLinkedin = false">

            <img :src="(hoverLinkedin ? black_linkedin : blue_linkedin)" />
            <span> My LinkedIn Profile </span>
        </div>
    </div>
</div>
</template>

<script setup>
import "../styles/menu.css";
import blue_github from "../assets/brands/blue-cobalt/fa_github_icon.svg";
import black_github from "../assets/brands/black/fa_github_icon.svg";
import blue_linkedin from "../assets/brands/blue-cobalt/fa_linkedin_icon.svg";
import black_linkedin from "../assets/brands/black/fa_linkedin_icon.svg";

import { useScreenStore, usePWAStore, reloadPage, goToMainWebsite } from "../store/ExtraStores.js";
import { useGlobeStore } from "../store/GlobeStore.js";

import { useRouter } from "vue-router";
import { ref } from "vue";

const screenStore = useScreenStore();
const pwaStore = usePWAStore();
const globeStore = useGlobeStore();
const router = useRouter();

const hoverGithub = ref(false);
const hoverLinkedin = ref(false);

/**
 * This function opens my email.
 */
function openEmail() {
    window.open("mailto:mohitkjainwork@gmail.com", "mohit-email-tab");
}

/**
 * This function opens my GitHub Account.
 */
function openGithubAccount() {
    window.open("https://github.com/Mohitjain49/", "mohit-github-tab");
}

/**
 * This function opens my Linked Account.
 */
function openLinkedinAccount() {
    window.open("https://www.linkedin.com/in/mohitjain49/", "mohit-linkedin-tab");
}

const ACTIONS_ONE = ref([
    { name: "Search Locations", icon: "fa-magnifying-glass", func: () => { globeStore.setMenuOpen(0); } },
    { name: "View Time", icon: "fa-clock", func: () => { globeStore.setMenuOpen(2); } },
    { name: "My Hobbies", icon: "fa-display", func: () => { globeStore.setMenuOpen(3); } },
    { name: "My Career", icon: "fa-laptop-code", func: () => { globeStore.setMenuOpen(4); } }
]);
const ACTIONS_THREE = ref([
    { name: "View My Resume", icon: "fa-file-lines", func: () => { router.push("/resume"); } },
    { name: "View My Main Website", icon: "fa-house", func: () => { goToMainWebsite(); } },
]);
</script>