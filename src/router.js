import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Store from '@/module/store'

Vue.use(VueRouter)

const basePath = '/bitnews'

const Router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'home' } }, // 首页进入重定向到home
    {
      path: basePath + '/home',
      name: 'home',
      component: Home
    },
    {
      path: basePath + '/guess',
      name: 'guess',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "guess" */ './views/Guess.vue')
    },
    {
      path: basePath + '/invest-calendar',
      name: 'investCalendar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "invest-calendar" */ './views/InvestCalendar.vue')
    },
    { // 资讯详情页
      path: basePath + '/news/detail',
      name: 'news-detail',
      component: () => import('./views/news/Detail.vue')
    },
    { // 登录页面
      path: basePath + '/login/login',
      name: 'login',
      component: () => import('./views/login/Login.vue')
    },
    { // 注册页面
      path: basePath + '/login/register',
      name: 'register',
      component: () => import('./views/login/Register.vue')
    },
    /** 用户中心相关开始----------------------------------------------------------------------- */
    { // 用户中心首页
      path: basePath + '/user',
      name: 'user',
      component: () => import('./views/user/index.vue'),
      children: [
        {
          name: 'userInfo',
          path: '',
          meta: {
            title: '基本信息'
          },
          component: () => import('./views/user/components/userinfo.vue')
        },
        {
          name: 'userModifyPassword',
          path: 'modifyPassword',
          meta: {
            title: '修改登录密码'
          },
          component: () => import('./views/user/components/modifyPassword.vue')
        },
        {
          name: 'userMyGuess',
          path: 'myGuess',
          meta: {
            title: '我的预测'
          },
          component: () => import('./views/user/components/myGuess.vue')
        },
        {
          name: 'userTask',
          path: 'task',
          meta: {
            title: '任务中心'
          },
          component: () => import('./views/user/components/userTask.vue')
        }
      ]
    }
    /** 用户中心相关结束----------------------------------------------------------------------- */
  ]
})

Router.afterEach((to, from, next) => {
  Store.dispatch('switchTab', to.name)
})

export default Router
