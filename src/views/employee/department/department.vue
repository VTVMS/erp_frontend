<template>
    <TableComponent :table="table" titleList="listDepartment">
        <template #customContent>
            <Button type="add" @click="openDialog('add')" />
            <Search placeholder="placeSearch" @input="onSearchInput" />
        </template>
        <template #actions="{ row }">
            <Button type="actionEdit" @click="openDialog('edit')" />
            <Button type="actionDelete" @click="openDialog('delete', row.user_uuid)" />
        </template>
    </TableComponent>

    <Dialog :isOpen="isDialogOpen" @update:isOpen="isDialogOpen = $event" :width="'500px'">
        <template #header>
            <div v-if="typeDialog === 'add'">
                {{ $t('addAccount') }}
            </div>
            <div v-if="typeDialog === 'edit'">
                {{ $t('editAccount') }}
            </div>
            <div v-if="typeDialog === 'delete'">
                {{ $t('deleteAccount') }}
            </div>
        </template>
        <template #content>
            <div v-if="typeDialog === 'add'">
                <CustomInput label="name" placeholder="enterYourEmail" id="email" required v-model="full_name" type="text" />
                <CustomInput label="email" placeholder="enterYourEmail" id="email" required v-model="email" type="text" />
                <CustomInput label="password" placeholder="enterYourEmail" id="password" required v-model="password" type="text" />
                <SelectInput v-model="positions" :data="positions" label="authorities" id="positions" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <CustomInput label="name" placeholder="enterYourEmail" id="email" required v-model="full_name" type="text" />
                <CustomInput label="email" placeholder="enterYourEmail" id="email" required v-model="email" type="text" />
                <CustomInput label="password" placeholder="enterYourEmail" id="password" required v-model="password" type="text" />
                <SelectInput v-model="positions" :data="positions" label="authorities" id="positions" />
            </div>
            <div v-if="typeDialog === 'delete'">
                {{ $t('titleDelete') }}
            </div>
        </template>

        <template #footer>
            <div v-if="typeDialog === 'add'">
                <Button type="save" @click="handleAddItem" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <Button type="save" @click="handleEditItem" />
            </div>
            <div v-if="typeDialog === 'delete'">
                <Button type="delete" @click="handleDeleteItem" />
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { ref, computed } from 'vue';
import TableComponent from '../../../components/Table.vue';
import Dialog from '../../../components/Dialog.vue';
import CustomInput from '../../../components/Input.vue';
import Search from '../../../components/Search.vue';
import SelectInput from '../../../components/Select.vue';
import Button from '../../../components/Button.vue';
import { departmantStore } from '../../../stores/departmant.store';

const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const selectedRow = ref<Record<string, any> | null>(null);

const searchQuery = ref('');
const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const codeDepartment = ref('');
const name = ref('');
const quantity = ref('');

const deparStore = departmantStore()
onMounted(async () => {
  await deparStore.listUsers();
});

const table = ref({
    cols: [
        { title: 'codeDepartment', field: 'department_code', show: true, sort: true },
        { title: 'nameDepartment', field: 'name', show: true, sort: true },
        { title: 'quantityEmployee', field: 'quantity', show: true, sort: true },
    ],
    data: computed(() => {
        const departmentList = deparStore.departmentList.length ? deparStore.departmentList : [];
        return departmentList
            .filter((department) => {
                const searchTerm = searchQuery.value.toLowerCase();
                return department?.name?.toLowerCase().includes(searchTerm);
            })
            .map((department) => ({
                department_code: department?.department_code,
                name: department?.name,
                quantity: department?.quantity,
            }));
    }),
});

const updateSearchQuery = (query: string) => {
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
    }
    debounceTimeout.value = setTimeout(() => {
        searchQuery.value = query;
    }, 500);
};

const onSearchInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    updateSearchQuery(input.value);
};
const openDialog = (type: 'add' | 'edit' | 'delete', userOrRow?: Record<string, any>) => {
    typeDialog.value = type;
    isDialogOpen.value = true;

    if (userOrRow) {
        selectedRow.value = userOrRow;
        full_name.value = userOrRow.full_name || '';
        email.value = userOrRow.email || '';
        password.value = userOrRow.password || '';
        positions.value = userOrRow.role_uuid || '';
        user_uuid.value = userOrRow.user_uuid || '';
    } else {
        selectedRow.value = null;
        full_name.value = '';
        email.value = '';
        password.value = '';
        positions.value = 'f0c80740-2218-4757-b6af-4385a4dd90ca';
    }
};

const handleAddItem = async () => {
    await userStore.createUser({
        email: email.value,
        password: password.value,
        full_name: full_name.value,
        role_uuid: positions.value,
        is_create_new_employee: false,
    });
    isDialogOpen.value = false;
};

const handleEditItem = () => {
    if (selectedRow.value) {
        console.log('Deleting:', selectedRow.value);
        userStore.updateUser(selectedRow.value);
    }
    isDialogOpen.value = false;
};

const handleDeleteItem = () => {
    if (selectedRow.value) {
        console.log('Deleting:', selectedRow.value);
        userStore.deleteUser(selectedRow.value);
    }
    isDialogOpen.value = false;
};
</script>
