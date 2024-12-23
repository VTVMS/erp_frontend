<template>
    <MainLayout>
        <router-view />
    </MainLayout>
</template>

<script>

import MainLayout from '@/layout/Layout.vue';
export default {
    name: 'App',
    components: {
        MainLayout,
    },
};
</script>


