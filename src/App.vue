<template>
    <div class="home">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import MainLayout from '@/layout/Layout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.checkLogin();
});

const layout = computed(() => {
    // return authStore.isLoggedIn ? MainLayout : AuthLayout; //check điều kiện nếu chưa login thì dùng AuthLayout và nếu đã đăng nhập thì dùng MainLayout
    return AuthLayout;   //dùng để test màn hình khi chưa có api đăng nhâppj

});
</script>

<style scoped>
.home {
    background-color: var(--color-60);
}
</style>
