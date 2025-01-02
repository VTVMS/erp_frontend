<template>
    <button :class="[' text-gray-100 rounded-lg flex  items-center hover:scale-105 hover:shadow-sm transition-transform duration-300', buttonClass]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path v-if="iconPath" :d="iconPath" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ $t(buttonText) }}
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String as () => 'save' | 'edit' | 'delete' | 'cancel' | 'add' | 'actionEdit' | 'actionDelete',
        default: 'save',
    },
});

const buttonConfig = {
    save: {
        class: 'bg-green-600 hover:bg-green-700 px-4 py-2',
        text: 'save',
        icon: 'M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9',
    },
    edit: {
        class: 'bg-blue-600 hover:bg-blue-700 px-4 py-2',
        text: 'edit',
        icon: 'M5.75 17.75L14.25 9.25m-4.5 6.5l-5.5 5.5a.75.75 0 1 0 1.06 1.06l5.5-5.5m4.5-6.5L14.25 4.75',
    },
    delete: {
        class: 'bg-red-600 hover:bg-red-700 px-4 py-2',
        text: 'delete',
        icon: 'm14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0',
    },
    cancel: {
        class: ' px-4 py-2  ring-gray-300 hover:bg-gray-50 shadow-sm ring-1 ring-inset text-gray-900',
        text: 'cancel',
        icon: 'M6 18 18 6M6 6l12 12',
    },
    add: {
        class: 'bg-[#3b82f6] px-4 py-1',
        text: 'add',
        icon: 'M12 4.5v15m7.5-7.5h-15',
    },
    actionEdit: {
        class: 'border text-gray-500 border-gray-400 bg-gray-100 px-1 py-1',
        text: '',
        icon: 'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125',
    },
    actionDelete: {
        class: 'border text-red-400 border-red-300 bg-gray-100 px-1 py-1',
        text: '',
        icon: 'm14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0',
    },
    profile: {
        class: ' hover:bg-gray-200 gap-x-1 px-2 py-2 text-gray-800 text-sm',
        text: 'setUpProfile',
        icon: 'M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    },
    changePass: {
        class: ' hover:bg-gray-200 gap-x-1 px-2 py-2 text-gray-800 text-sm',
        text: 'changePass',
        icon: 'M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
    },
    logout: {
        class: ' hover:bg-gray-200 gap-x-1 px-2 py-2 text-gray-800 text-sm',
        text: 'logout',
        icon: 'M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75',
    },
};

const buttonClass = computed(() => buttonConfig[props.type]?.class || '');
const buttonText = computed(() => buttonConfig[props.type]?.text || '');
const iconPath = computed(() => buttonConfig[props.type]?.icon || '');
</script>
