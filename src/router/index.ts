// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import {useAuthStore} from "../stores/auth.store.ts";

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/dashboards',
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/login.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/dashboards',
        name: 'dashboards',
        component: () => import('../views/dashboards/dashboards.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/profile/profile.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/employee/employees',
        name: 'List-Employee',
        component: () => import('../views/employee/employees/employee.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/employee/departments',
        name: 'List-Department',
        component: () => import('../views/employee/department/department.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/employee/diagram',
        name: 'Diagram',
        component: () => import('../views/employee/diagram/diagram.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/catalog/categories',
        name: 'Category',
        component: () => import('../views/catalog/category/category.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/catalog/channels',
        name: 'Channel',
        component: () => import('../views/catalog/channel/channel.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/program_framework',
        name: 'Program-Framework',
        component: () => import('../views/program_framework/program_framework.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/broadcast_registration',
        name: 'Broadcast-Registration',
        component: () => import('../views/broadcast_registration/broadcast_registration.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/broadcast_schedule',
        name: 'Broadcast-Schedule',
        component: () => import('../views/broadcast_schedule/broadcast_schedule.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/user_authorization',
        name: 'User-Authorization',
        component: () => import('../views/admin/user_authorization/user_authorization.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/power_group',
        name: 'Power-Group',
        component: () => import('../views/admin/power_group/power_group.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/category_authorization',
        name: 'Category-Authorization',
        component: () => import('../views/admin/category_authorization/category_authorization.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/employee/position',
        name: 'Position',
        component: () => import('../views/employee/position/position.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/list_account',
        name: 'List_account',
        component: () => import('../views/admin/list_account/list_account.vue'),
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();
    authStore.checkIsTokenIsValid();
    const isRequiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (isRequiresAuth && !authStore.isLoggedIn) {
        next('/login');
    } else if (authStore.isLoggedIn) {
        switch (to.name) {
            case 'Login':
                next({ path: '/dashboards' });
                break;
            default:
                next();
                break;
        }
    } else next();
});

export default router;
