 import {createRouter, createWebHistory} from 'vue-router'

 const routes = [
    {
        path: '/',
        name: 'transaction.index',
        component: () => import("../view/transaction/Index.vue")
    },
    {
        path: '/request-product',
        name: 'transaction.create',
        component: () => import("../view/transaction/Create.vue")
    },
    {
        path: '/my-product',
        name: 'myproduct',
        component: () => import("../view/profile/MyProduct.vue")
    },
    {
        path: '/edit/:id',
        name: 'transaction.edit',
        component: () => import("../view/transaction/Edit.vue")
    },
    {
        path: '/product-detail/:slug',
        name: 'transaction.productdetail',
        component: () => import("../view/transaction/DetailProduct.vue")
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../view/auth/Login.vue")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("../view/auth/Register.vue")
    }
 ]; 

 const router = createRouter({
    history: createWebHistory(),
    routes
 });

 export default router;