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
                            <button @click="changeLanguage('en')" class="flex items-center gap-x-1 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-700">
                                <img :src="languages.en.imgSrc" alt="Vietnamese" class="w-12 h-6 px-2 object-cover" /> {{ languages.en.name }}
                            </button>
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
                <form class="max-w-lg w-full mx-auto" @submit.prevent="handleSubmit">
                    <div class="mb-8 flex justify-center">
                        <h3 class="text-gray-800 text-4xl font-extrabold">{{ $t('signIn') }}</h3>
                    </div>
                    <div>
                        <CustomInput label="email" placeholder="enterYourEmail" id="email" required v-model="email" type="text" />
                    </div>
                    <div class="mt-6">
                        <CustomInput label="password" placeholder="enterYourPassword" id="password" required v-model="password" type="password" />
                    </div>
                    <div class="mt-14">
                        <button
                        @click="showToast"
                            type="submit"
                            @click.prevent="authStore.loginByEmail({email, password})"
                            class="w-full py-2 px-6 text-base font-semibold tracking-wider rounded-full text-white"
                            :class="{
                                'bg-gray-400 cursor-not-allowed': !isFormValid || isLoading,
                                'bg-gray-800 hover:bg-gray-900 focus:outline-none': isFormValid && !isLoading,
                            }"
                            :disabled="!isFormValid || isLoading"
                        >
                            <span v-if="!isLoading">{{ $t('signIn') }}</span>
                            <span v-else class="flex items-center justify-center">
                                <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.292A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1.292-1.646z"></path>
                                </svg>
                                {{ $t('loading') }}
                            </span>
                        </button>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CustomInput from '@/components/Input.vue';
import { useToast } from 'vue-toastification';
import {useAuthStore} from "@/stores/auth.store.ts";

const toast = useToast();

const showToast = () => {
  toast.success('Your message has been sent!');
};
const { locale } = useI18n();
const authStore = useAuthStore();

const languages = {
    vi: {
        text: 'VI',
        name: 'Việt Nam',
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

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const isFormValid = computed(() => {
    return email.value && password.value;
});

const handleSubmit = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
};
</script>
