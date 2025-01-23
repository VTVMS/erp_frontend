<template>
    <TableComponent :table="table" titleList="channel">
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
                <CustomInput label="codeDepartment" placeholder="enterYourEmail" id="email" required v-model="name" type="text" />
                <CustomInput label="nameDepartment" placeholder="enterYourEmail" id="name" required v-model="description" type="text" />
            </div>
            <div v-if="typeDialog === 'edit'">
                <CustomInput label="codeDepartment" placeholder="enterYourEmail" id="email" required v-model="name" type="text" />
                <CustomInput label="nameDepartment" placeholder="enterYourEmail" id="name" required v-model="description" type="text" />
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
import { ChannelStore } from '../../../stores/channel.store';

const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const selectedRow = ref<Record<string, any> | null>(null);

const searchQuery = ref('');
const debounceTimeout = ref<NodeJS.Timeout | null>(null);

const v = ref('');
const name = ref('');
const description = ref('');
const channel_uuid = ref('');
const channelStore = ChannelStore();

onMounted(async () => {
    await channelStore.listChannel();
});

const table = ref({
    cols: [
        { title: 'nameChannel', field: 'name', show: true, sort: true },
        { title: 'description', field: 'description', show: true, sort: true },
    ],
    data: computed(() => {
        const channelList = channelStore.channelList.length ? channelStore.channelList : [];
        return channelList
            .filter((department) => {
                const searchTerm = searchQuery.value.toLowerCase();
                return department?.name?.toLowerCase().includes(searchTerm);
            })
            .map((department) => ({ name: department?.name, description: department?.description }));
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
          channel_uuid.value = uuid;
            return;
        }
        const departmentOrRow = deparStore.departmentList.find((channel) => channel.channel_uuid === uuid);
        selectedRow.value = departmentOrRow;
        channel_uuid.value = departmentOrRow.channel_uuid;
        name.value = departmentOrRow.name;
        description.value = departmentOrRow.description;
    } else {
        selectedRow.value = null;
        channel_uuid.value = '';
        name.value = '';
        description.value = '';
    }
};

const handleAddItem = async () => {
    await channelStore.createChannel({
        description: description.value,
        name: name.value,
    });
    isDialogOpen.value = false;
};

// const handleEditItem = async () => {
//     if (department_uuid.value) {
//         await deparStore.updateDepartment(department_uuid.value, {
//             department_code: department_code.value,
//             name: name.value,
//         });
//     }
//     isDialogOpen.value = false;
// };

// const handleDeleteItem = async () => {
//     if (department_uuid.value) {
//         await deparStore.deleteDepartment(department_uuid.value, {
//             status: status.value,
//         });
//     }
//     isDialogOpen.value = false;
// };
</script>
