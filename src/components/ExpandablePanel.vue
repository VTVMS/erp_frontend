<template>
    <div class="border rounded-lg">
        <div class="px-3 py-2 flex items-center justify-between cursor-pointer border-b-2" @click="togglePanel">
            <div class="text-lg font-semibold">
                <h1 class="text-[18px] font-semibold leading-7 flex items-center text-[#3b82f6]">{{ $t('position') }}</h1>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" :class="{ 'rotate-180': isExpanded }" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 011.414 0L10 12.586l3.293-2.879a1 1 0 111.414 1.414l-4 3.5a1 1 0 01-1.414 0l-4-3.5a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>

        <transition name="fade">
            <div v-if="isExpanded" class="flex flex-col" style="height: calc(100vh - 175px)">
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
                            <div class="flex items-center space-x-2">
                                <button @click.stop="onEdit(row)" class="p-2 rounded-full hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M9 12h.01M12 12h.01M8 18l4-1 4 1m-8-6a4 4 0 018 0m-4-8v8m4 4H8" />
                                    </svg>
                                </button>
                                <button @click.stop="onDelete(row)" class="p-2 rounded-full hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>

                <button @click="handleAdd" class="w-full py-2 m-0 text-gray-800 border-t-2 rounded-b-lg bg-blue-100 hover:bg-blue-200 mt-auto">
                    {{ $t('add') }}
                </button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        dataList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isExpanded: true,
            check: null,
        };
    },
    methods: {
        togglePanel() {
            this.isExpanded = !this.isExpanded;
        },
        onCheckItem(id) {
            this.check = id;
        },
        onAdd() {
            this.$emit('add');
        },
        onEdit(row) {
            this.$emit('edit', row);
        },
        onDelete(row) {
            this.$emit('delete', row);
        },
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    height: 0;
}
</style>
