<template>
<div class="globeApp-menu-top">
    <div class="globeApp-menu-header"> {{ title }} </div>
    <RouterLink to="/blank" class="globeApp-menu-top-iconContainer"
        @mouseenter="setHeartbeatAnimation"
        @mouseleave="setHeartbeatAnimation">
        <font-awesome-icon icon="fa-xmark" title="Click To Close Menu" />
    </RouterLink>
</div>
</template>

<script setup>
import "../styles/menu.css";
import { setHeartbeatAnimation } from "../store/ExtraStores.js";
const props = defineProps({ title: { type: String, required: true } });
</script>