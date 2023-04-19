import { createRouter, createWebHistory } from 'vue-router'
import  HomeView  from '../views/HomeView.vue'
import  AboutView  from '../views/AboutView.vue'
import  GroupsView  from '../views/GroupsView.vue'
import  FloorplanView  from '../views/FloorplanView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView

    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/groups',
      name: 'createGroup',
      component: GroupsView,
      meta: { requiresAuth: true, },
    },
    {
      path: '/floorplan',
      name: 'floorplan',
      component: FloorplanView,
      meta: { requiresAuth: true, },
    },
    {
      path: '/signup',
      name: 'signup',


      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',


      component: () => import('../views/loginView.vue')
    },

    {
      path: '/profile',
      name: 'profile',


      component: () => import('../views/profileView.vue')
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
