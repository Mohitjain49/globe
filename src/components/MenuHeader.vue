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
const props = defineProps({
    title: { type: String, required: true }
});
</script>

<style scoped>
.globeApp-menu-top {
    height: 53px;
    width: 100%;
    border-bottom: 2px solid var(--blue-cobalt);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background: linear-gradient(to right, var(--blue-one) 0%, rgba(187, 210, 255, 0.95) 15%, rgba(187, 210, 255, 0.95) 85%, var(--blue-one) 100%);
}
.globeApp-menu-header {
    font-family: 'Lexend', sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: var(--blue-cobalt);
    margin-left: 15px;
    text-shadow:
        -1px -1px 0 white,
        1px -1px 0 white,
        -1px 1px 0 white,
        1px 1px 0 white;
}

.globeApp-menu-top-iconContainer {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    font-size: 25px;
    color: var(--blue-cobalt);
    cursor: pointer;
    border: 2px dotted var(--blue-cobalt);
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    transition: var(--default-transition);
}
.globeApp-menu-top-iconContainer:hover {
    background-color: var(--blue-two);
    box-shadow: 0px 0px 5px 0px var(--blue-two);
}
</style>