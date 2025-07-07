import "@fontsource/lexend";
import "@fontsource/roboto";
import '~build/console';

import "./styles/mainstyles.css";
import './styles/globestyle.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import globeRouter from './routes.js';
const pinia = createPinia();

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import * as FaIcons from '@fortawesome/free-solid-svg-icons';
import * as FaBrands from "@fortawesome/free-brands-svg-icons";

library.add(
    FaIcons.faMapPin,
    FaIcons.faMagnifyingGlass,
    FaIcons.faXmark,
    FaIcons.faHouse,
    FaIcons.faArrowLeft,
    FaIcons.faMapLocationDot,
    FaIcons.faGamepad,
    FaIcons.faLaptopCode,
    FaIcons.faExpand,
    FaIcons.faCompress,
    FaIcons.faClock,
    FaIcons.faGear,
    FaIcons.faPaperPlane,
    FaIcons.faGlobe,
    FaIcons.faFileLines,
    FaIcons.faRotateRight,
    FaIcons.faEnvelope,
    FaIcons.faBarsStaggered,
    FaIcons.faBookAtlas,
    FaIcons.faCodeCommit,

    FaBrands.faSquareGithub,
    FaBrands.faLinkedin,
    FaBrands.faGithub
);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).
    use(globeRouter).
    use(pinia).
    mount('#app');
