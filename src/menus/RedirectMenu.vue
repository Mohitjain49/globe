<template>
<!-- THIS COMPONENT IS BLANK TO SHOW THIS EXISTS TO REDIRECT THE USER TO ANOTHER PAGE. -->
</template>

<script setup>
const props = defineProps({ link: { type: String, default: "" } });
onMounted(() => { window.location.replace(props.link); });
</script>