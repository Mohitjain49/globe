<template>
<div class="globeApp-menu">
    <MenuHeader :title="'iVue'" />
    <div class="globeApp-menu-body center-flex-display">
        <div class="globeApp-menu-incomplete">
            This page is currently in development.
        </div>
    </div>
</div>
</template>

<script setup>
import "@/styles/menu.css";
import MenuHeader from "@/components/MenuHeader.vue";
</script>