<template>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    
</head>


<header class="header">

      <router-link to="/" class="logo">Stribe</router-link>

        <input class="side-menu" type="checkbox" id="side-menu"/>
        <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>

        <nav class="nav">
            <ul class="menu">
              <li><router-link to="/">Velkommen {{ storeUser.username }}!</router-link></li>
              <li><router-link to="/groups" :class="{ active: isCurrentPage('/groups') }">Groups</router-link></li>
              <li><router-link to="/floorplan" :class="{ active: isCurrentPage('/floorplan') }">Floorplan</router-link></li>
              <li><router-link to="/about" :class="{ active: isCurrentPage('/about') }">About</router-link></li>
              
              <li v-if="isLoggedIn"><button class="signoutButton" @click="handleSignOut">Sign out</button></li>
              <li v-else><router-link to="/login" :class="{ active: isCurrentPage('/login') }">Sign in</router-link></li>
            </ul>
        </nav>
    </header>


    
<!--     @click="handleSignOut"
 --></template>

<script setup>

/* import { useStore } from 'vuex'
 */
 import { computed } from 'vue';
 import { useAuthStore } from '@/stores/auth.js';
 import { useUserStore } from '@/stores/user.js';
 import { useRouter } from 'vue-router';
/*  import { onAuthStateChanged, signOut} from "firebase/auth";
 */



const router = useRouter()


const storeAuth = useAuthStore();
const storeUser = useUserStore();
 
 

const isCurrentPage = (path) => {
  return window.location.pathname === path
}


const isLoggedIn = computed(() => {
  return storeAuth.isLoggedIn
})




const handleSignOut = () => {
  storeAuth.setLoggedIn(false)
  storeUser.setUsername()
  router.push('/')
}


/* const handleSignOut = () => {
  signOut(auth).then(() => {
    
    router.push("/");
  });
}; */
/* const isLoggedIn = computed(() => {
  return store.getters.isLoggedIn
})

 */

/* const store = useStore()
 */


</script>











<style>
 
body{
    background-color: #FFF;
    font-family: "Poppins", sans-serif;
}
a{
    text-decoration: none;
    font-weight: 400;
    
}
ul{
    list-style: none;
}
.header{
    background: whitesmoke;
    box-shadow: 0px 15px 10px -15px #111;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 99999;
}
#username {
  font-size: 20px;
  margin-top: 19px;
}


.logo{
    display: inline-block;
    color: #008080;
    font-size: 50px;
    font-weight: 400;
    margin-left: 6.5%;
    position: relative; 
}

.logo:after {
  content: '';
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 5px;
  background: linear-gradient(15deg, #008080 0%, #13547a 70%, #80d0c7 100%);
  transition: width 0.3s ease-in-out;
}

.logo:hover {
  color: #008080;
}

.logo:hover:after {
  width: 100%;
  transition: width 0.25s ease-in-out;
}

.nav{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #2F728D;
    overflow: hidden;
}
.nav ul{
  margin-right: 8rem;
}
.menu a{
    display: block;
    padding: 10px;
    color: white;
    width: 100%;
    margin-top: 10px;
    font-size: 14pt;
  }
.nav{
    max-height: 0;
    transition: max-height .5s ease-out;
}

.signoutButton {
  margin-top: 1rem;
}


.menu a:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3.5px;
  background-color: teal;
  transition: width 0.3s ease-in-out;
}
  
.menu a:hover:after {
  width: 100%;
  transition: width 0.25s ease-in-out;
}

nav a.active:after {
  width: 100%;
}

.hamb{
    cursor: pointer;
    float: right;
    padding: 40px 20px;
}
.hamb-line {
    background: black;
    display: block;
    height: 3px;
    position: relative;
    width: 24px;
} 
.hamb-line::before,
.hamb-line::after{
    background: black;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all .2s ease-out;
    width: 100%;
    border-radius: 20px;
}
.hamb-line::before{
    top: 5px;
}
.hamb-line::after{
    top: -5px;
}
.side-menu {
    display: none;
} /* Hide checkbox */
.side-menu:checked ~ nav{
    max-height: 100%;
}
.side-menu:checked ~ .hamb .hamb-line {
    background: transparent;
}
.side-menu:checked ~ .hamb .hamb-line::before {
    transform: rotate(-45deg);
    top:0;
}
.side-menu:checked ~ .hamb .hamb-line::after {
    transform: rotate(45deg);
    top:0;
}
@media (min-width: 1100px) {
    .nav{
        max-height: none;
        top: 0;
        position: relative;
        float: right;
        width: fit-content;
        background: transparent;
    }
    .menu a {
      color: black;
    }
    .menu li{
        float: left;
    }
    .menu a:hover{
        background-color: transparent;
    }
    
    .hamb{
        display: none;
    }
    
  }
  @media (max-width: 1100px) {
    .nav {
      flex-direction: column;
      align-items: flex-start;
    }
    .menu {
      width: 100%;
      display: block;
      text-align: center;
    }
    
    .menu a{
    margin-top: 30px;
  } 
 
 .menu a:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3.5px;
  background-color: white;
  transition: width 0.3s ease-in-out;
}
  

.menu a:hover:after {
  width: 15%;
  transition: width 0.25s ease-in-out;
}
}
</style>