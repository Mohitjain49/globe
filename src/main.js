import "@fontsource/lexend";
import "@fontsource/roboto";
import '~build/console';

import "./styles/mainstyles.css";
import './styles/globestyle.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Ion } from "cesium";

import App from './App.vue';
import globeRouter from './routes.js';
const pinia = createPinia();

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as FaBrands from "@fortawesome/free-brands-svg-icons";

library.add(fas,
    FaBrands.faSquareGithub,
    FaBrands.faLinkedin,
    FaBrands.faGithub
);

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;
createApp(App).use(globeRouter).use(pinia).mount('#app');