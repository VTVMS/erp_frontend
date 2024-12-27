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
    if (!cols.some((col) => col.field === 'index')) {
        cols.unshift({ title: 'STT', field: 'index', show: true });
    }
    if (!cols.some((col) => col.field === 'action')) {
        cols.push({ title: 'Chức năng', field: 'action', show: true });
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
    <div class="flex flex-wrap justify-between gap-2 px-2 items-end border-b-2 pb-2 mt-2">
        <div class="flex flex-wrap">
            <h1 class="text-[28px] font-semibold leading-7 flex items-center text-[#3b82f6]">
                {{ $t(titleList) }}
            </h1>
        </div>
        <div class="flex gap-4 items-end">
            <slot name="customContent"></slot>

            <div class="dropdown-nav">
                <div class="dropdown-nav group relative">
                    <div class="dropdown-toggle-nav">
                        <div class="w-full flex justify-center border rounded-md bg-gray-200 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </div>
                    </div>
                    <div class="dropdown-content-nav border min-w-44 rounded-md right-0 absolute bg-gray-100 text-gray-800 shadow hidden group-hover:block z-50 p-2">
                        <div class="flex flex-col justify-center space-y-2">
                            <button @click="downloadExcel" type="button" class="inline-flex items-center border text-gray-700 justify-center min-w-40 rounded-md py-2 text-sm font-medium focus:outline-none bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" class="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Dowload File
                            </button>

                            <button @click="downloadExcel" type="button" class="inline-flex items-center border text-gray-700 justify-center min-w-40 rounded-md py-2 text-sm font-medium focus:outline-none bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Import File
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropdown-nav">
                <div class="dropdown-nav group relative">
                    <div class="w-full flex justify-center border rounded-md bg-gray-200 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </div>
                    <div class="dropdown-content-nav border min-w-40 rounded-md right-0 absolute bg-gray-100 text-gray-800 shadow hidden group-hover:block z-50 p-3">
                        <div v-for="col in props.table.cols" :key="col.field" class="flex items-center">
                            <input type="checkbox" v-model="col.show" class="mr-2" />
                            <label class="text-base"> {{ $t(col.title) }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="overflow-x-auto overflow-y-auto border rounded-xl mt-2" style="height: calc(100vh - 233px)">
        <table class="table-auto w-full">
            <thead>
                <tr class="border-b text-base">
                    <th
                        v-for="col in visibleCols"
                        :key="col.field"
                        class="py-2 sticky top-0 bg-gray-200 z-10 font-medium text-gray-800"
                        :class="{
                            'right-0 z-20 ': col.field === 'action',
                        }"
                    >
                        {{ $t(col.title) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in paginatedData"
                    :key="rowIndex"
                    :class="{
                        ' text-sm ': true,
                        'border-b': true,
                    }"
                >
                    <td
                        v-for="col in visibleCols"
                        :key="col.field"
                        :class="{
                            ' px-4 py-2 min-w-44 max-w-96 text-gray-600 ': col.field !== 'index' && col.field !== 'action',
                            'px-4 py-2 min-w-10 text-gray-600 ': col.field === 'index',
                            'px-4 py-3 h-full min-w-32 flex justify-center max-w-96 sticky right-0 z-10 bg-blue-50': col.field === 'action',
                        }"
                    >
                        <template v-if="col.field === 'action'">
                            <slot name="actions" :row="row"></slot>
                        </template>
                        <template v-else>
                            <span v-if="col.field === 'index'">{{ rowIndex + 1 }}</span>

                            <span v-else-if="col.type === 'date'" class="flex justify-center text-gray-600">
                                {{ formatDate(row[col.field]) }}
                            </span>

                            <div v-else-if="col.type === 'img'" class="flex justify-center items-center">
                                <img v-if="row[col.field]" :src="row[col.field]" alt="Image" class="w-9 h-9 rounded-full object-cover" />
                            </div>

                            <span v-if="col.type !== 'action' && col.type !== 'date' && col.field !== 'avatar'" class="flex justify-center">
                                {{ row[col.field] }}
                            </span>
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
            <select v-model="rowsPerPage" class="px-2 py-1 border rounded">
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
                        'bg-[var(--color-10)] text-white': page === currentPage,
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
