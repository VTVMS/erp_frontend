<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
        <div :style="{ width: width || '550px' }" class="bg-white rounded-lg shadow-lg  px-4">
            <div class="py-3 flex justify-center align-center w-full border-b-2 border-gray-300">
                <slot name="header"></slot>
            </div>
            <div class="p-3">
                <slot name="content"></slot>
            </div>
            <div class="py-3 border-t-2 dark:border-gray-600 border-gray-300 bg-gray-50 flex justify-end space-x-2 rounded-b-md">
                <button class="flex rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-300" @click="closeDialog">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    {{ $t('cancel') }}
                </button>
                <slot name="footer"> </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: '550px',
    },
});

const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
}>();

const closeDialog = () => {
    emit('update:isOpen', false);
};
</script>

<style scoped>
/* Optionally, you can add custom styles here */
</style>
