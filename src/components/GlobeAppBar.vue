<template>
<div class="globe-appBar">
    <div class="globe-appBar-top">
        <RouterLink v-for="menu in MAIN_MENUS" :to="getBtnRoute(menu.route)" class="globe-appBar-icon" :title="menu.title">
            <font-awesome-icon :icon="menu.faIcon" />
            <span> {{ menu.text }} </span>
        </RouterLink>
        <a v-if="SHOW_DOWNLOAD_BTN" :href="WINDOW_INSTALL_PATH" class="globe-appBar-icon gold download" title="Download Globe as Windows OS App" download>
            <font-awesome-icon icon="fa-cloud-arrow-down" style="margin-top: 3px;" />
            <span> Download (Windows) </span>
        </a>
    </div>

    <div class="globe-appBar-bottom">
        <a :href="MAIN_WEBSITE" class="globe-appBar-icon gold" title="My Main Website">
            <font-awesome-icon icon="fa-house" style="margin-top: 3px;" />
            <span> Home </span>
        </a>
        <a :href="REPOSITORY_LINK" class="globe-appBar-icon" title="GitHub Repository">
            <font-awesome-icon icon="fa-brands fa-github" style="margin-top: 3px;" />
            <span> Git Repo </span>
        </a>
        <div class="globe-appBar-icon screen" :title="screenStore.elementTitle" @click="screenStore.setFullScreen()">
            <font-awesome-icon :icon="screenStore.faIcon" />
        </div>
    </div>
</div>
</template>

<script setup>
const screenStore = useScreenStore();
const SHOW_DOWNLOAD_BTN = (import.meta.env.VITE_IS_TAURI === "false");
const WINDOW_INSTALL_PATH = "https://mohitjain49.github.io/globe/mohit_globe_windows_installer.msi";

const MAIN_MENUS = [
    { route: ["/", "/search"], faIcon: "fa-magnifying-glass", text: "Search", title: "Search Locations" },
    { route: "/map", faIcon: "fa-book-atlas", text: "Map", title: "Map Settings" },
    { route: "/about", faIcon: "fa-circle-info", text: "About", title: "About This App" },
    { route: "/options", faIcon: "fa-bars-staggered", text: "Options", title: "Options" },
]
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
    justify-content: flex-end;
    flex-direction: column;
}
.globe-appBar-top {
    height: fit-content;
    width: 100%;
    display: flex;
    align-items: center;
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

.globe-appBar-icon.gold {
    color: var(--gold-color);
}
.globe-appBar-icon.gold:hover {
    background-color: var(--gold-light);
    color: black;
}

.globe-appBar-icon span {
    margin-top: 2px;
    font-size: 11px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    text-align: center;
}
.globe-appBar-icon.screen {
    font-size: 28px;
}

.globe-appBar-icon.download {
    height: 61px;
}
.globe-appBar-icon.download span {
    font-size: 9px;
}
</style>