import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

import Home from '../views/Home.vue'
import Login from "../views/Login";
import NoLogin from "../views/pages/NoLogin";

import profile from "../views/profile/profile";
import profile_files from "../views/profile/profile_files";
import profile_change from "../views/profile/profile_change";

import admin_index from "../views/admin/admin_index";

import admin_orders from "../views/admin/orders/orders_index";
import admin_orders_all from "../views/admin/orders/orders_all";
import admin_orders_edit from "../views/admin/orders/orders_edit";

import admin_messages from "../views/admin/messages/messages_index";
import admin_messages_all from "../views/admin/messages/messages_all";
import admin_messages_show from "../views/admin/messages/messages_show";

import admin_guides from "../views/admin/guides/guides_index";
import admin_guides_all from "../views/admin/guides/guides_all";
import admin_guides_add from "../views/admin/guides/guides_add";
import admin_guides_edit from "../views/admin/guides/guides_edit";

import admin_settings from "../views/admin/settings/settings_index";
import admin_settings_emails from "../views/admin/settings/settings_emails";
import admin_settings_users from "../views/admin/settings/settings_users";

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
                ]},
        ]},

  {path: '/login',name: 'login',component: Login, async beforeEnter(to, from, next){
      await store.getters['user/ready'];
      store.getters['user/isLogin'] ? next({ name: 'Home' }) : next()
    }},


    {path: '/no_login',name: 'NoLogin',component: NoLogin},
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

    if(!store.getters['user/isLogin']){
      next({ name: 'login' });
    }
    else{
      next();
    }
  }
  else{
    next();
  }
})


export default router
