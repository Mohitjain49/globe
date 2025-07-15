<template>
<div class="globeApp-menu">
    <MenuHeader :title="'About This App'" />
    <div id="about-menu" class="globeApp-menu-body">
        <h3> {{ PROJECT_VERSION }} </h3>
        <h3> {{ RELEASE_DATE }} </h3>
        <h3 v-html="COPYRIGHT_TEXT"></h3>

        <p>
            I use this Cesium-based user interface as a feature lab for <span><a :href="WORLDS_IVUE_LINK">Worlds iVue</a></span>, 
            a 3D geospatial platform developed by <span><a :href="IVUE_WEBSITE_LINK">iVue</a></span>. As a co-creator of Worlds iVue, 
            I use this environment to experiment with and prototype features before integrating them into the main platform. 
            One notable use case has been adapting Worlds iVue into a desktop application to support limited offline functionality.
        </p>
        <p>
            I'm glad you're here and hope you find inspiration in my work. 
            Feel free to explore the site, take ideas, and use them to spark your own creativity. 
            However, please don't directly copy my content, design, or code without my permission. 
            If you would like to collaborate or discuss using any part of my work, you can contact me 
            on my <span><a :href="(MAIN_WEBSITE + 'contact')">Main Website.</a></span>
        </p>
    </div>
</div>
</template>

<script setup>
import now from '~build/time';
import { version } from "~build/package";

const COPYRIGHT_TEXT = ref("&copy; 2025 Mohit Jain");
const RELEASE_DATE = ref("Last Release: July 14, 2025");
const PROJECT_VERSION = ref("Version " + version);

onMounted(() => {
    COPYRIGHT_TEXT.value = ("&copy; " + new Date().getFullYear() + " Mohit Jain");
    RELEASE_DATE.value = "Last Release: " + new Date(now).toLocaleDateString("en-US", {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
});
</script>

<style scoped>
#about-menu h3 {
    margin-left: 20px;
    margin-top: 5px;
    font-family: 'Lexend', sans-serif;
}
#about-menu p {
    margin: 20px auto;
    width: calc(100% - 40px);
    height: fit-content;
    font-family: 'Lexend', sans-serif;
}
#about-menu > p > span > a {
    text-decoration: underline;
    color: var(--blue-five);
}
</style>