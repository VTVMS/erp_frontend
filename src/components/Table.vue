<script lang="ts" setup>
import { computed, ref } from 'vue';
import * as XLSX from 'xlsx';

// Props
const props = defineProps({
    table: {
        type: Object,
        required: true,
    },
    titleList: {
        type: String,
        required: false,
        default: '',
    },
});

// Lọc các cột được hiển thị
const visibleCols = computed(() => {
    const cols = [...props.table.cols.filter((col) => col.show)];
    // Thêm cột 'STT' và 'Actions' vào danh sách cột hiển thị
    if (!cols.some((col) => col.field === 'index')) {
        cols.unshift({ title: 'STT', field: 'index', show: true });
    }
    if (!cols.some((col) => col.field === 'action')) {
        cols.push({ title: 'Actions', field: 'action', show: true });
    }
    return cols;
});

// Phân trang
const currentPage = ref(1); // Trang hiện tại
const rowsPerPage = ref(20); // Số hàng mỗi trang
const totalPages = computed(() => Math.ceil(props.table.data.length / rowsPerPage.value));

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return props.table.data.slice(start, end);
});

function downloadExcel() {
    const wsData = [];

    // Lọc các cột để loại bỏ cột 'STT' và 'Actions'
    const headers = visibleCols.value.filter((col) => col.field !== 'index' && col.field !== 'action').map((col) => col.title);

    wsData.push(headers);

    // Thêm dữ liệu từ bảng vào (loại bỏ 'STT' và 'Actions')
    paginatedData.value.forEach((row) => {
        const rowData = visibleCols.value.filter((col) => col.field !== 'index' && col.field !== 'action').map((col) => row[col.field]);
        wsData.push(rowData);
    });

    // Tạo workbook và worksheet từ dữ liệu trên
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    // Tạo file Excel và tải xuống
    XLSX.writeFile(wb, `${props.titleList || 'data'}.xlsx`);
}

// Hiển thị các nút phân trang
const visiblePages = computed(() => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages.value <= maxVisible) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        const startPage = Math.max(1, currentPage.value - 1);
        const endPage = Math.min(totalPages.value, currentPage.value + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
    }
    return pages;
});

// Chuyển đổi định dạng ngày
function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
}

// Chuyển trang
function changePage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}
</script>

<template>
    <div class="flex flex-wrap justify-between gap-2 py-4 px-2">
        <h2 class="table-title" v-if="titleList">{{ $t(titleList) }}</h2>
        <div class="flex gap-4 items-center">
            <slot name="customContent"></slot>

            <div class="dropdown-nav">
                <div class="dropdown-nav group relative">
                    <div class="dropdown-toggle-nav">
                        <div class="w-full flex justify-center border rounded-md bg-gray-100 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </div>
                    </div>
                    <div class="dropdown-content-nav border min-w-44 rounded-md right-1 absolute bg-gray-100 text-gray-800 shadow hidden group-hover:block z-50 p-2 flex flex-col space-y-2">
                        <button @click="downloadExcel"  class="bg-blue-500 text-white px-4 py-2 rounded">Tải xuống Excel</button>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded">Tải xuống Excel</button>
                    </div>
                </div>
            </div>

            <div class="dropdown-nav">
                <div class="dropdown-nav group">
                    <div class="w-full flex justify-center border rounded-md bg-gray-100 pt-1 pb-1 ml-1 mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                />
                            </svg>
                    </div>
                    <div class="dropdown-content-nav border min-w-44 rounded-md hidden right-0 absolute bg-gray-100 text-gray-800 shadow group-hover:block z-50">
                        <div v-for="col in props.table.cols" :key="col.field" class="flex items-center">
                            <input type="checkbox" v-model="col.show" class="mr-2" />
                            <label>{{ col.title }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="overflow-x-auto overflow-y-auto border rounded-xl" style="height: calc(100vh - 246px)">
        <table class="table-auto w-full">
            <thead>
                <tr class="border-b text-base">
                    <th v-for="col in visibleCols" :key="col.field" class="py-2 sticky top-0 bg-gray-100 z-10">{{ col.title }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="border-b text-sm">
                    <td
                        v-for="col in visibleCols"
                        :key="col.field"
                        :class="{
                            ' px-4 py-4 min-w-44 max-w-96': col.field !== 'index',
                            ' px-4 py-4 min-w-10': col.field === 'index',
                            ' px-4 py-4 min-w-60': col.field === 'action',
                        }"
                    >
                        <template v-if="col.field === 'action'">
                            <slot name="actions" :row="row"></slot>
                        </template>
                        <template v-else>
                            <span v-if="col.field === 'index'">{{ rowIndex + 1 }}</span>
                            <span v-else-if="col.type === 'date'" class="flex justify-center">{{ formatDate(row[col.field]) }}</span>
                            <span v-if="col.type !== 'action' && col.type !== 'date'" class="flex justify-center">{{ row[col.field] }}</span>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mt-2 flex gap-6 items-center justify-between px-3">
        <div class="text-gray-600 text-sm">
            {{ $t('total') }}
            : {{ props.table.data.length }}
        </div>
        <div class="gap-6 flex items-center text-sm">
            <select v-model="rowsPerPage" class="px-2 py-1 border rounded ">
                <option :value="20">20</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
            </select>

            <div class="flex items-center space-x-2">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Trước</button>
                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="changePage(page)"
                    :class="{
                        'px-3 py-1 rounded': true,
                        'bg-blue-500 text-white': page === currentPage,
                        'bg-gray-300': page !== currentPage,
                    }"
                >
                    {{ page }}
                </button>
                <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Tiếp</button>
            </div>
        </div>
    </div>
</template>
