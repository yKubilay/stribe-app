<template>
    <div class="login">
      
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

        
      </ul>
    </nav>
    </div>

    <div class="authRow">
    <div class="signUpform">
    <h2 class="mb-3">Login to Stribe</h2>
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
        Already have an account? <span @click="moveToSignUp">Signup</span>
      </div>


    <button type="submit" class="mt-4 btn-pers" id="login_button" @click="login">Login</button>
  </div>
</div>

    </section>
  </template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router';

    const email = ref("");
    const password = ref("");
    const errorMsg = ref()
    const router = useRouter()

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in");
            console.log(auth.currentUser)
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errorMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errorMsg.value = "No account with this email";
                    break;
                case "auth/wrong-password":
                    errorMsg.value = "Incorrect password";
                    break;
                default:
                    errorMsg.value = "Email or password was incorrect";
                    break;
            }
        });
    };

  const moveToSignUp = () => {
   router.push("/signup");
  };

</script>
    
  <style>


  
  </style>
    