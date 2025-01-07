<template>
    <TableComponent :table="table" titleList="listAccount">
        <template #customContent>
            <button @click="openDialog('add')" type="button" class="inline-flex items-center text-gray-100 justify-center px-3 rounded-md py-1 text-basemarker: font-medium focus:outline-none bg-[#3b82f6] hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {{ $t('add') }}
            </button>
            <div class="relative mt-1">
                <input type="text" id="searchInput" placeholder="Tìm kiếm ..." class="border border-gray-300 rounded-lg pl-10 w-full py-1" @input="onSearchInput" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
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
                <CustomInput label="name" placeholder="enterYourEmail" id="email" required v-model="full_name" type="text" />
                <CustomInput label="email" placeholder="enterYourEmail" id="email" required v-model="email" type="text" />
                <CustomInput label="password" placeholder="enterYourEmail" id="password" required v-model="password" type="text" />
                <SelectInput v-model="positions" :data="positions" label="position" id="positions" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <CustomInput label="name" placeholder="enterYourEmail" id="email" required v-model="full_name" type="text" />
                <CustomInput label="email" placeholder="enterYourEmail" id="email" required v-model="email" type="text" />
                <CustomInput label="password" placeholder="enterYourEmail" id="password" required v-model="password" type="text" />
                <SelectInput v-model="positions" :data="positions" label="position" id="positions" />
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
import { onMounted } from 'vue';
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import TableComponent from '../../../components/Table.vue';
import Dialog from '../../../components/Dialog.vue';
import CustomInput from '../../../components/Input.vue';
import SelectInput from '../../../components/Select.vue';
import { useUserStore } from '../../../stores/user.store';

const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const editedItem = ref('');
const selectedUser = ref(null);

const searchQuery = ref(''); 
const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const full_name = ref('');
const email = ref('');
const password = ref('');
const positions = ref('f0c80740-2218-4757-b6af-4385a4dd90ca');

const userStore = useUserStore();

onMounted(() => {
    userStore.listUsers();
    console.log(userStore.listUsers());
    
});

const table = ref({
    cols: [
        { title: 'name', field: 'full_name', show: true, sort: true },
        { title: 'email', field: 'email', show: true, sort: true },
        { title: 'createEmployee', field: 'createEmployee', show: true, sort: true },
        { title: 'createDate', field: 'created_at', show: true, sort: true },
        { title: 'status', field: 'status', show: true, sort: true },

    ],
    data: computed(() => {
        // Filter the user list based on the search query
        return userStore.userList
            .filter((user) => {
                const searchTerm = searchQuery.value.toLowerCase();
                return user?.full_name?.toLowerCase().includes(searchTerm) || user?.email?.toLowerCase().includes(searchTerm);
            })
            .map((user) => ({
                full_name: user?.full_name ?? 'Đang cập nhật...',
                email: user?.email ?? 'Đang cập nhật...',
                createEmployee: user?.createEmployee ?? 'Đang cập nhật...',
                created_at: user?.created_at ? format(new Date(user.created_at), 'dd/MM/yyyy') : 'Đang cập nhật...',
                status: user?.status ?? 'Đang cập nhật...',

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

const openDialog = (type: 'add' | 'edit' | 'delete', user?: any) => {
    typeDialog.value = type;
    selectedUser.value = user;

    if (type === 'edit' || type === 'delete') {
        selectedUser.value = user;
        full_name.value = user.full_name;
        email.value = user.email;
        password.value = user.password;
        positions.value = user.role_uuid;
    } else {
        full_name.value = '';
        email.value = '';
        positions.value = 'f0c80740-2218-4757-b6af-4385a4dd90ca';
        password.value = '';
    }
    isDialogOpen.value = true;
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
    console.log('Editing item:', editedItem.value);
};

const handleDeleteItem = () => {
  if (selectedUser.value) {
    userStore.deleteUser(selectedUser.value.user_id);
  }
  isDialogOpen.value = false;
};
</script>
