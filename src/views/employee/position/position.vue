<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
            <ExpandablePanel :dataList="items" :handleAddFunc="handleOpenAddNewPosition" :handleUpdateFunc="handleOpenEditPosition" :handleDeleteFunc="handleOpenDeletePosition" />
        </div>
        <div class="col-span-9">
            <TableComponent :table="table" titleList="listEmployee">
                <template #customContent>
                    <div class="relative mt-1">
                        <input type="text" id="searchInput" placeholder="Tìm kiếm ..." class="border border-gray-300 rounded-lg pl-10 w-full py-1" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </template>
            </TableComponent>
        </div>
    </div>

    <Dialog :isOpen="isDialogPositionOpen" @update:isOpen="isDialogPositionOpen = $event" :width="'500px'">
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
          <div v-if="typeDialog === 'delete'">
            {{ $t('titleDelete') }}
          </div>
          <div v-else>
            <div v-if="typeDialog === 'add'">
              <CustomInput label="position_code" placeholder="enterYourPositionCode" id="position_code" required v-model="position_code" type="text" />
            </div>
            <CustomInput label="position_name" placeholder="enterYourPositionName" id="position_name" required v-model="position_name" type="text" />
            <CustomInput label="position_description" placeholder="enterYourPositionDescription" id="position_description" v-model="position_description" type="text" />
            <div v-if="typeDialog === 'add'">
              <div class="mt-2.5">
                <label for="department" class="block font-medium leading-6">
                  {{ $t('department') }}
                </label>
                <v-select
                    v-model="departmentSelected"
                    :options="departmentStore.departmentList.map(el => ({ label: el.name, value: el.department_uuid }))"
                />
              </div>
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
            <div v-if="typeDialog === 'delete'">
              <Button type="delete" @click="handleDeleteItem" />
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref,computed} from 'vue';
import TableComponent from '../../../components/Table.vue';
import Dialog from '../../../components/Dialog.vue';
import ExpandablePanel from '../../../components/ExpandablePanel.vue';
import CustomInput from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';
import { onMounted } from 'vue';
import { usePositionStore } from '../../../stores/position.store';
import { PositionModel } from "../../../model/position.model.ts";
import { useDepartmentStore } from "../../../stores/departmant.store.ts";
import { DepartmentModel } from "../../../model/departmant.model.ts";

const positionStore = usePositionStore();
const departmentStore = useDepartmentStore();

onMounted(async () => {
  await positionStore.listPositions();
  await departmentStore.listDepartments();
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
const position_code = ref('');
const position_name = ref('');
const position_description = ref('');
const departmentSelected = ref<DepartmentModel | null>(null);
const isDialogPositionOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const selectedRow = ref<PositionRowItem | null>(null);

const handleAddItem = async () => {
  if (departmentSelected.value) {
    await positionStore.createPosition({
      department_uuid: departmentSelected.value.value,
      name: position_name.value,
      position_code: position_code.value,
      description: position_description.value,
    });
  }
  isDialogPositionOpen.value = false;
};

const handleEditItem = async () => {
  if (selectedRow.value) {
    await positionStore.updatePosition(selectedRow.value?.id, {
      name: position_name.value,
      description: position_description.value,
    });
  }
  isDialogPositionOpen.value = false;
};

const handleDeleteItem = async () => {
  if (selectedRow.value) {
    await positionStore.deletePosition(selectedRow.value?.id);
  }
  isDialogPositionOpen.value = false;
};

interface PositionRowItem {
    id: string;
    code: string;
    name: string;
    description: string;
}

const items = computed(() => {
    return positionStore.positionList.map((position: PositionModel) => ({
        id: position.position_uuid,
        code: position.position_code || 'PB',
        name: position.name,
        description: position.description,
    }));
});

function handleOpenAddNewPosition() {
    typeDialog.value = 'add';
    isDialogPositionOpen.value = true;
}

function handleOpenEditPosition(row: PositionRowItem) {
    selectedRow.value = row;
    position_name.value = row.name;
    position_description.value = row.description;
    typeDialog.value = 'edit';
    isDialogPositionOpen.value = true;
}

function handleOpenDeletePosition(row: PositionRowItem) {
    selectedRow.value = row;
    typeDialog.value = 'delete';
    isDialogPositionOpen.value = true;
}
</script>
