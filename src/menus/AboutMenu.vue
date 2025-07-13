<template>
<div class="globeApp-menu">
    <MenuHeader :title="'About This App'" />
    <div class="globeApp-menu-body">
        <h3> {{ PROJECT_VERSION }} </h3>
        <h3> {{ RELEASE_DATE }} </h3>
        <h3 v-html="COPYRIGHT_TEXT"></h3>
    </div>
</div>
</template>

<script setup>
import now from '~build/time';
import { version } from "~build/package";

const COPYRIGHT_TEXT = ref("2025 Mohit Jain");
const RELEASE_DATE = ref("Last Release: July 14, 2025");
const PROJECT_VERSION = ref("Version " + version);

onMounted(() => {
    COPYRIGHT_TEXT.value = ("&copy; " + new Date().getFullYear() + " Mohit Jain");
    RELEASE_DATE.value = "Last Release: " + new Date(now).toLocaleDateString("en-US", {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
});
</script>