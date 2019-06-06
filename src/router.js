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
      path: '/movieList',
      name: 'movieList',
      component: () => import('@/views/home/movieList'),
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
      component: () => import('@/views/user/seat'),
      redirect: '/user/seat/choice',
      children: [
        {
          path: '/user/seat/choice',
          name: 'choice',
          component: () => import('@/views/user/seat/choice'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/user/seat/payment',
          name: 'payment',
          component: () => import('@/views/user/payment'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/user/seat/success',
          name: 'success',
          component: () => import('@/views/user/payment/success'),
          meta: {
            keepAlive: true
          }
        }
      ],
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/info/ticket',
      name: 'ticket',
      component: () => import('@/views/user/info/ticket'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/info/card',
      name: 'card',
      component: () => import('@/views/user/info/card'),
      meta: {
        keepAlive: true
      }
    }
  ]
})
