import { createRouter, createWebHistory } from "vue-router";
import Globe from "./Globe.vue";

const globeRouter = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "Main Globe Page", component: Globe },
        { path: '/:catchAll(.*)', redirect: "/" },
    ]
});

export const MAIN_WEBSITE = "https://www.mohit-jain.com/";

export default globeRouter;