import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import NoMenu from "./menus/NoMenu.vue";
import RedirectMenu from "./menus/RedirectMenu.vue";

import SearchMenu from "./menus/SearchMenu.vue";
import OptionsMenu from "./menus/OptionsMenu.vue";
import MapMenu from "./menus/MapMenu.vue";
import AboutMenu from "./menus/AboutMenu.vue";

/**
 * @type {import('vue-router').RouteRecordRaw[]} These are the views that control the menus for my globe page.
 */
export const globeViews = [
    { path: "/", alias: ['/search'], component: SearchMenu },
    { path: "/options", component: OptionsMenu },
    { path: "/map", component: MapMenu },
    { path: "/about", component: AboutMenu },

    { path: "/wiv", alias: ["/worldsivue", "/worlds-ivue"], component: RedirectMenu, props: { link: WORLDS_IVUE_LINK } },
    { path: "/repository", alias: ["/repo"], component: RedirectMenu, props: { link: REPOSITORY_LINK } },
    { path: "/commits", component: RedirectMenu, props: { link: COMMITS_LINK } },

    { path: "/mohit-website", component: RedirectMenu, props: { link: MAIN_WEBSITE } },
    { path: "/linkedin", component: RedirectMenu, props: { link: LINKEDIN_PROFILE } },
    { path: "/github", component: RedirectMenu, props: { link: GITHUB_PROFILE } },

    { path: "/blank", component: NoMenu },
    { path: '/:catchAll(.*)', redirect: "/blank" },
]

const globeRouter = createRouter({
    history: (TAURI_MODE ?
        createWebHistory(import.meta.env.BASE_URL) :
        createWebHashHistory(import.meta.env.BASE_URL)
    ),
    routes: globeViews
});

export default globeRouter;