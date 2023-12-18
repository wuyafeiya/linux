import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'linux',
    redirect: '/add',
    component: () => import('../components/HelloWorld.vue'),
    children: [
      {
        path: 'add',
        component: () => import('../components/add.vue'),
      },
      {
        path: 'query',
        component: () => import('../components/query.vue'),
      },
      {
        path: 'state',
        component: () => import('../components/state.vue'),
      },
      {
        path: 'update',
        component: () => import('../components/update.vue'),
      },
      {
        path: 'delete',
        component: () => import('../components/delete.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../components/login.vue'),
  },
]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  const cookie = document.cookie
  if (to.path !== '/login' && cookie !== 'login=true')
    next('/login')

  else if (to.path === '/login' && cookie)
    next('/')

  else
    next()
})

export default router
