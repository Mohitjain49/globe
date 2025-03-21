import { createRouter, createWebHistory } from "vue-router";

import SearchMenu from "./menus/SearchMenu.vue";
import OptionsMenu from "./menus/OptionsMenu.vue";
import NoMenu from "./menus/NoMenu.vue";

import CareerMenu from "./menus/career/CareerMenu.vue";
import IvueMenu from "./menus/career/IvueMenu.vue";
import KennesawMenu from "./menus/career/KennesawMenu.vue";
import SubloMenu from "./menus/career/SubloMenu.vue";

/**
 * @type {import('vue-router').RouteRecordRaw[]} These are the views that control the menus for my globe page.
 */
export const globeViews = [
    { path: "/", component: SearchMenu },
    { path: "/options", component: OptionsMenu },

    { path: "/blank", component: NoMenu },
    { path: "/search", redirect: "/" },
    { path: '/:catchAll(.*)', redirect: "/" },

    { path: "/career", children: [
        { path: "", component: CareerMenu },
        { path: "ivue", component: IvueMenu },
        { path: "ksu", component: KennesawMenu },
        { path: "sublo", component: SubloMenu },
    ]},
]

const globeRouter = createRouter({
    history: createWebHistory(),
    routes: globeViews
});

export const MAIN_WEBSITE = "https://www.mohit-jain.com/";

export default globeRouter;