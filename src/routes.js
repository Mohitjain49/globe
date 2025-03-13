import { createRouter, createWebHistory } from "vue-router";

import Globe from "./Globe.vue";
import Resume from "./pages/Resume.vue";

const globeRoutes = [
    { path: "/", name: "Main Globe Page", component: Globe },
    { path: "/resume", name: "Resume Page", component: Resume },

    { path: "/globe", redirect: "/" },
    { path: '/:catchAll(.*)', redirect: "/" },
];

const globeRouter = createRouter({
    history: createWebHistory(),
    routes: globeRoutes
});

export const MAIN_WEBSITE = "https://mohit-jain.com/";

export default globeRouter;