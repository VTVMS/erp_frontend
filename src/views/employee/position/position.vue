<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
            <ExpandablePanel :dataList="items" @add="handleAdd" @edit="handleEdit" @delete="handleDelete" />
        </div>
        <div class="col-span-9">
            <TableComponent :table="table" titleList="listEmployee">
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
        </div>
    </div>

    <Dialog :isOpen="isDialogOpen" @update:isOpen="isDialogOpen = $event" :width="'450px'">
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
                <CustomInput v-model="name" type="text" label="name" placeholder="name" />
                <CustomInput v-model="email" type="text" label="email" placeholder="email" />
                <SelectInput v-model="authorities" :data="positions" label="authorities" id="authorities" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <div class="">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('name') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Nhập họ và tên ..."
                        />
                    </div>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('email') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Nhập thông tin email ..."
                        />
                    </div>
                </div>
                <div class="mt-2.5">
                    <label for="position" class="block text-base font-medium leading-6">{{ $t('authorities') }}</label>
                    <select
                        id="position"
                        v-model="selectPosition"
                        name="user"
                        autocomplete="country-name"
                        class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                    >
                        <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                            {{ position.position_name }}
                        </option>
                    </select>
                </div>
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

<script lang="ts" setup>
import { ref } from 'vue';
import TableComponent from '../../../components/Table.vue';
import Dialog from '../../../components/Dialog.vue';
import ExpandablePanel from '../../../components/ExpandablePanel.vue';
import Button from '../../../components/Button.vue';
import CustomInput from '../../../components/Input.vue';
import SelectInput from '../../../components/Select.vue';
const table = ref({
    cols: [
        { title: 'name', field: 'name', show: true, sort: true },
        { title: 'email', field: 'email', show: true, sort: true },
        { title: 'createEmployee', field: 'createEmployee', show: true, sort: true },
        { title: 'createDate', field: 'createDate', show: true, sort: true },
    ],
    data: [
        {
            name: 'John Doe',
            email: 'Stock updated',
            createEmployee: 'John Doe',
            createDate: '2024-01-01',
        },
    ],
});

const name = ref('');
const email = ref('');
const authorities = ref('');
const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const newItem = ref('');
const editedItem = ref('');

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

const selectPosition = ref('');

interface DataItem {
    id: number;
    code: string;
    name: string;
}

const items: DataItem[] = [
    { id: 1, code: 'P001', name: 'Manager' },
    { id: 2, code: 'P002', name: 'Developer' },
    { id: 3, code: 'P003', name: 'Designer' },
    { id: 11, code: 'P004', name: 'Manager' },
    { id: 22, code: 'P0025', name: 'Developer' },
    { id: 33, code: 'P0036', name: 'Designer' },
    { id: 14, code: 'P0017', name: 'Manager' },
    { id: 25, code: 'P0028', name: 'Developer' },
    { id: 36, code: 'P0039', name: 'Designer' },
    { id: 17, code: 'P0010', name: 'Manager' },
    { id: 27, code: 'P0021', name: 'Developer' },
    { id: 38, code: 'P0032', name: 'Designer' },
    { id: 19, code: 'P0013', name: 'Manager' },
    { id: 20, code: 'P0024', name: 'Developer' },
    { id: 31, code: 'P0035', name: 'Designer' },

    { id: 12, code: 'P0016', name: 'Manager' },
    { id: 23, code: 'P0027', name: 'Developer' },
    { id: 34, code: 'P0038', name: 'Designer' },
    { id: 15, code: 'P0019', name: 'Manager' },
    { id: 26, code: 'P0020', name: 'Developer' },
    { id: 37, code: 'P0031', name: 'Designer' },
    { id: 18, code: 'P0012', name: 'Manager' },
    { id: 29, code: 'P0023', name: 'Developer' },
    { id: 30, code: 'P0034', name: 'Designer' },
    { id: 19, code: 'P0015', name: 'Manager' },
    { id: 28, code: 'P0026', name: 'Developer' },
    { id: 37, code: 'P0037', name: 'Designer' },

    { id: 61, code: 'P0018', name: 'Manager' },
    { id: 28, code: 'P0029', name: 'Developer' },
    { id: 83, code: 'P0030', name: 'Designer' },
    
];

function handleAdd() {
    console.log('Add clicked');
}

function handleEdit(row: DataItem) {
    console.log('Edit clicked', row);
}

function handleDelete(row: DataItem) {
    console.log('Delete clicked', row);
}
</script>
