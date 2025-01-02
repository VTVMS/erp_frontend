<template>
    <div class="mt-2.5">
        <label :for="id" class="block text-base font-medium leading-6">
            {{ $t(label) }}
        </label>
        <select
            v-bind="$attrs"
            :id="id"
            v-model="selectedValue"
            :name="name"
            :autocomplete="autocomplete"ƒ
            class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
        >
            <option v-for="data in data" :key="data.id" :value="JSON.stringify(data)">
                {{ data.name }}
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, computed } from 'vue';

// Define props
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    data: {
        type: Array,
        default: () => [],
    },
    value: {
        type: [String, Object],
        default: '',
    },
    id: {
        type: String,
        default: 'data',
    },
    name: {
        type: String,
        default: 'user',
    },
    autocomplete: {
        type: String,
        default: 'country-name',
    },
});

// Define emits
const emit = defineEmits<{
    (event: 'update:value', value: string | object): void;
}>();

const { label, data, value, id, name, autocomplete } = toRefs(props);

const selectedValue = computed({
    get: () => value.value,
    set: (newValue) => {
        emit('update:value', newValue);
    },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
