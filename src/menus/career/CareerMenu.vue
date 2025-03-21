<template>
<div class="globeApp-menu">
    <MenuHeader :title="'My Career'" />
    <div class="globeApp-menu-body column">
        <RouterLink to="/career/ivue" class="globeApp-menu-button_2 ivue"
            @mouseenter="setShakeYAnimation"
            @mouseleave="setShakeYAnimation">

        </RouterLink>
        <RouterLink to="/career/ksu" class="globeApp-menu-button_2 ksu"
            @mouseenter="setShakeYAnimation"
            @mouseleave="setShakeYAnimation">

        </RouterLink>
        <RouterLink to="/career/sublo" class="globeApp-menu-button_2 sublo"
            @mouseenter="setShakeYAnimation"
            @mouseleave="setShakeYAnimation">

        </RouterLink>
        <div style="padding: 15px 0px; width: 100%;"></div>
    </div>
</div>
</template>

<script setup>
import "@/styles/menu.css";
import { setShakeYAnimation } from "@/store/ExtraStores.js";
import MenuHeader from "@/components/MenuHeader.vue";
</script>