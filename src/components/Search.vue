<script lang="ts" setup>
import { defineProps } from 'vue';

// Định nghĩa props
defineProps({
    placeholder: {
        type: String,
        default: 'Tìm kiếm ...',
    },
    onInput: {
        type: Function,
        required: true,
    },
});
</script>

<template>
    <div class="relative mt-1">
        <!-- Input -->
        <input type="text" :placeholder="$t(placeholder)" class="border border-gray-300 rounded-lg pl-10 w-full py-1" @input="(e) => onInput(e)" />
        <!-- Search Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    </div>
</template>
