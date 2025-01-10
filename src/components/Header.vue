<template>
    <div class="relative">
        <div class="home row justify-between py-3 flex items-center sm:flex-nowrap text-gray-200">
            <div class="sm:flex hidden ml-3">
                <button type='button' @click="toggleSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 ml-3 dark:text-gray-300 text-gray-100"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                </button>
                <a href="/"> <img src="../assets/logo-black.png" alt="UptopERP - Will be your success" class="h-10 ml-2 w-full" /></a>
            </div>
            <div class="row flex items-center">
                <div class="sm:flex hidden ml-3">
                    <LanguageSwitcher />
                    <ColorSwitcher />
                </div>
                <div class="sm:flex hidden dropdown-nav px-4">
                    <div class="dropdown-nav inline-block sm:ml-2 sm-3 group">
                        <div class="dropdown-toggle-nav flex items-center gap-x-1 rounded-md text-sm cursor-pointer">
                            <div class="w-full flex justify-center">
                                <img class="h-10 w-10 flex-shrink-0 rounded-full object-cover bg-gray-300" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                            </div>
                        </div>
                        <div class="dropdown-content-nav border min-w-44 rounded-md hidden absolute right-0 mr-3 bg-gray-100 text-gray-800 shadow group-hover:block z-50">
                            <div class="flex flex-col w-full py-1 px-1 gap-1">
                                <Button type="profile" @click="navigateToProfile" />
                                <hr />
                                <Button type="changePass" />
                                <hr />
                                <Button type="logout" @click.prevent="authStore.logout()" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import ColorSwitcher from '../components/ColorSwitcher.vue';
import Button from '../components/Button.vue';
import { useAuthStore } from '../stores/auth.store.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToProfile = () => {
  router.push('/profile');
};
defineProps({
    toggleSidebar: {
        type: Function,
        required: true,
    },
});

const authStore = useAuthStore();
</script>

<style scoped>
.home {
    background-color: var(--color-60);
    color: var(--text-color);
}
</style>
