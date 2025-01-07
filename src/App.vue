<template>
    <div class="home">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth.store.js';
import MainLayout from './layout/Layout.vue';
import AuthLayout from './layout/AuthLayout.vue';

const authStore = useAuthStore();

const layout = computed(() => {
    return authStore.isLoggedIn ? MainLayout : AuthLayout;
});
</script>

<style scoped>
.home {
    background-color: var(--color-60);
}
</style>
