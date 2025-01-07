<script lang="ts" setup>
import { ref } from 'vue';
import TableComponent from '../../../components/Table.vue';
import Dialog from '../../../components/Dialog.vue';
import CustomInput from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';

const table = ref({
    cols: [
        { title: 'avatar', field: 'avatar', type: 'img', show: true, sort: true },
        { title: 'codeDepartment', field: 'codeDepartment', show: true, sort: true },
        { title: 'nameDepartment', field: 'nameDepartment', show: true, sort: true },
        { title: 'quantityEmployee', field: 'quantityEmployee', show: true, sort: true },
    ],
    data: [
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeDepartment: 'PBOO1',
            nameDepartment: 'Phòng nhân sự',
            quantityEmployee: '5',
        },
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeDepartment: 'PB002',
            nameDepartment: 'Phòng kỹ thuật',
            quantityEmployee: '20',
        },
    ],
});
const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const newItem = ref('');
const editedItem = ref('');

const avatar = ref('');
const codeDepartment = ref('');
const nameDepartment = ref('');
const quantityEmployee = ref('');

const openDialog = (type: 'add' | 'edit' | 'delete') => {
    typeDialog.value = type;
    isDialogOpen.value = true;
};

const handleAddItem = () => {
    console.log('Adding item:', newItem.value);
};

const handleEditItem = () => {
    console.log('Editing item:', editedItem.value);
};

const handleDeleteItem = () => {
    console.log('Deleting item');
    // Logic for deleting item
};

const positions = [
    { id: 1, name: 'select 1' },
    { id: 2, name: 'select 2' },
    { id: 3, name: 'select 3' },
];
</script>

<template>
    <TableComponent :table="table" titleList="listDepartment">
        <template #customContent>
            <Button type="add" @click="openDialog('add')" />

            <div class="relative mt-1">
                <input type="text" id="searchInput" placeholder="Tìm kiếm ..." class="border border-gray-300 rounded-lg pl-10 w-full py-1" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
        </template>
        <template #actions="{ row }">
            <Button type="actionEdit" @click="openDialog('edit')" />
            <Button type="actionDelete" @click="openDialog('delete')" />
        </template>
    </TableComponent>

    <Dialog :isOpen="isDialogOpen" @update:isOpen="isDialogOpen = $event" :width="'450px'">
        <template #header>
            <div v-if="typeDialog === 'add'">
                {{ $t('addDepartment') }}
            </div>
            <div v-if="typeDialog === 'edit'">
                {{ $t('editDepartment') }}
            </div>
            <div v-if="typeDialog === 'delete'">
                {{ $t('deleteDepartment') }}
            </div>
        </template>
        <template #content>
            <div v-if="typeDialog === 'add'">
                <CustomInput v-model="codeDepartment" type="text" label="codeDepartment" placeholder="codeDepartment" />
                <CustomInput v-model="nameDepartment" type="text" label="nameDepartment" placeholder="nameDepartment" />
                <CustomInput v-model="avatar" type="img" label="avatar" placeholder="Choose an image" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <CustomInput v-model="codeDepartment" type="text" label="codeDepartment" placeholder="codeDepartment" />
                <CustomInput v-model="nameDepartment" type="text" label="nameDepartment" placeholder="nameDepartment" />
                <CustomInput v-model="avatar" type="img" label="avatar" placeholder="Choose an image" />
            </div>
            <div v-if="typeDialog === 'delete'">
                <p>{{ $t('titleDelete') }}</p>
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
