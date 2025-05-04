import { createRouter, createWebHistory } from "vue-router";

import SearchMenu from "./menus/SearchMenu.vue";
import OptionsMenu from "./menus/OptionsMenu.vue";
import NoMenu from "./menus/NoMenu.vue";

/**
 * @type {import('vue-router').RouteRecordRaw[]} These are the views that control the menus for my globe page.
 */
export const globeViews = [
    { path: "/", component: SearchMenu },
    { path: "/options", component: OptionsMenu },

    { path: "/blank", component: NoMenu },
    { path: "/search", redirect: "/" },
    { path: '/:catchAll(.*)', redirect: "/" },
]

const globeRouter = createRouter({
    history: createWebHistory("/globe"),
    routes: globeViews
});

export const MAIN_WEBSITE = "https://www.mohit-jain.com/";

export default globeRouter;