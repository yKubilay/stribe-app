<template>
    <div class="floorplan">
      
    </div>
  
    
    <div class="authRow">
    <div class="signUpform">
    <h2 class="mb-3">Create an account</h2>
    <div class="input">
        <label for="name">Full name</label>
          <input
            class="form-control"
            type="text"
            v-model="name"
            placeholder="Full name"
          />  
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
      </div>



<button type="submit" class="mt-4 btn-pers" id="login_button" @click="signup">Signup</button>
</div>
  </div>
  </template>
  
    
  <script setup>
    import Navigation from "@/components/Navigation.vue"
    import { useRouter } from 'vue-router';
    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged,  createUserWithEmailAndPassword } from "firebase/auth";


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

  


</script>