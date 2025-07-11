<template>
<div class="globeApp-menu">
    <MenuHeader :title="'Options'" />
    <div class="globeApp-menu-body">
        <RouterLink v-for="tab in MENU_TABS" :to="tab.route" class="globeApp-menu-button">
            <font-awesome-icon :icon="tab.icon" />
            <span> {{ tab.text }} </span>
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
        <div class="globeApp-menu-line"></div>

        <a v-for="tab in REPO_TABS" :href="tab.link" class="globeApp-menu-button">
            <font-awesome-icon :icon="tab.icon" />
            <span> {{ tab.name }} </span>
        </a>
    </div>
</div>
</template>

<script setup>
const screenStore = useScreenStore();

const MENU_TABS = ref([
    { route: "/", icon: "fa-magnifying-glass", text: "Search Locations" },
    { route: "/map", icon: "fa-book-atlas", text: "Map Settings" },
    { route: "/about", icon: "fa-circle-info", text: "About This App" },
])
const PERSONAL_WEBSITE_TABS = ref([
    { name: "View My Main Website", icon: "fa-house", link: MAIN_WEBSITE },
    { name: "Contact Me", icon: "fa-paper-plane", link: (MAIN_WEBSITE + 'contact/') },
    { name: "View My Resume", icon: "fa-file-lines", link: (MAIN_WEBSITE + 'resume/') }
]);

const SOCIALS_TABS = ref([
    { name: "Email Me", icon: "fa-envelope", link: ("mailto:" + MAIN_EMAIL) },
    { name: "My GitHub Profile", icon: "fa-brands fa-square-github", link: GITHUB_PROFILE },
    { name: "My LinkedIn Profile", icon: "fa-brands fa-linkedin", link: LINKEDIN_PROFILE }
]);
const REPO_TABS = ref([
    { name: "GitHub Repository", icon: "fa-brands fa-github", link: REPOSITORY_LINK },
    { name: "Commits", icon: "fa-code-commit", link: COMMITS_LINK }
]);
</script>