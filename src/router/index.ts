// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
    },
    {
        path: '/employee/employee',
        name: 'List-Employee',
        component: () => import('@/views/employee/employee/employee.vue'),
    },
    {
        path: '/employee/department',
        name: 'List-Department',
        component: () => import('@/views/employee/department/department.vue'),
    },
    {
        path: '/employee/diagram',
        name: 'Diagram',
        component: () => import('@/views/employee/diagram/diagram.vue'),
    },
    {
        path: '/catalog/category',
        name: 'Category',
        component: () => import('@/views/catalog/category/category.vue'),
    },
    {
        path: '/catalog/channel',
        name: 'Channel',
        component: () => import('@/views/catalog/channel/channel.vue'),
    },
    {
        path: '/program_framework',
        name: 'Program-Framework',
        component: () => import('@/views/program_framework/program_framework.vue'),
    },
    {
        path: '/broadcast_registration',
        name: 'Broadcast-Registration',
        component: () => import('@/views/broadcast_registration/broadcast_registration.vue'),
    },
    {
        path: '/broadcast_schedule',
        name: 'Broadcast-Schedule',
        component: () => import('@/views/broadcast_schedule/broadcast_schedule.vue'),
    },
    {
        path: '/admin/user_authorization',
        name: 'User-Authorization',
        component: () => import('@/views/admin/user_authorization/user_authorization.vue'),
    },
    {
        path: '/admin/power_group',
        name: 'Power-Group',
        component: () => import('@/views/admin/power_group/power_group.vue'),
    },
    {
        path: '/admin/category_authorization',
        name: 'Category-Authorization',
        component: () => import('@/views/admin/category_authorization/category_authorization.vue'),
    },
    
    {
        path: '/admin/position',
        name: 'Position',
        component: () => import('@/views/admin/position/position.vue'),
    },

    {
        path: '/admin/list_account',
        name: 'list_account',
        component: () => import('@/views/admin/list_account/list_account.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
