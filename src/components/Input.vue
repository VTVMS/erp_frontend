<template>
    <div class="mt-2.5">
        <label :for="id" class="block text-base font-medium leading-6">
            {{ $t(label) }}
        </label>

        <div class="mt-2.5">
            <input
                v-if="type === 'text'"
                v-bind="$attrs"
                :id="id"
                v-model="inputValue"
                :type="type"
                :placeholder="$t(placeholder)"
                class="block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
            />
            <input
                v-if="type === 'date'"
                v-bind="$attrs"
                :id="id"
                v-model="inputValue"
                :type="type"
                :placeholder="$t(placeholder)"
                class="block w-full max-h-9 rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-30)] sm:text-sm sm:leading-6"
            />
            <!-- Image upload when type is 'img' -->
            <div v-if="type === 'img'" class="py-3 w-auto rounded-lg border border-dashed border-gray-900/25 dark:bg-gray-850 dark:border-gray-600">
                <div ref="container" class="text-gray-400 relative group min-w-16">
                    <div v-if="showImage">
                        <div class="relative w-20 h-20">
                            <img :src="image" alt="Preview" class="border border-gray-300 rounded-md object-cover" />
                            <button class="absolute top-0 right-0 text-gray-600" @click="removeFile">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <svg class="mx-auto h-20 w-20 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label for="file-upload" class="cursor-pointer rounded-full bg-gray-200 p-2 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            <input type="file" id="file-upload" name="file-upload" class="sr-only" @change="onFileChange" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: 'input',
    },
});

const emit = defineEmits<{
    (event: 'update:modelValue', value: string | number): void;
}>();

const inputValue = ref(props.modelValue);
const showImage = ref(false);
const image = ref<string | null>(null);

const onFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            image.value = reader.result as string;
            showImage.value = true;
            emit('update:modelValue', image.value);
        };
        reader.readAsDataURL(file);
    }
};

const removeFile = () => {
    image.value = null;
    showImage.value = false;
    emit('update:modelValue', '');
};
</script>

<style scoped>
/* Add your styles here */
</style>
