<template>
    <div id="main-layout" class="flex flex-col h-screen justify-between dark:bg-gray-900 w-screen">
        <Head />
        <!-- Sidebar -->
        <div class="row flex h-screen justify-between dark:bg-gray-900 w-screen">
            <SideBar />

            <div class="flex-1 grid grid-rows-[1fr_auto]">
                <div class="overflow-y-auto p-3">
                    <div class="border-2 rounded-xl h-full p-2">
                        <slot />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import Head from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'MainLayout',
    components: {
        SideBar,
        Head,
        Footer,
    },
};
</script>

<style>
/* Style cho layout chung */
</style>
