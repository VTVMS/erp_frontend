<template>
    <div class="sm:flex hidden dropdown-nav relative text-gray-100">
        <div class="dropdown-nav relative inline-block sm:ml-2 sm-3 group">
            <div class="dropdown-toggle-nav flex p-2 font-medium">
                <div class="relative w-full flex justify-center">
                    <img :src="currentLanguage.imgSrc" alt="Icon Language" class="h-6 w-12 px-2 object-cover" />
                    {{ currentLanguage.text }}
                </div>
            </div>
            <div class="dropdown-content-nav border min-w-40 rounded-md hidden absolute right-0 bg-gray-100 text-gray-800 shadow group-hover:block z-50">
                <div class="flex flex-col w-full  py-1 px-1 gap-1">
                    <button @click="changeLanguage('vi')" class="flex items-center gap-x-1 px-2 py-2 text-sm hover:scale-105 hover:shadow-sm transition-transform duration-300 hover:bg-gray-200">
                        <img :src="languages.vi.imgSrc" alt="Vietnamese" class="w-12 h-6 px-2 object-cover" /> {{ languages.vi.name }}
                    </button>
                    <hr/>
                    <button @click="changeLanguage('en')" class="flex items-center gap-x-1 px-2 py-2 text-sm hover:scale-105 hover:shadow-sm transition-transform duration-300 hover:bg-gray-200">
                        <img :src="languages.en.imgSrc" alt="Vietnamese" class="w-12 h-6 px-2 object-cover" /> {{ languages.en.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {  computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const languages = {
    vi: {
        text: 'VI',
        name: 'ViệT Nam',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png',
    },
    en: {
        text: 'EN',
        name: 'English',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
    },
};

const currentLanguage = computed(() => {
    return locale.value === 'vi' ? languages.vi : languages.en;
});

const changeLanguage = (lang: string) => {
    locale.value = lang;
};
</script>

<style>
button {
    margin: 0 5px;
}
</style>
