import Vue from "vue";
import Router from "vue-router";


//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
//const Foo = { template: '<div>foo</div>' }
//const Bar = { template: '<div>bar</div>' }

/**
 * constantRoutes
 * a base page that does not have Permission requirements
 * all roles can be accessed
 *
 */
export const constantRoutes = [
  {
    path: 'redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //     path: '/login',
  //     component: ()=> import('@/views/login/index'),
  //     hidden: true
  // },
  {
    path: '/login',
    component: () => import('@/components/Login/Login'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {title: '主页', icon: 'dashboard', affix: true}
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        component: () => import('@/components/test/UserProfile'),
        name: 'Profile',
        meta: {title: '个人信息', icon: 'user', affix: false}
      }
    ]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/users',
    component: Layout,
    meta:{ roles: ['admin'] },
    children: [
      {
        path: '/users',
        component: () => import('@/views/User/UserList'),
        name: 'UserList',
        meta: {title: '用户管理', icon: 'peoples', affix: false}
      }
    ]
  }
  ,
  // {
  //   path: '/news',
  //   component: Layout,
  //   meta:{ roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/News/NewsList'),
  //       name: 'NewsList',
  //       meta: {title: '事务管理', icon: 'news', affix: false}
  //     }
  //   ]
  // } ,
  {
    path: '/notices',
    component: Layout,
    meta:{ roles: ['admin'] },
    children: [
      {
        path: '/notices',
        component: () => import('@/views/Notice/NoticeList'),
        name: 'NoticeList',
        meta: {title: '通知管理', icon: 'notice', affix: false}
      }
    ]
  },
  {
    path: '/roles',
    component: Layout,
    meta:{ roles: ['admin'], title: '系统权限' },
    children: [
      {
        path: '/roles',
        component: () => import('@/views/Permission/Role'),
        name: 'roles',
        meta: {title: '系统权限', icon: 'role', affix: false }
      }
    ]
  },
  {
    path: '/upload',
    component: Layout,
    meta:{
      roles: ['admin']
    },
    children: [
      {
        path: '/upload',
        component: () => import('@/views/Upload/PicUpload'),
        name: 'upload',
        meta: {title: '上传图片', icon: 'upload', affix: false }
      }
    ]
  },
  {
    path: '/piclist',
    component: Layout,
    meta:{
      roles: ['admin']
    },
    children: [
      {
        path: '/piclist',
        component: () => import('@/views/Upload/PicList'),
        name: 'upload',
        meta: {title: '图库管理', icon: 'upload', affix: false }
      }
    ]
  },
  // {
  //   path: '/backup',
  //   component: Layout,
  //   meta:{
  //     roles: ['admin']
  //   }
  //   children: [
  //     {
  //       path: '/backup',
  //       component: () => import('@/views/Backup/BackupAndRollBack'),
  //       name: 'backup',
  //       meta: {title: '数据备份与恢复', icon: 'backup', affix: false }
  //     }
  //   ]
  // },
  {
    path: '/logs',
    component: Layout,
    meta:{
      roles: ['admin']
    },
    children: [
      {
        path: '/logs',
        component: () => import('@/views/Log/LogList'),
        name: 'logs',
        meta: {title: '日志管理', icon: 'logs', affix: false }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const createRouter = () => new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// // 4. 创建和挂载根实例。
// // 记得要通过 router 配置参数注入路由，
// // 从而让整个应用都有路由功能
// const app = new Vue({
//     router
// }).$mount('#app')

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router;
