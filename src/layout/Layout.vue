<template>
    <div id="main-layout" class="flex flex-col justify-between bg-gray-900">
        <Head :toggleSidebar="toggleSidebar" />
        <div class="row flex justify-between dark:bg-gray-900" style="height: calc(100vh - 64px)">
            <SideBar v-if="isSidebarVisible" />

            <div class="flex-1 grid grid-rows-[1fr_auto]">
                <div class="overflow-y-auto p-2 bg-gray-300">
                    <div class="rounded-xl h-full flex flex-col p-2 bg-white">
                        <slot />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SideBar from '@/components/SideBar.vue';
import Head from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const isSidebarVisible = ref(true);

const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

