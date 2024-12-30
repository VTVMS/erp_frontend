<template>
    <div class="bg-gray-900 relative">
        <div class="absolute top-20 right-20">
            <div class="sm:flex hidden dropdown-nav relative text-gray-800">
                <div class="dropdown-nav relative inline-block sm:ml-2 sm-3 group">
                    <div class="dropdown-toggle-nav flex p-2 font-medium">
                        <div class="relative w-full flex justify-center">
                            <img :src="currentLanguage.imgSrc" alt="Icon Language" class="h-6 w-12 px-2 object-cover" />
                            {{ currentLanguage.text }}
                        </div>
                    </div>
                    <div class="dropdown-content-nav border min-w-40 rounded-md hidden absolute right-0 bg-gray-100 text-gray-800 shadow group-hover:block dark:bg-gray-900 dark:text-white dark:border-gray-700 z-20">
                        <div class="flex flex-col w-full p-2">
                            <button @click="changeLanguage('vi')" class="flex items-center gap-x-1 py-2 text-sm border-b hover:bg-gray-200 border-gray-200 dark:hover:bg-gray-700 dark:border-gray-700">
                                <img :src="languages.vi.imgSrc" alt="Vietnamese" class="w-12 h-6 px-2 object-cover" /> {{ languages.vi.name }}
                            </button>
                            <button @click="changeLanguage('en')" class="flex items-center gap-x-1 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-700"><img :src="languages.en.imgSrc" alt="Vietnamese" class="w-12 h-6 px-2 object-cover" /> {{ languages.en.name }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 items-center gap-8 h-full">
            <div class="max-md:order-1 flex flex-col justify-center items-center">
                <img src="../../assets/logo-black.png" alt="UptopERP - Will be your success" class="lg:max-w-[50%]" />
                <span class="text-xl text-gray-100 mt-4 pb-10 text-center"> {{ $t('sloganLogin') }} </span>
                <img src="https://readymadeui.com/signin-image.webp" class="lg:max-w-[50%] w-full h-full object-contain block mx-auto" alt="login-image" />
            </div>
            <div class="flex flex-col justify-center items-center bg-white md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
                <form class="max-w-lg w-full mx-auto">
                    <div class="mb-12 flex justify-center">
                        <h3 class="text-gray-800 text-4xl font-extrabold">{{ $t('signIn') }}</h3>
                    </div>
                    <div>
                        <label class="text-gray-800 text-base block mb-2">{{ $t('email') }}</label>
                        <div class="relative flex items-center">
                            <input name="email" type="text" required class="w-full text-sm border-b border-gray-300 focus:border-gray-800 px-2 py-3 outline-none" placeholder="Enter email" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                    </clipPath>
                                </defs>
                                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="mt-8">
                        <label class="text-gray-800 text-base block mb-2">{{ $t('password') }}</label>
                        <div class="relative flex items-center">
                            <input name="password" type="password" required class="w-full text-sm border-b border-gray-300 focus:border-gray-800 px-2 py-3 outline-none" placeholder="Enter password" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                <path
                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label for="remember-me" class="text-gray-800 ml-3 block text-sm">{{ $t('remember') }}</label>
                        </div>
                        <div>
                            <a href="" class="text-blue-600 font-semibold text-sm hover:underline"> {{ $t('forgotPass') }} </a>
                        </div>
                    </div>
                    <div class="mt-12">
                        <button type="button" class="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none">{{ $t('signIn') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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
