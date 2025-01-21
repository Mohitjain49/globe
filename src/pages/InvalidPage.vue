<template>
<div id="invalid" class="personal-web-body">
    <div class="gradient-text incomplete-title"> 404 - Page Not Found </div>
    <div class="main-sector-bottom-linkBtn-container center-flex-display" style="padding-bottom: 30px;">
        <RouterLink to="/" class="main-sector-bottom-linkBtn center-flex-display">Go To Globe</RouterLink>
    </div>
</div>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => { document.title = "Invaild Page | Mohit Jain | My Globe"; });
</script>

<style scoped>
.personal-web-body#invalid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: calc(100% - 40px);
    padding: 0px 20px;
    min-height: 100%;
    top: 0px;
}
.incomplete-title {
    font-size: 60px;
    width: fit-content;
    height: fit-content;
    margin-bottom: 5px;
    text-align: center;
}
.incomplete-subtitle {
    font-size: 20px;
    font-family: "Roboto", "Lexend", sans-serif;
    color: var(--website-text);
    margin-bottom: 10px;
    height: fit-content;
    width: fit-content;
    text-align: center;
}

.main-sector-bottom-linkBtn-container {
    height: 75px;
    width: 100%;
}
.main-sector-bottom-linkBtn {
    cursor: pointer;
    height: 45px;
    width: 250px;
    color: var(--website-text);
    font-size: 20px;
    font-weight: bold;
    font-family: 'Lexend', sans-serif;
    border-radius: 10px;
    text-decoration: none;
    border: var(--empty-border);
    background-color: var(--website-light-text);
    transition: var(--default-transition);
}
.main-sector-bottom-linkBtn:hover {
    border-color: var(--website-text);
}

@media (max-width: 600px) {
    .incomplete-title {
        font-size: 42px;
    }
}
</style>