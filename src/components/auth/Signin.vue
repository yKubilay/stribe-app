<template>
    <div class="login">
      
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

  </template>

<script setup>
  import Navigation from "@/components/Navigation.vue"
  import { ref } from 'vue';
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from 'vue-router';
  import { onMounted } from "vue";
  import { onAuthStateChanged, signOut} from "firebase/auth";
  import { useAuthStore } from '@/stores/auth.js';
  import { useUserStore } from "../../stores/user";
  import { computed } from "vue";
  import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

  const email = ref("");
  const password = ref("");
  const errorMsg = ref();
  const router = useRouter();
  const storeAuth = useAuthStore();
  const storeUser = useUserStore();

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Successfully signed in");
        getUserData(email.value)
          .then((userData) => {
            storeAuth.isLoggedIn = true;
            storeUser.username = userData.username;
            storeUser.email = userData.email;
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(auth.currentUser);
        router.push("/");
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

  const getUserData = async (email) => {
    const db = getFirestore();
    const userDataRef = collection(db, "users");
    const q = query(userDataRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      throw new Error("User data not found");
    }
  };

  const moveToSignUp = () => {
    router.push("/signup");
  };

  const isLoggedIn = computed(() => {
    return storeAuth.isLoggedIn;
  });

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


<!-- <template>
    <div class="login">
      
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

  </template>

<script setup>
    import Navigation from "@/components/Navigation.vue"
    import { ref } from 'vue';
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router';
    import { onMounted } from "vue";
    import { onAuthStateChanged, signOut} from "firebase/auth";
    import { useAuthStore } from '@/stores/auth.js';
    import { useUserStore } from "../../stores/user";
    import { computed } from "vue";


    const email = ref("");
    const password = ref("");
    const errorMsg = ref()
    const router = useRouter()

    //Stores
 /*  const storeAuth = useAuthStore();
  const storeUser = useUserStore(); */

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in");
          
           /*  storeAuth.isLoggedIn = true;
            storeUser.username = username.value; */
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

  const isLoggedIn = computed(() => {
  return storeAuth.isLoggedIn
})


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

</script> -->
    
  <style>


  
  </style>
    