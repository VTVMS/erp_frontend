<template>
    <div class="border rounded-lg">
        <div class="px-3 py-2 flex items-center justify-between cursor-pointer" @click="togglePanel">
            <div class="text-lg font-semibold">
                <h1 class="text-[23px] font-semibold leading-7 flex items-center text-[#3b82f6]">{{ $t('position') }}</h1>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" :class="{ 'rotate-180': isExpanded }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 011.414 0L10 12.586l3.293-2.879a1 1 0 111.414 1.414l-4 3.5a1 1 0 01-1.414 0l-4-3.5a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>

        <transition name="fade">
            <div v-if="isExpanded" class="flex flex-col border-t-2 overflow-y-auto" style="height: calc(100vh - 175px)">
                <div class="relative py-2 px-1">
                    <input type="text" id="searchInput" placeholder="Tìm kiếm ..." class="border border-gray-300 rounded-lg pl-10 w-full py-1" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <ul v-if="dataList.length > 0" class="divide-y divide-gray-200">
                    <li v-for="(row, index) in dataList" :key="row.id" class="px-3 py-2 cursor-pointer" :class="{ 'bg-gray-100': index % 2 === 0, 'bg-blue-100': +check === +row.id }" @click="onCheckItem(row.id)">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-medium">{{ row.code }}</div>
                                <div class="text-gray-600 text-sm">{{ row.name }}</div>
                            </div>
                            <div class="relative inline-block">
                                <button class="text-base cursor-pointer" @click="toggleDropdown($event)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                    </svg>
                                </button>
                                <div v-if="dropdownVisible" class="dropdown-content text-sm fixed z-10 mt-2 rounded-lg bg-gray-200 " :style="dropdownStyle">
                                    <button @click="handleUpdateFunc(row)" class="flex items-center rounded-b-xl w-full text-black px-2 py-2 no-underline text-sm">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                                        />
                                      </svg>
                                      <span>Sửa</span>
                                    </button>
                                    <button @click="handleDeleteFunc(row)" class="flex items-center rounded-b-xl w-full text-black px-2 py-2 no-underline text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                        <span>Xoá</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <button @click="handleAddFunc()" class="sticky z-5 bottom-0 w-full py-2 m-0 text-gray-800 border-t-2 rounded-b-lg bg-blue-100 hover:bg-blue-200 mt-auto">
                    {{ $t('add') }}
                </button>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
    dataList: {
        type: Array as () => Array<{ id: number; code: string; name: string }>,
        default: () => [],
    },
    handleAddFunc: {
      required: true,
      type: Function,
    },
    handleUpdateFunc: {
      required: true,
      type: Function,
    },
    handleDeleteFunc: {
      required: true,
      type: Function,
    },
});

const isExpanded = ref(true);
const check = ref<number | null>(null);
const dropdownVisible = ref(false);
const dropdownStyle = ref<{ top: string; left: string }>({ top: ' 0px', left: '6px'});

function togglePanel() {
    isExpanded.value = !isExpanded.value;
}

function onCheckItem(id: number) {
    check.value = id;
}

function toggleDropdown(event: MouseEvent) {
    const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
    dropdownStyle.value = {
        top: `${buttonRect.bottom + window.scrollY }px`,
        left: `${buttonRect.left + window.scrollX}px`,
    };
    dropdownVisible.value = !dropdownVisible.value;
}
</script>

