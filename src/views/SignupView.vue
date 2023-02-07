<template>
    <div class="floorplan">
      
    </div>
  
  <section class="container">
  
  <div class="navbar">
    <h1><router-link to="/">Stribe</router-link></h1>
  
    <nav>
      <ul>
        <li><router-link class="nav-link" to="/groups">Groups</router-link></li>
        <li><router-link class="nav-link" to ="/floorplan">Floorplan</router-link></li>
        <li><router-link class="nav-link" to ="/about">About</router-link></li>
        <li><router-link class="nav-link" to="/signUp">Sign up</router-link></li>
        <li><router-link class="nav-link" to="/login">Login</router-link></li>
        <li><button @click="handleSignOut" v-if="isLoggedIn">Sign out</button></li>
      </ul>
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
    