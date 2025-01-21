import { createRouter, createWebHistory } from "vue-router";

import Globe from "./Globe.vue";

const personalRoutes = [
    { path: "/", name: "Main Globe Page", component: Globe },
    { path: "/globe", redirect: "/" },
];

const globeRouter = createRouter({
    history: createWebHistory(),
    routes: globeRoutes
});

export default globeRouter;