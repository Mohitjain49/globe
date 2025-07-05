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

        <a v-for="tab in SOCIALS_TABS" :href="tab.link" class="globeApp-menu-button">
            <font-awesome-icon :icon="tab.icon" />
            <span> {{ tab.name }} </span>
        </a>
    </div>
</div>
</template>

<script setup>
const screenStore = useScreenStore();
const PERSONAL_WEBSITE_TABS = ref([
    { name: "View My Main Website", icon: "fa-house", link: MAIN_WEBSITE },
    { name: "Contact Me", icon: "fa-paper-plane", link: (MAIN_WEBSITE + 'contact/') },
    { name: "View My Resume", icon: "fa-file-lines", link: (MAIN_WEBSITE + 'resume/') }
]);
const SOCIALS_TABS = ref([
    { name: "Email Me", icon: "fa-envelope", link: ("mailto:" + MAIN_EMAIL) },
    { name: "My GitHub Portfolio", icon: "fa-brands fa-square-github", link: GITHUB_PROFILE },
    { name: "View My Resume", icon: "fa-brands fa-linkedin", link: LINKEDIN_PROFILE }
]);
</script>