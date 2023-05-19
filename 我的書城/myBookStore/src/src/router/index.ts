/**
 * @brief
 *  路由劃分
 * @data
 *  2023/4
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { GoodStorageData } from '@/constants'
// import storage from 'good-storage'

// const { TOKEN } = GoodStorageData

const routes: RouteRecordRaw[] = [
  {
    name: 'default',
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('@/views/category/index.vue'),
  },
  {
    name: 'books',
    path: '/books',
    component: () => import('@/views/books/index.vue'),
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/search/index.vue'),
  },
  {
    name: 'productDetails',
    path: '/productDetails',
    component: () => import('@/views/productDetails/index.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/userInfo/index.vue'),
    // beforeEnter(to, from, next) {
    //   const token = storage.get(TOKEN)

    //   // 判斷是否已登入
    //   if (token) {
    //     next({ name: 'default' })
    //   } else {
    //     next()
    //   }
    // },
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404Error/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 僅只觸發 shopCart模塊 後進行登入驗證，其餘在未登入的情況下皆可使用
// 所以暫不用路由守衛，即對 shopCart模塊 進行驗證即可
// router.beforeEach((to, from, next) => {
//   const token = storage.get(TOKEN)
//   if (token || to.name === 'login') {
//     next()
//   } else {
//     next({ name: 'login' })
//   }
// })

export default router
