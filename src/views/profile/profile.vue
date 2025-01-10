<template>
    <div class="h-full flex flex-col items-center px-4">
        <div class="header flex justify-between border-b-2 w-full py-2">
            <div></div>
            <h3 class="text-gray-800 text-3xl font-extrabold ml-20">{{ $t('profile') }}</h3>
            <button
                class="px-3 py-1 text-white rounded-md shadow-md flex items-center"
                @click="saveProfile"
                :class="{
                    'bg-gray-400 cursor-not-allowed': !isDirty || isLoading,
                    'bg-green-600 hover:bg-green-700': isDirty && !isLoading,
                }"
                :disabled="!isDirty || isLoading"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
                {{ $t('save') }}
            </button>
        </div>
        <div class="content flex flex-col items-center container overflow-y-auto mt-2">
            <img class="h-40 w-40 rounded-full object-cover bg-gray-300" src="../../assets/no_user.png" alt="User Avatar" />
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('name') }}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        id="id"
                        v-model="fullName"
                        @input="checkIfDirty"
                        :placeholder="$t('enterName')"
                        type="type"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>

                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('codeEmployee') }}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        id="id"
                        disabled
                        v-model="codeEmployee"
                        @input="checkIfDirty"
                        :placeholder="$t('entercodeEmployee')"
                        type="type"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('gender') }}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        id="id"
                        v-model="gender"
                        @input="checkIfDirty"
                        type="type"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>

                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('birthday') }}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        id="birthday"
                        v-model="birthday"
                        @input="checkIfDirty"
                        type="date"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('email') }}
                    </label>
                    <input
                        id="id"
                        v-model="email"
                        type="type"
                        @input="checkIfDirty"
                        :placeholder="$t('enterYourEmail')"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>

                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('phone') }}
                    </label>
                    <input
                        id="phone"
                        v-model="phone"
                        type="text"
                        @input="checkIfDirty"
                        :placeholder="$t('enterYourPhone')"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('department') }}
                    </label>
                    <input
                        id="id"
                        v-model="department"
                        type="type"
                        @input="checkIfDirty"
                        :placeholder="$t('enterDepartment')"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>

                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('position') }}
                    </label>
                    <input
                        id="position"
                        v-model="position"
                        @input="checkIfDirty"
                        :placeholder="$t('enterPosition')"
                        type="text"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div class="grid gap-4 grid-cols-1 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label class="block text-base font-medium leading-6">
                        {{ $t('address') }}
                    </label>
                    <input
                        id="address"
                        v-model="address"
                        @input="checkIfDirty"
                        :placeholder="$t('enterAddress')"
                        type="text"
                        class="mt-2.5 block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useProfileStore } from '../../stores/profile.store';

const fullName = ref('');
const codeEmployee = ref('');
const gender = ref('');
const birthday = ref('');
const email = ref('');
const phone = ref('');
const department = ref('');
const position = ref('');
const address = ref('');

const isDirty = ref(false);
const isLoading = ref(false);

const originalUser = ref({
    full_name: '',
    email: '',
    gender: '',
    birthday: '',
    phone_number: '',
    department: '',
    position: '',
    address: '',
});

const profileStore = useProfileStore();

onMounted(async () => {
    await profileStore.profileUsers();
    const user = profileStore.profile;
    console.log(user)
    if (user) {
        originalUser.value = {
            full_name: user.full_name || '',
            email: user.email || '',
            gender: user.gender || '',
            birthday: user.birthday || '',
            phone_number: user.phone_number || '',
            department: user.department || '',
            position: user.position || '',
            address: user.address || '',
        };
        fullName.value = originalUser.value.full_name;
        codeEmployee.value = originalUser.value.email;
        gender.value = originalUser.value.gender;
        birthday.value = originalUser.value.birthday;
        email.value = originalUser.value.email;
        phone.value = originalUser.value.phone_number;
        department.value = originalUser.value.department;
        position.value = originalUser.value.position;
        address.value = originalUser.value.address;
    }
});

const checkIfDirty = () => {
    isDirty.value =
        fullName.value !== originalUser.value.full_name ||
        codeEmployee.value !== originalUser.value.email ||
        gender.value !== originalUser.value.gender ||
        birthday.value !== originalUser.value.birthday ||
        email.value !== originalUser.value.email ||
        phone.value !== originalUser.value.phone_number ||
        department.value !== originalUser.value.department ||
        position.value !== originalUser.value.position ||
        address.value !== originalUser.value.address;
};

const saveProfile = async () => {
    const updatedData = {
        full_name: fullName.value,
        codeEmployee: codeEmployee.value,
        gender: gender.value,
        birthday: birthday.value,
        email: email.value,
        phone_number: phone.value,
        department: department.value,
        position: position.value,
        address: address.value,
    };
    await profileStore.updateUser(updatedData);
};
</script>
