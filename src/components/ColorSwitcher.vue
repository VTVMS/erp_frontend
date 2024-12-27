<template>
    <div></div>
    <div class="sm:flex hidden dropdown-nav relative text-gray-100">
        <div class="dropdown-nav relative inline-block sm:ml-2 sm-3 group">
            <div class="dropdown-toggle-nav flex p-2 font-medium">
                <div class="relative w-full flex justify-center">Palette 1</div>
            </div>
            <div class="dropdown-content-nav border min-w-36 rounded-md hidden absolute right-0 bg-gray-100 text-gray-800 shadow group-hover:block dark:bg-gray-900 dark:text-white dark:border-gray-700 z-50">
                <div class="flex flex-col w-full">
                    <button @click="changeColor('palette1')" class="flex items-center gap-x-1 px-2 py-2 text-sm border-b border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700">
                        <div class="bg-[#002936] h-8 w-10 border rounded-lg"></div>
                        Palette 1
                    </button>
                    <button @click="changeColor('palette2')" class="flex items-center gap-x-1 px-2 py-2 text-sm border-b border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700">
                        <div class="bg-[#f3f4f6] h-8 w-10 border rounded-lg"></div>
                        Palette 2
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const palette1 = ['#053848', '#3b82f6', '#d37b0e'];
const palette2 = ['#3b82', '#002936', '#A5BFCC'];

const changeColor = (palette: string) => {
    let selectedPalette;
    if (palette === 'palette1') {
        selectedPalette = palette1;
    } else {
        selectedPalette = palette2;
    }

    // Lưu bảng màu vào localStorage
    localStorage.setItem('selectedColors', JSON.stringify(selectedPalette));

    // Cập nhật biến CSS toàn cục
    document.documentElement.style.setProperty('--color-60', selectedPalette[0]);
    document.documentElement.style.setProperty('--color-30', selectedPalette[1]);
    document.documentElement.style.setProperty('--color-10', selectedPalette[2]);
};

// Khi component được mount, kiểm tra localStorage
const storedColors = localStorage.getItem('selectedColors');
if (storedColors) {
    const colors = JSON.parse(storedColors);
    document.documentElement.style.setProperty('--color-60', colors[0]);
    document.documentElement.style.setProperty('--color-30', colors[1]);
    document.documentElement.style.setProperty('--color-10', colors[2]);
}
</script>
