import { createRouter, createWebHistory } from "vue-router";
import NoMenu from "./menus/NoMenu.vue";

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

    { path: "/blank", component: NoMenu },
    { path: '/:catchAll(.*)', redirect: "/blank" },
]

const globeRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: globeViews
});

export default globeRouter;