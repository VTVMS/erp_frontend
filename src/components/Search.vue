<template>
    <div class="relative mt-1">
        <input type="text" v-model="inputValue" :placeholder="placeholder" class="border border-gray-300 rounded-lg pl-10 w-full py-1" @input="onInputChange" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Tìm kiếm ...',
    },
});

const emit = defineEmits(['update:searchQuery']); // To emit the search query to the parent

const inputValue = ref(''); // Holds the value of the search input
const debounceTimeout = ref<NodeJS.Timeout | null>(null); // Store for debouncing timeout

// Watch for changes in the input value to emit the updated query
const onInputChange = () => {
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
    }

    debounceTimeout.value = setTimeout(() => {
        emit('update:searchQuery', inputValue.value); // Emit the value to the parent
    }, 200); // Delay the search query update by 500ms
};
</script>

<style scoped>
/* You can style the input as per your requirements */
</style>
