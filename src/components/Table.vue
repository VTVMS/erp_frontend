<template>
    <div>
        <!-- Button to show dropdown -->
        <div class="relative" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
            <button class="px-4 bg-blue-500 text-white rounded">Toggle Columns</button>

            <!-- Dropdown with checkboxes to toggle columns visibility -->
            <div v-if="showDropdown" class="absolute bg-white border shadow-lg rounded w-48 z-10" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
                <div class="p-4">
                    <div v-for="col in props.table.cols" :key="col.field" class="flex items-center mb-2">
                        <input type="checkbox" v-model="col.show" :id="col.field" class="mr-2" />
                        <label :for="col.field">{{ col.title }}</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table displaying data -->
        <div class="relative overflow-x-auto mt-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <!-- Hiển thị các cột có show = true -->
                        <th v-for="col in visibleCols" :key="col.field" scope="col" class="px-6 py-3">
                            {{ col.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in props.table.data" :key="rowIndex" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td v-for="col in visibleCols" :key="col.field" class="px-6 py-4">
                            <span v-if="col.field === 'index'">{{ rowIndex + 1 }}</span>
                            <span v-if="col.type === 'date'">{{ formatDate(row[col.field]) }}</span>
                            <span v-if="col.type === 'action'">
                                <button v-for="(action, actionIndex) in row.actions" :key="actionIndex" @click="handleAction(action, row)" class="text-blue-600 hover:text-blue-900 px-4 py-2 mx-2 rounded border border-blue-600">
                                    {{ action.label }}
                                </button>
                            </span>
                            <span v-if="col.type !== 'action' && col.type !== 'date'">{{ row[col.field] }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits, ref } from 'vue';

type TableColumn = {
    title: string;
    field: string;
    show: boolean;
    sort?: boolean;
    type?: string; // e.g., "action", "date"
};

type TableData = {
    [key: string]: any;
};

const props = defineProps<{
    table: {
        cols: TableColumn[];
        data: TableData[];
    };
}>();

const emit = defineEmits<{
    (event: 'action-clicked', action: string, row: TableData): void;
}>();

const showDropdown = ref(false);

// Filter visible columns (chỉ lấy những cột có show = true)
const visibleCols = computed(() => props.table.cols.filter((col) => col.show));

// Handle action click
function handleAction(action: { label: string; type: string }, row: TableData) {
    emit('action-clicked', action.type, row);
}

// Format date
function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
}


</script>

<style scoped>
/* Optional: Style for the dropdown */
.relative {
    position: relative;
}
</style>
