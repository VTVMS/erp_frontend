<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <CustomTextField v-model="firstname" :rules="nameRules" label="First name" :required="true" :counter="10" />
                <CustomTextField v-model="lastname" :rules="nameRules" label="Last name" :required="true" :counter="10" />
                <CustomTextField v-model="email" :rules="emailRules" label="E-mail" :required="true" />
            </v-row>
        </v-container>
    </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomTextField from './CustomFile.vue';

const valid = ref(false);
const firstname = ref('');
const lastname = ref('');
const nameRules = [
    (value: string) => {
        if (value) return true;
        return 'Name is required.';
    },
    (value: string) => {
        if (value?.length <= 10) return true;
        return 'Name must be less than 10 characters.';
    },
];

const email = ref('');
const emailRules = [
    (value: string) => {
        if (value) return true;
        return 'E-mail is required.';
    },
    (value: string) => {
        if (/.+@.+\..+/.test(value)) return true;
        return 'E-mail must be valid.';
    },
];
</script>
