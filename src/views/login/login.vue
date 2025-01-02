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

                    <!-- Email Input -->
                    <div>
                        <div class="relative flex items-end">
                            <CustomInput v-model="email" type="userName" label="email" placeholder="email" :required="true" :showError="showEmailError" @blur="checkEmail" class="w-full" />
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div class="mt-3">
                        <div class="relative flex items-center">
                            <CustomInput v-model="password" type="password" label="password" placeholder="Enter your password" :required="true" :showError="showPasswordError" @blur="checkPassword" class="w-full" />
                        </div>
                    </div>

                    <!-- Remember me and Forgot password -->
                    <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label for="remember-me" class="text-gray-800 ml-3 block text-sm">{{ $t('remember') }}</label>
                        </div>
                        <div>
                            <a href="" class="text-blue-600 font-semibold text-sm hover:underline"> {{ $t('forgotPass') }} </a>
                        </div>
                    </div>

                    <!-- Sign In Button -->
                    <div class="mt-12">
                        <button
                            type="button"
                            class="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white"
                            :class="{
                                'bg-gray-400 cursor-not-allowed': isFormValid,
                                ' bg-gray-800 hover:bg-[#222] focus:outline-none': !isFormValid,
                            }"
                            :disabled="!isFormValid"
                        >
                            {{ $t('signIn') }}
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

const email = ref('');
const password = ref('');

const showEmailError = ref(false);
const showPasswordError = ref(false);

const checkEmail = () => {
    showEmailError.value = !password.value;
};

const checkPassword = () => {
    showPasswordError.value = !password.value;
};

// Computed property để kiểm tra xem form có hợp lệ không
const isFormValid = computed(() => {
    return !email.value && !password.value && !showEmailError.value && !showPasswordError.value;
});
</script>
