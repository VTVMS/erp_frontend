<template>
    <div id="main-layout" class="flex flex-col h-screen justify-between dark:bg-gray-900 w-screen">
        <div class="flex-1 grid grid-rows-[1fr_auto]">
            <LoginPage/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LoginPage from '../views/login/login.vue';

</script>
