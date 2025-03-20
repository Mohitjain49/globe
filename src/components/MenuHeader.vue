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
const props = defineProps({ title: { type: String, required: true } });

/**
 * This function adds or removes a heartbeat animation to any element.
 */
function setHeartbeatAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add('animate__animated', 'animate__heartBeat');
    } else {
        event.target.classList.remove('animate__animated', 'animate__heartBeat');
    }
}
</script>