<template>
    <v-col :cols="cols" :md="md">
        <v-text-field v-model="modelValue" :counter="counter" :rules="rules" :label="label" :required="required"></v-text-field>
    </v-col>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

// Define props for reusability
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    rules: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    counter: {
        type: Number,
        default: 10,
    },
    cols: {
        type: [Number, String],
        default: 12,
    },
    md: {
        type: [Number, String],
        default: 4,
    },
});

// Emit update for v-model binding
const emit = defineEmits(['update:modelValue']);
</script>
