<template>
    <div class="relative">
        <div class="home row justify-between py-3 flex items-center sm:flex-nowrap ">
            <div class="sm:flex hidden ml-3">
                <button class="toggle-sidebar-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 ml-3 dark:text-gray-300 text-gray-100">
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
                    <ColorSwitcher/>
                </div>
                <div class="sm:flex hidden dropdown-nav px-4">
                    <div class="dropdown-nav inline-block sm:ml-2 sm-3 group">
                        <div class="dropdown-toggle-nav flex items-center gap-x-1 rounded-md text-sm cursor-pointer">
                            <div class="w-full flex justify-center">
                                <img class="h-10 w-10 flex-shrink-0 rounded-full object-cover bg-gray-300" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                            </div>
                        </div>
                        <div class="dropdown-content-nav border min-w-44 rounded-md hidden absolute right-0 bg-gray-100 text-gray-800 shadow group-hover:block">
                            <div class="flex flex-col w-full">
                                <button class="flex items-center gap-x-1 px-2 py-2 text-sm border-b border-gray-300 hover:bg-gray-100">
                                    <a href="/profile/personal-information" class="group flex gap-x-2 rounded-md items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 shrink-0">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                        <span class="text-sm leading-6"> {{ $t('setUpProfile') }}</span>
                                    </a>
                                </button>
                                <button class="flex items-center gap-x-1 px-2 py-2 text-sm border-b border-gray-300 hover:bg-gray-100">
                                    <a href="/" class="group flex gap-x-2 rounded-md items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 shrink-0">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                        <span class="text-sm leading-6">{{ $t('changePass') }}</span>
                                    </a>
                                </button>
                                <button class="flex items-center gap-x-1 px-2 py-2 text-sm border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-b-md" on:click="{on_logout}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 shrink-0">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                    </svg>

                                    <span class="text-sm leading-6">{{ $t('logout') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import ColorSwitcher from '@/components/ColorSwitcher.vue';

</script>

<style scoped>
.home {
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
