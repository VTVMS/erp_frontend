<template>
    <TableComponent :table="table" titleList="listDepartment">
        <template #customContent>
            <Button type="add" @click="openDialog('add')" />
            <Search placeholder="placeSearch" @input="onSearchInput" />
        </template>
        <template #actions="{ row }">
            <Button type="actionEdit" @click="openDialog('edit', row.department_uuid)" />
            <Button type="actionDelete" @click="openDialog('delete', row.department_uuid)" />
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
                <CustomInput label="codeDepartment" placeholder="enterYourEmail" id="email" required v-model="department_code" type="text" />
                <CustomInput label="nameDepartment" placeholder="enterYourEmail" id="name" required v-model="name" type="text" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <CustomInput label="codeDepartment" placeholder="enterYourEmail" id="email" required v-model="department_code" type="text" :disabled="true" />
                <CustomInput label="nameDepartment" placeholder="enterYourEmail" id="name" required v-model="name" type="text" />
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
import Button from '../../../components/Button.vue';
import { useDepartmentStore } from '../../../stores/departmant.store';

const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const selectedRow = ref<Record<string, any> | null>(null);

const searchQuery = ref('');
const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const department_code = ref('');
const name = ref('');
const organization_uuid = ref('');
const department_uuid = ref('');
const deparStore = useDepartmentStore();

onMounted(async () => {
    await deparStore.listDepartments();
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
                department_uuid: department?.department_uuid,
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
const openDialog = (type: 'add' | 'edit' | 'delete', uuid?: string) => {
    typeDialog.value = type;
    isDialogOpen.value = true;

    if (uuid) {
        if (type === 'delete') {
            department_uuid.value = uuid;
            return;
        }
        const departmentOrRow = deparStore.departmentList.find((department) => department.department_uuid === uuid);
        selectedRow.value = departmentOrRow;
        department_uuid.value = departmentOrRow.department_uuid;
        department_code.value = departmentOrRow.department_code;
        name.value = departmentOrRow.name;
    } else {
        selectedRow.value = null;
        department_uuid.value = '';
        department_code.value = '';
        organization_uuid.value = '78b25f94-7acc-4fc7-8c0e-4d5aa908ddde';
        name.value = '';
    }
};

const handleAddItem = async () => {
    await deparStore.createDepartment({
        department_code: department_code.value,
        name: name.value,
        organization_uuid: '78b25f94-7acc-4fc7-8c0e-4d5aa908ddde',
    });
    isDialogOpen.value = false;
};

const handleEditItem = async () => {
    if (department_uuid.value) {
        await deparStore.updateDepartment(department_uuid.value, {
            department_code: department_code.value,
            name: name.value,
        });
    }
    isDialogOpen.value = false;
};

const handleDeleteItem = async () => {
    if (department_uuid.value) {
        await deparStore.deleteDepartment(department_uuid.value, {
            status: status.value,
        });
    }
    isDialogOpen.value = false;
};
</script>
