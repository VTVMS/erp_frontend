<script lang="ts" setup>
import { ref } from 'vue';
import TableComponent from '@/components/Table.vue';
import Dialog from '@/components/Dialog.vue';
import CustomInput from '@/components/Input.vue';
import SelectInput from '@/components/Select.vue';
import Button from '@/components/Button.vue';

const table = ref({
    cols: [
        { title: 'avatar', field: 'avatar', type: 'img', show: true, sort: true },
        { title: 'codeEmployee', field: 'codeEmployee', show: true, sort: true },
        { title: 'name', field: 'name', show: true, sort: true },
        { title: 'department', field: 'department', show: true, sort: true },
        { title: 'position', field: 'position', show: true, sort: true },
        { title: 'phone', field: 'phone', show: true, sort: true },
        { title: 'email', field: 'email', show: true, sort: true },
    ],
    data: [
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeEmployee: 'dStock',
            name: 'John Doe',
            department: 'IT',
            position: 'Manager',
            phone: '12345',
            email: 'johndoe@example.com',
        },
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeEmployee: 'aStock',
            name: 'Jane Doe',
            department: 'HR',
            position: 'Assistant',
            phone: '67890',
            email: 'janedoe@example.com',
        },
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeEmployee: 'cStock',
            name: 'Alice Smith',
            department: 'Sales',
            position: 'Lead',
            phone: '11223',
            email: 'alicesmith@example.com',
        },
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeEmployee: 'dStock',
            name: 'Bob Johnson',
            department: 'Marketing',
            position: 'Coordinator',
            phone: '44556',
            email: 'bobjohnson@example.com',
        },
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeEmployee: 'vStock updated',
            name: 'bJohn Doe',
            department: '2024-01-01',
            position: 'Stock updated',
            phone: 'John Doe',
            email: '2024-01-01',
        },
    ],
});
const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const newItem = ref('');
const editedItem = ref('');

const avatar = ref('');
const password = ref('');
const name = ref('');
const sex = ref('');
const birthday = ref('');
const position = ref('');
const phone = ref('');
const email = ref('');
const employeeApprove = ref('');

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

// function sortData(field: string) {
//     table.value.data.sort((a: any, b: any) => {
//         const valueA = a[field]?.toString().toLowerCase() || '';
//         const valueB = b[field]?.toString().toLowerCase() || '';
//         return valueA.localeCompare(valueB);
//     });
// }

const positions = [
    { id: 1, name: 'select 1' },
    { id: 2, name: 'select 2' },
    { id: 3, name: 'select 3' },
];
</script>

<template>
    <TableComponent :table="table" titleList="listEmployee">
        <template #customContent>
            <Button type="add" @click="openDialog('add')" />

            <div class="relative mt-1">
                <input type="text" id="searchInput" placeholder="Tìm kiếm ..." class="border border-gray-300 rounded-lg pl-10 w-full py-1" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <div class="dropdown-nav">
                <div class="dropdown-nav group relative">
                    <div class="dropdown-toggle-nav">
                        <div class="w-full flex justify-center border rounded-md bg-gray-200 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div class="dropdown-content-nav border min-w-44 rounded-md right-0 absolute bg-gray-100 text-gray-800 shadow hidden group-hover:block z-50 p-2">
                        <div class="flex flex-col justify-center space-y-2">
                            <button type="button" class="inline-flex items-center border text-gray-700 justify-center min-w-40 rounded-md py-2 text-sm font-medium focus:outline-none bg-gray-200 hover:bg-gray-300" @click="sortData('checkStockCode')">
                                <svg class="size-6 mr-1" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" fill="#000000">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="23" y1="26.1" x2="23" y2="5"></line>
                                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="18.7,21.8 23,26.1 27.3,21.8 "></polyline>
                                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="12,15 12,14 9.1,6 8.9,6 6,14 6,15 "></polyline>
                                        <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="6" y1="12" x2="12" y2="12"></line>
                                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="5,18 12,18 12,19 6,25 6,26 13,26 "></polyline>
                                    </g>
                                </svg>
                                {{ $t('sort') }} A
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                Z
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #actions="{ row }">
            <Button type="actionEdit" @click="openDialog('edit')" />
            <Button type="actionDelete" @click="openDialog('delete')" />
        </template>
    </TableComponent>

    <Dialog :isOpen="isDialogOpen" @update:isOpen="isDialogOpen = $event" :width="'700px'">
        <template #header>
            <div v-if="typeDialog === 'add'">
                {{ $t('addEmployee') }}
            </div>
            <div v-if="typeDialog === 'edit'">
                {{ $t('editEmployee') }}
            </div>
            <div v-if="typeDialog === 'delete'">
                {{ $t('deleteEmployee') }}
            </div>
        </template>
        <template #content>
            <div v-if="typeDialog === 'add'">
                <CustomInput v-model="name" type="text" label="name" placeholder="name" />
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <CustomInput v-model="password" type="text" label="password" placeholder="password" />
                    <SelectInput v-model="position" :data="positions" label="position" id="position" />
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <CustomInput v-model="email" type="text" label="email" placeholder="email" />
                    <CustomInput v-model="phone" type="text" label="phone" placeholder="phone" />
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <SelectInput v-model="sex" :data="positions" label="sex" id="sex" />
                    <CustomInput v-model="birthday" type="date" label="birthday" placeholder="birthday" />
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <SelectInput v-model="positions" :data="positions" label="department" id="department" />
                    <CustomInput v-model="employeeApprove" type="text" label="employeeApprove" placeholder="employeeApprove" />
                </div>
                <CustomInput v-model="avatar" type="img" label="avatar" placeholder="Choose an image" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <CustomInput v-model="name" type="text" label="name" placeholder="name" />
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <CustomInput v-model="password" type="text" label="password" placeholder="password" />
                    <SelectInput v-model="position" :data="positions" label="position" id="position" />
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <CustomInput v-model="email" type="text" label="email" placeholder="email" />
                    <CustomInput v-model="phone" type="text" label="phone" placeholder="phone" />
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <SelectInput v-model="sex" :data="positions" label="sex" id="sex" />
                    <CustomInput v-model="birthday" type="date" label="birthday" placeholder="birthday" />
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <SelectInput v-model="positions" :data="positions" label="department" id="department" />
                    <CustomInput v-model="employeeApprove" type="text" label="employeeApprove" placeholder="employeeApprove" />
                </div>
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
