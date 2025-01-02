<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 rounded-md shadow-2xl">
        <div :style="{ width: width || '550px' }" class="bg-white rounded-2xl shadow-lg px-4">
            <div class="py-3 flex justify-center align-center w-full border-b-2 border-gray-300">
                <div class="text-2xl font-semibold flex items-center text-gray-800"><slot name="header"></slot></div>
            </div>
            <div class="mt-3 pb-4">
                <slot name="content"></slot>
            </div>
            <div class="py-3 px-4 border-t-2 dark:border-gray-600 border-gray-300 flex justify-end space-x-2 rounded-b-md">
                <Button type="cancel" @click="closeDialog" />
                <slot name="footer"> </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue';

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
