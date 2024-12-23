<template>
    <div class="home w-60 p-3">
        <nav class="navlist no-width-scrollbar overflow-y-auto flex flex-1 flex-col">
            <ul role="list">
                <!-- Lặp qua các route -->
                <li v-for="(route, index) in routes" :key="index">
                    <div
                        v-if="route.children"
                        class="justify-between dark:hover:bg-gray-600 hover:bg-opacity-50 rounded-md flex p-2 cursor-pointer"
                        :class="{
                            'bg-gray-700 text-white': isActive(route.path),
                            'dark:hover:bg-gray-600 hover:bg-opacity-50': !isActive(route.path),
                        }"
                        @click="toggleSubMenu(index)"
                    >
                        {{ route.label }}
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{ 'rotate-180': activeSubMenu === index }" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </div>
                    <router-link
                        v-else
                        class="justify-between dark:hover:bg-gray-600 hover:bg-opacity-50 rounded-md flex p-2"
                        :to="route.path"
                        :class="{
                            'bg-gray-700 text-white': isActive(route.path),
                            'dark:hover:bg-gray-600 hover:bg-opacity-50': !isActive(route.path),
                        }"
                    >
                        {{ route.label }}
                    </router-link>

                    <!-- Menu con -->
                    <ul v-if="route.children && activeSubMenu === index" class="ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
                        <li v-for="(child, childIndex) in route.children" :key="childIndex" class="mt-1 border-b border-gray-300 dark:border-gray-600 last:border-none">
                            <router-link
                                class="dark:hover:bg-gray-500 hover:bg-opacity-50 rounded-md flex p-2"
                                :to="child.path"
                                :class="{
                                    'bg-gray-600 text-white': isActive(child.path),
                                    'dark:hover:bg-gray-500 hover:bg-opacity-50': !isActive(child.path),
                                }"
                            >
                                {{ child.label }}
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Mảng routes với menu con
const routes = [
    { path: '/home', label: 'Home' },
    {
        path: '/admin',
        label: 'Admin',
        children: [
            { path: '/admin/users', label: 'Users' },
            { path: '/admin/settings', label: 'Settings' },
        ],
    },
    { path: '/profile', label: 'Profile' },
    { path: '/settings', label: 'Settings' },
];

// Sử dụng Vue Router
const route = useRoute();

// Theo dõi trạng thái menu con
const activeSubMenu = ref<number | null>(null);

// Hàm kiểm tra đường dẫn hiện tại
const isActive = (path: string) => {
    return route.path === path;
};

// Hàm bật/tắt menu con
const toggleSubMenu = (index: number) => {
    activeSubMenu.value = activeSubMenu.value === index ? null : index;
};
</script>

<style scoped>
.home {
    background-color: var(--bg-color);
    color: var(--text-color);
}
.border-l {
    position: relative;
    margin-left: 1rem; /* Định vị đường kẻ trong menu con */
}
/* Xoay mũi tên khi menu mở */
.rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.2s ease;
}
</style>
