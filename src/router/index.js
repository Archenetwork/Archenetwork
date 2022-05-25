import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const appRoute = {
  path: '/',
  component: () => import('@/views/layout/index.vue'),
  children: [
    {
      path: '',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/other/notFound.vue'),
    },
  ],
}
const env = import.meta.env.MODE
const router = createRouter({
  history: env === 'development' ? createWebHashHistory() : createWebHistory(),
  routes: [
    appRoute,
  ],
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
