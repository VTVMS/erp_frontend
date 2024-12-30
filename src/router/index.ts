// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/employee/employee',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/profile.vue'),
        meta: { requiresAuth: false }, // trang yêu cầu đăng nhập thì dùng false nếu cần bảo mật đăng nhập thì thay băng true
    },
    {
        path: '/employee/employee',
        name: 'List-Employee',
        component: () => import('@/views/employee/employee/employee.vue'),
        meta: { requiresAuth: false }, // trang yêu cầu đăng nhập thì dùng false nếu cần bảo mật đăng nhập thì thay băng true
    },
    {
        path: '/employee/department',
        name: 'List-Department',
        component: () => import('@/views/employee/department/department.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/employee/diagram',
        name: 'Diagram',
        component: () => import('@/views/employee/diagram/diagram.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/catalog/category',
        name: 'Category',
        component: () => import('@/views/catalog/category/category.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/catalog/channel',
        name: 'Channel',
        component: () => import('@/views/catalog/channel/channel.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/program_framework',
        name: 'Program-Framework',
        component: () => import('@/views/program_framework/program_framework.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/broadcast_registration',
        name: 'Broadcast-Registration',
        component: () => import('@/views/broadcast_registration/broadcast_registration.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/broadcast_schedule',
        name: 'Broadcast-Schedule',
        component: () => import('@/views/broadcast_schedule/broadcast_schedule.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/admin/user_authorization',
        name: 'User-Authorization',
        component: () => import('@/views/admin/user_authorization/user_authorization.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/admin/power_group',
        name: 'Power-Group',
        component: () => import('@/views/admin/power_group/power_group.vue'),
        meta: { requiresAuth: false }, 
    },
    {
        path: '/admin/category_authorization',
        name: 'Category-Authorization',
        component: () => import('@/views/admin/category_authorization/category_authorization.vue'),
        meta: { requiresAuth: false }, 
    },
    
    {
        path: '/employee/position',
        name: 'Position',
        component: () => import('@/views/employee/position/position.vue'),
        meta: { requiresAuth: false }, 
    },

    {
        path: '/admin/list_account',
        name: 'list_account',
        component: () => import('@/views/admin/list_account/list_account.vue'),
        meta: { requiresAuth: false }, 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    authStore.checkLogin();

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
