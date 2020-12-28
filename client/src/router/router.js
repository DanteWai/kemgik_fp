import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

import Home from '../views/Home.vue'
import Login from "../views/Login";
import NoLogin from "../views/pages/NoLogin";
import Versions from "../views/pages/Versions";

import profile from "../views/profile/profile";
import profile_files from "../views/profile/profile_files";
import profile_change from "../views/profile/profile_change";

//import admin_index from "@/views/admin/admin_index";
const admin_index = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/admin_index.vue')

const admin_orders = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/orders/orders_index.vue')
const admin_orders_all = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/orders/orders_all.vue')
const admin_orders_edit = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/orders/orders_edit.vue')

const admin_messages = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/messages/messages_index.vue')
const admin_messages_all = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/messages/messages_all.vue')
const admin_messages_show = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/messages/messages_show.vue')

const admin_guides = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/guides/guides_index.vue')
const admin_guides_all = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/guides/guides_all.vue')
const admin_guides_add = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/guides/guides_add.vue')
const admin_guides_edit = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/guides/guides_edit.vue')

const admin_settings = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/settings/settings_index.vue')
const admin_settings_emails = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/settings/settings_emails.vue')
const admin_settings_users = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/settings/settings_users.vue')
const admin_settings_sql = () => import(/* webpackChunkName: "group-admin" */ '@/views/admin/settings/settings_sql.vue')


import E404 from "../components/E404";



Vue.use(VueRouter)

const routes = [
  {path: '/',name: 'Home',component: Home, meta: { auth: true }},

    { path: "/profile", name:'profile', redirect: {name:'profile_files'}, component:profile,  meta: { auth: true }, children:[
            {path:'files',component:profile_files, name:'profile_files'},
            {path:'change',component:profile_change, name:'profile_change'},
        ] },

    { path: "/fp", name:'admin', redirect: {name:'admin_orders'}, component:admin_index,  meta: { auth: true }, children:[
            {path:'orders',component:admin_orders, name:'admin_orders', redirect: {name:'admin_orders_all'}, children:[
                    {path:'',component:admin_orders_all, name:'admin_orders_all'},
                    {path:'edit/:id',component:admin_orders_edit, name:'admin_orders_edit'},
                ]},
            {path:'messages',component:admin_messages, name:'admin_messages', redirect: {name:'admin_messages_all'}, children:[
                    {path:'',component:admin_messages_all, name:'admin_messages_all'},
                    {path:'show/:id',component:admin_messages_show, name:'admin_messages_show'},
                ]},
            {path:'guides',component:admin_guides, name:'admin_guides', redirect: {name:'admin_guides_all'}, children:[
                    {path:'',component:admin_guides_all, name:'admin_guides_all'},
                    {path:'add',component:admin_guides_add, name:'admin_guides_add'},
                    {path:'edit/:id',component:admin_guides_edit, name:'admin_guides_edit'},
                ]},
            {path:'settings',redirect: {name:'admin_settings_users'}, component:admin_settings, name:'admin_settings', children:[
                    {path:'emails', component:admin_settings_emails, name:'admin_settings_emails'},
                    {path:'users', component:admin_settings_users, name:'admin_settings_users'},
                    {path:'sql', component:admin_settings_sql, name:'admin_settings_sql'},
                ]},
        ]},

  {path: '/login',name: 'login',component: Login, async beforeEnter(to, from, next){
      await store.getters['user/ready'];
      store.getters['user/isLogin'] ? next({ name: 'Home' }) : next()
    }},


    {path: '/no_login',name: 'NoLogin',component: NoLogin},
    {path: '/versions',name: 'Versions',component: Versions},
    {path: '**',name: 'E404',component: E404, meta: { auth: true }},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(route => route.meta.auth)){
    await store.getters['user/ready'];
    store.getters['user/isLogin'] ? next() : next({ name: 'login' })
  }
  else{
    next();
  }
})


export default router
