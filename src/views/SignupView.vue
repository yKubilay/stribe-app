<template>
    <div class="floorplan">
      
    </div>
  
    <section class="container">
  
  <svg class="svg" viewBox="-50 -80 175 300" xmlns="http://www.w3.org/2000/svg">
      <path fill="#2E728D" d="M35.9,-45.4C50.5,-46.5,68.9,-43.2,72.5,-33.6C76.1,-24,64.9,-8.1,62.5,9C60.1,26.2,66.5,44.7,61.8,57.7C57,70.6,41,78,25.9,77.6C10.8,77.1,-3.5,68.8,-14.6,60.5C-25.7,52.3,-33.6,44.1,-41.2,35.6C-48.8,27,-56.1,18.1,-59.2,7.5C-62.2,-3,-61,-15.1,-52.9,-20.5C-44.8,-25.9,-29.8,-24.5,-19.8,-25.4C-9.9,-26.4,-4.9,-29.8,2.9,-34.2C10.7,-38.7,21.4,-44.3,35.9,-45.4Z" transform="translate(100 100)" />
    </svg>

  <div class="navbar">
    <h1><router-link to="/">Stribe</router-link></h1>

    <nav>
        <img src="/src/assets/menuLogo.png" class="menuLogo">
      <div class="navLinks">
      <ul>
        <li><router-link class="nav-link" to="/groups">Groups</router-link></li>
        <li><router-link class="nav-link" to ="/floorplan">Floorplan</router-link></li>
        <li><router-link class="nav-link" to ="/about">About</router-link></li>
        <li><router-link class="nav-link" to="/signup">Sign up</router-link></li>
        <li><button class="signoutButton" @click="handleSignOut" v-if="isLoggedIn">Sign out</button></li>
      </ul>
    </div>
    </nav>


  </div>
    
    <div class="authRow">
    <div class="signUpform">
    <h2 class="mb-3">Create an account</h2>
      <div class="input">
        <label for="email">Email</label>
          <input
            class="form-control"
            type="text"
            v-model="email"
            placeholder="email@adress.com"
          />
      </div>
        <div class="input">
          <label for="password">Password</label>
            <input
              class="form-control"
              type="password"
              v-model="password"
              placeholder="password123"
            />
        </div>

      <div class="altOptionAuth">
        Already have an account? <span @click="moveToLogin"> Login</span>
      </div>



<button type="submit" class="mt-4 btn-pers" id="login_button" @click="signup">Signup</button>
</div>
  </div>
    </section>
  </template>
  
    
  <script setup>




    import { useRouter } from 'vue-router';
    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";


    const email = ref("");
    const password = ref("");
    const router = useRouter()

    const signup = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Successfully registered");
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.code);
        });
    };

    const moveToLogin = () => {
        router.push('/login')
    };

 
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};

   

        


  </script>
  
  
  <style>


  
  </style>
    