<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <ExpandablePanel :dataList="items" @add="handleAdd" @edit="handleEdit" @delete="handleDelete" />
        </div>
        <div class="col-span-9">
            <TableComponent :table="table" titleList="listEmployee">
                <template #customContent>
                    <button @click="openDialog('add')" type="button" class="inline-flex items-center text-gray-100 justify-center px-3 rounded-md py-1 text-basemarker: font-medium focus:outline-none bg-[#3b82f6] hover:scale-105 hover:shadow-lg transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        {{ $t('add') }}
                    </button>
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
                    <button
                        @click="openDialog('edit')"
                        type="button"
                        class="inline-flex items-center border text-gray-500 border-gray-400 justify-center px-1 rounded-md py-1 text-basemarker: font-medium focus:outline-none bg-gray-100 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button
                        @click="openDialog('delete')"
                        type="button"
                        class="inline-flex items-center border text-red-400 border-red-300 justify-center px-1 rounded-md py-1 text-basemarker: font-medium focus:outline-none bg-gray-100 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                    </button>
                </template>
            </TableComponent>
        </div>
    </div>

    <Dialog :isOpen="isDialogOpen" @update:isOpen="isDialogOpen = $event" :width="'450px'">
        <template #header>
            <div v-if="typeDialog === 'add'">
                <h1 class="text-2xl font-semibold flex items-center text-gray-800">
                    {{ $t('addAccount') }}
                </h1>
            </div>
            <div v-if="typeDialog === 'edit'">
                <h1 class="text-2xl font-semibold flex items-center text-gray-800">
                    {{ $t('editAccount') }}
                </h1>
            </div>
            <div v-if="typeDialog === 'delete'">
                <h1 class="text-2xl font-semibold flex items-center text-gray-800">
                    {{ $t('deleteAccount') }}
                </h1>
            </div>
        </template>
        <template #content>
            <div v-if="typeDialog === 'add'">
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
                <button @click="handleAddItem" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    {{ $t('save') }}
                </button>
            </div>
            <div v-if="typeDialog === 'edit'">
                <button @click="handleEditItem" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    {{ $t('save') }}
                </button>
            </div>
            <div v-if="typeDialog === 'delete'">
                <button @click="handleDeleteItem" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>

                    {{ $t('delete') }}
                </button>
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TableComponent from '@/components/Table.vue';
import Dialog from '@/components/Dialog.vue';
import ExpandablePanel from '@/components/ExpandablePanel.vue';

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

function sortData(field: string) {
    table.value.data.sort((a: any, b: any) => {
        const valueA = a[field]?.toString().toLowerCase() || '';
        const valueB = b[field]?.toString().toLowerCase() || '';
        return valueA.localeCompare(valueB);
    });
}

const positions = ref([
    { id: 1, position_name: 'Vị trí 1' },
    { id: 2, position_name: 'Vị trí 2' },
    { id: 3, position_name: 'Vị trí 3' },
]);

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
