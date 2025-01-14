<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
            <ExpandablePanel :dataList="items" @add="handleAdd" @edit="handleEdit" @delete="handleDelete" />
        </div>
       
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TableComponent from '../../../components/Table.vue';
import Dialog from '../../../components/Dialog.vue';
import ExpandablePanel from '../../../components/ExpandablePanel.vue';
import Button from '../../../components/Button.vue';
import CustomInput from '../../../components/Input.vue';
import { onMounted } from 'vue';
import SelectInput from '../../../components/Select.vue';
import { positionStore } from '../../../stores/position.store';
const posiStore = positionStore();

onMounted(async () => {
  await posiStore.listPosition();  // Call the action to fetch users
  console.log(posiStore.listPosition);  // Log the user list after it has been fetched
});
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
