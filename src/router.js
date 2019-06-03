import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/user/movieDetail',
      name: 'movieDetail',
      component: () => import('@/views/user/movieDetail'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/user/seat',
      name: 'seat',
      component: () => import('@/views/user/seat')
    },
    {
      path: '/user/payment',
      name: 'payment',
      component: () => import('@/views/user/payment'),
      children: [
        {
          path: 'success',
          name: 'success',
          component: () => import('@/views/user/payment/success')
        }
      ]
    }
  ]
})
