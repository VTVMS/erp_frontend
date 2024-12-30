<template>
    <div class="h-full flex flex-col items-center px-4">
        <div class="header flex justify-between border-b-2 w-full py-2">
            <div></div>
            <h3 class="text-gray-800 text-3xl font-extrabold ml-20">{{ $t('profile') }}</h3>
            <button class="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
                {{ $t('save') }}
            </button>
        </div>
        <div class="content flex flex-col items-center container overflow-y-auto mt-2">
            <img class="h-40 w-40 rounded-full object-cover bg-gray-300" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('name') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Thông tin họ và tên..."
                        />
                    </div>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('codeEmployee') }} </label>
                    <div class="mt-2.5">
                        <input
                            disabled
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 bg-gray-300 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Mã nhân viên"
                        />
                    </div>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('sex') }} </label>
                    <select
                        id="position"
                        v-model="selectPosition"
                        name="user"
                        autocomplete="country-name"
                        class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                    >
                        <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                            {{ position.position_name }}
                        </option>
                    </select>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('birthday') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="date"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                    </div>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('email') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Nhập thông tin email..."
                        />
                    </div>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('phone') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('department') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('position') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-2 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('department') }} </label>
                    <select
                        id="position"
                        v-model="selectPosition"
                        name="user"
                        autocomplete="country-name"
                        class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                    >
                        <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                            {{ position.position_name }}
                        </option>
                    </select>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('position') }} </label>
                    <select
                        id="position"
                        v-model="selectPosition"
                        name="user"
                        autocomplete="country-name"
                        class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                    >
                        <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                            {{ position.position_name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="grid gap-4 grid-cols-1 grid-rows-1 w-full">
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('address') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const positions = ref([
    { id: 1, position_name: 'Vị trí 1' },
    { id: 2, position_name: 'Vị trí 2' },
    { id: 3, position_name: 'Vị trí 3' },
]);
const selectPosition = ref('');
</script>

<style scoped>
.home {
    background-color: var(--color-60);
    color: var(--text-color);
    padding: 20px;
    border: 2px solid var(--accent-color);
    border-radius: 8px;
}
</style>
