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
            v-model="username"
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
  
  <username usernames/>
  <isLoggedIn.value isLogged/>
  
  </template>
  
    
  <script setup>
    import Navigation from "@/components/Navigation.vue"
    import { useRouter } from 'vue-router';
    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged,  createUserWithEmailAndPassword} from "firebase/auth";
    import { getFirestore, doc, setDoc } from "firebase/firestore";
    import { useAuthStore } from '@/stores/auth.js';
    import { useUserStore } from "../../stores/user";
    const db = getFirestore();
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const router = useRouter()
    const isLoggedIn = ref(false);
    //Stores
    const storeAuth = useAuthStore();
    const storeUser = useUserStore();
    const auth = getAuth();
    
    
    const signup = () => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/; // Regex pattern for password
        if (!passwordRegex.test(password.value)) {
        alert("Password must be at least 6 characters long and contain at least 1 number and 1 special character.");
        return;
      } 
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (data) => {
          console.log("User is registered");
          // Add user to Firestore collection
          const userDocRef = doc(db, "users", data.user.uid);
          await setDoc(userDocRef, {
            username: username.value,
            email: email.value,
            uid: data.user.uid,
          });
          storeAuth.isLoggedIn = true;
          storeUser.username = username.value;
          router.push('/');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.code);
        });
    };
    const moveToLogin = () => {
        router.push('/login')
    };
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });
  </script>
