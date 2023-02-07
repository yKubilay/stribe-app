import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

      component: () => import('../views/HomeView.vue')

    },
    {
      path: '/about',
      name: 'about',
      component: 'AboutView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: 'GroupsView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroupsView.vue')
    },
    {
      path: '/floorplan',
      name: 'floorplan',
      component: 'FloorplanView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroupsView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: 'SignupView',


      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: 'loginView',


      component: () => import('../views/loginView.vue')
    },


  ]
})

export default router
