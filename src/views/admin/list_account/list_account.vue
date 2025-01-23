<template>
    <TableComponent :table="table" titleList="listAccount">
        <template #customContent>
            <Button type="add" @click="openDialog('add')" />
            <Search placeholder="placeSearch" @input="onSearchInput" />
        </template>
        <template #actions="{ row }">
            <Button type="actionEdit" @click="openDialog('edit', row.user_uuid)" />
            <div v-if="row.status">
                <Button type="actionLock" @click="openDialog('lock', row.user_uuid)" />
            </div>
            <div v-else>
                <Button type="actionUnLock" @click="openDialog('unlock', row.user_uuid)" />
            </div>
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
            <div v-if="typeDialog === 'lock'">
                {{ $t('lockAccount') }}
            </div>
            <div v-if="typeDialog === 'unlock'">
                {{ $t('unLockAccount') }}
            </div>
        </template>
        <template #content>
            <div v-if="typeDialog === 'lock'">
                {{ $t('titleLockAccount') }}
            </div>
            <div v-else-if="typeDialog === 'unlock'">
                {{ $t('titleUnLockAccount') }}
            </div>
            <div v-else>
                <CustomInput label="name" placeholder="enterYourEmail" id="email" required v-model="full_name" type="text" />
                <CustomInput label="email" placeholder="enterYourEmail" id="email" required v-model="email" type="text" />
                <CustomInput label="password" placeholder="enterYourEmail" id="password" required v-model="password" type="text" />
                <div class="mt-2.5">
                    <label for="role" class="block font-medium leading-6">
                        {{ $t('authorities') }}
                    </label>
                    <v-select v-model="roleSelected" :options="roleStore.roles.map((el) => ({ label: roleName[el.name], value: el.role_uuid }))" />
                </div>
            </div>
        </template>

        <template #footer>
            <div v-if="typeDialog === 'add'">
                <Button type="save" @click="handleAddItem" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <Button type="save" @click="handleEditItem" />
            </div>
            <div v-if="typeDialog === 'lock'">
                <Button type="lockAcc" @click="handleLockItem" />
            </div>
            <div v-if="typeDialog === 'unlock'">
                <Button type="unlockAcc" @click="handleUnLockItem" />
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
import Button from '../../../components/Button.vue';
import { useUserStore } from '../../../stores/user.store';
import { useRoleStore } from '../../../stores/role.store.ts';
import { getKeyByValue, roleName } from '../../../common/reuse.ts';

const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'lock' | 'unlock'>('add');
const selectedRow = ref<Record<string, any> | null>(null);

const searchQuery = ref('');
const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const full_name = ref('');
const email = ref('');
const roleSelected = ref('');
const password = ref('');
const user_uuid = ref('');

const userStore = useUserStore();
const roleStore = useRoleStore();

onMounted(async () => {
    await userStore.listUsers();
    await roleStore.listRoles();
});

const table = ref({
    cols: [
        { title: 'name', field: 'full_name', show: true, sort: true },
        { title: 'email', field: 'email', show: true, sort: true },
        { title: 'createEmployee', field: 'createEmployee', show: true, sort: true },
        { title: 'createDate', field: 'created_at', type: 'date', show: true, sort: true },
        { title: 'status', field: 'status', type: 'status', show: true, sort: true },
    ],
    data: computed(() => {
        const userList = userStore.userList.length ? userStore.userList : [];
        return userList
            .filter((user) => {
                const searchTerm = searchQuery.value.toLowerCase();
                return user?.full_name?.toLowerCase().includes(searchTerm);
            })
            .map((user) => ({
                user_uuid: user?.user_uuid,
                full_name: user?.full_name,
                email: user?.email,
                createEmployee: user?.createEmployee,
                created_at: user?.created_at,
                status: user?.status,
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

const openDialog = (type: 'add' | 'edit' | 'lock' | 'unlock', uuid?: string) => {
    typeDialog.value = type;
    isDialogOpen.value = true;

    if (uuid) {
        if (type === 'lock' || type === 'unlock') {
            user_uuid.value = uuid;
            return;
        }
        const userOrRow = userStore.userList.find((user) => user.user_uuid === uuid);
        selectedRow.value = userOrRow;
        full_name.value = userOrRow?.full_name || '';
        email.value = userOrRow?.email || '';
        password.value = '';
        roleSelected.value = getKeyByValue(roleName, userOrRow?.role?.name) || '';
        user_uuid.value = userOrRow?.user_uuid || '';
    } else {
        selectedRow.value = null;
        full_name.value = '';
        email.value = '';
        password.value = '';
        roleSelected.value = '';
    }
};

const handleAddItem = async () => {
    await userStore.createUser({
        email: email.value,
        password: password.value,
        full_name: full_name.value,
        role_uuid: roleSelected.value.value,
    });
    isDialogOpen.value = false;
};

const handleEditItem = async () => {
    if (user_uuid.value) {
        await userStore.updateUser(user_uuid.value, {
            full_name: full_name.value,
            role_uuid: roleSelected.value.value,
        });
    }
    isDialogOpen.value = false;
};

const handleLockItem = async () => {
    if (user_uuid.value) {
        await userStore.handleStatusAccountOfUser(user_uuid.value, { status: 0 });
    }
    isDialogOpen.value = false;
};

const handleUnLockItem = async () => {
    if (user_uuid.value) {
        await userStore.handleStatusAccountOfUser(user_uuid.value, { status: 1 });
    }
    isDialogOpen.value = false;
};
</script>
