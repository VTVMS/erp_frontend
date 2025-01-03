<template>
    <div class="home min-w-[299px] text-gray-200 font-semibold h-full">
        <nav class="navlist no-width-scrollbar overflow-y-auto flex flex-1 flex-col px-3">
            <ul role="list">
                <li v-for="(route, index) in routes" :key="index">
                    <div
                        v-if="route.children"
                        class="justify-between dark:hover:bg-gray-600 hover:bg-opacity-50 rounded-md flex p-2 mt-1 cursor-pointer"
                        :class="{
                            'bg-gray-700 text-white': isActive(route.path),
                            'dark:hover:bg-gray-600 hover:bg-opacity-50': !isActive(route.path),
                        }"
                        @click="toggleSubMenu(index)"
                    >
                        <div class="flex">
                            <svg v-if="route.icon" class="h-6 w-6 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" :d="route.icon" />
                            </svg>
                            {{ $t(route.label) }}
                        </div>

                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="{ 'rotate-180': activeSubMenu === index }" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </div>
                    <router-link
                        v-else
                        class="dark:hover:bg-gray-600 hover:bg-opacity-50 rounded-md flex p-2 mt-1"
                        :to="route.path"
                        :class="{
                            'bg-gray-700 text-white': isActive(route.path),
                            'dark:hover:bg-gray-600 hover:bg-opacity-50': !isActive(route.path),
                        }"
                    >
                        <svg v-if="route.icon" class="h-6 w-6 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" :d="route.icon" />
                        </svg>
                        {{ $t(route.label) }}
                    </router-link>

                    <!-- Menu con -->
                    <ul v-if="route.children && activeSubMenu === index" class="border-l border-gray-300 dark:border-gray-600" style="margin-left: 35px">
                        <li v-for="(child, childIndex) in route.children" :key="childIndex" class="mt-1 border-gray-300 dark:border-gray-600 last:border-none flex items-center">
                            <div class="border-t w-4"></div>
                            <router-link
                                class="dark:hover:bg-gray-500 hover:bg-opacity-50 rounded-md flex p-2 w-full"
                                :to="child.path"
                                :class="{
                                    'bg-gray-600 text-white': isActive(child.path),
                                    'dark:hover:bg-gray-500 hover:bg-opacity-50': !isActive(child.path),
                                }"
                            >
                                {{ $t(child.label) }}
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
    // { path: '/home', label: 'Home' },
    {
        path: '/dashboards',
        label: 'dashboards',
        icon: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
    },
    {
        path: '/employee',
        label: 'employee',
        icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
        children: [
            { path: '/employee/employees', label: 'listEmployee' },
            { path: '/employee/departments', label: 'listDepartment' },
            { path: '/employee/position', label: 'listPosition' },
            { path: '/employee/diagram', label: 'diagram' },
        ],
    },
    {
        path: '',
        label: 'catalog',
        icon: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z',
        children: [
            { path: '/catalog/categorys', label: 'category' },
            { path: '/catalog/channels', label: 'channel' },
        ],
    },
    { path: '/program_framework', label: 'programFramework', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
    {
        path: '/broadcast_registration',
        label: 'broadcastRegistration',
        icon: 'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
    },
    {
        path: '/broadcast_schedule',
        label: 'broadcastSchedule',
        icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z',
    },
    {
        path: '/admin',
        label: 'admin',
        icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z',
        children: [
            { path: '/admin/list_account', label: 'list_account' },
            { path: '/admin/user_authorization', label: 'userAuthorization' },
            { path: '/admin/power_group', label: 'powerGroup' },
            { path: '/admin/category_authorization', label: 'categoryAuthorization' },
        ],
    },
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
    background-color: var(--color-60);
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
