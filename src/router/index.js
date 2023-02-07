import { createRouter, createWebHistory } from 'vue-router'
import  HomeView  from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      component: () => import('../views/GroupsView.vue'),
      meta: { requiresAuth: true, },
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


  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener(); 
        resolve(user);
      },
      reject
    );
  });
};


router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("No access! Sign in or register new account");
      next("/");
    } 
  } else {
    next();
  }
});


export default router
