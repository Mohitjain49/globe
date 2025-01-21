import { createRouter, createWebHistory } from "vue-router";

import Globe from "./Globe.vue";
import InvalidPage from "./pages/InvalidPage.vue";

const globeRoutes = [
    { path: "/", name: "Main Globe Page", component: Globe },
    { path: "/globe", redirect: "/" },
    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidPage },
];

const globeRouter = createRouter({
    history: createWebHistory(),
    routes: globeRoutes
});

export default globeRouter;