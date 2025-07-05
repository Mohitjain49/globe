<template>
<div class="globe-appBar">
    <div class="globe-appBar-top">
        <RouterLink :to="getBtnRoute('/')" class="globe-appBar-icon" :title="SEARCH_ICON_TITLE">
            <font-awesome-icon icon="fa-magnifying-glass" />
            <span>Search</span>
        </RouterLink>
    </div>
    <div class="globe-appBar-bottom">
        <RouterLink :to="getBtnRoute('/options')" class="globe-appBar-icon" :title="OPTIONS_ICON_TITLE">
            <font-awesome-icon icon="fa-ellipsis-vertical" />
            <span>Options</span>
        </RouterLink>
        <a :href="MAIN_WEBSITE" class="globe-appBar-icon gold" :title="HOME_ICON_TITLE">
            <font-awesome-icon icon="fa-house" style="margin-top: 3px;" />
            <span>Home</span>
        </a>
        <div class="globe-appBar-icon screen" :title="screenStore.elementTitle" @click="screenStore.setFullScreen()">
            <font-awesome-icon :icon="screenStore.faIcon" />
        </div>
    </div>
</div>
</template>

<script setup>
const screenStore = useScreenStore();
const SEARCH_ICON_TITLE = "Search Locations";
const OPTIONS_ICON_TITLE = "Options";
const HOME_ICON_TITLE = "My Main Website";
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
}
.globe-appBar-icon.screen {
    font-size: 28px;
}
</style>