<template>
<div class="globeApp-menu">
    <MenuHeader :title="'Options'" />
    <div class="globeApp-menu-body">
        <RouterLink to="/" class="globeApp-menu-button">
            <font-awesome-icon icon="fa-magnifying-glass" />
            <span> Search Locations </span>
        </RouterLink>
        <RouterLink to="/career" class="globeApp-menu-button">
            <font-awesome-icon icon="fa-laptop-code" />
            <span> My Career </span>
        </RouterLink>
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

        <a v-for="tab in PERSONAL_WEBSITE_TABS" :href="tab.link" class="globeApp-menu-button gold">
            <font-awesome-icon :icon="tab.icon" />
            <span> {{ tab.name }} </span>
        </a>
        <div class="globeApp-menu-line"></div>

        <a href="mailto:mohitkjain49@gmail.com" class="globeApp-menu-button">
            <font-awesome-icon icon="fa-envelope" />
            <span> Email Me </span>
        </a>
        <a href="https://github.com/Mohitjain49/" target="mohit-github-tab"
            class="globeApp-menu-button"
            @mouseenter="hoverGithub = true"
            @mouseleave="hoverGithub = false">
            
            <img :src="(hoverGithub ? black_github : blue_github)" />
            <span> My GitHub Profile </span>
        </a>
        <a href="https://www.linkedin.com/in/mohitjain49/" target="mohit-linkedin-tab"
            class="globeApp-menu-button"
            @mouseenter="hoverLinkedin = true"
            @mouseleave="hoverLinkedin = false">

            <img :src="(hoverLinkedin ? black_linkedin : blue_linkedin)" />
            <span> My LinkedIn Profile </span>
        </a>
    </div>
</div>
</template>

<script setup>
import blue_github from "../assets/brands/blue-cobalt/fa_github_icon.svg";
import black_github from "../assets/brands/black/fa_github_icon.svg";
import blue_linkedin from "../assets/brands/blue-cobalt/fa_linkedin_icon.svg";
import black_linkedin from "../assets/brands/black/fa_linkedin_icon.svg";

const screenStore = useScreenStore();
const hoverGithub = ref(false);
const hoverLinkedin = ref(false);

const PERSONAL_WEBSITE_TABS = ref([
    { name: "View My Main Website", icon: "fa-house", link: MAIN_WEBSITE },
    { name: "Contact Me", icon: "fa-paper-plane", link: (MAIN_WEBSITE + 'contact/') },
    { name: "View My Resume", icon: "fa-file-lines", link: (MAIN_WEBSITE + 'resume/') }
]);
</script>