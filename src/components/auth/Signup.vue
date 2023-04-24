<template>
    <div class="floorplan">
      
    </div>
  
    
    <div class="authRow">
    <div class="signUpform">
    <h2 class="mb-3">Create an account</h2>
    <div class="input">
        <label for="name">Username</label>
          <InputText
            class="form-controlUsername"
            type="text"
            v-model="username"
            placeholder="Username"
          />  
          <div class="input">
            <label for="faculty">Faculty</label>
            <Dropdown 
                class="form-control"
                v-model="selectedFaculty" 
                :options="facultyOptions" 
                optionLabel="label" 
                optionGroupLabel="label"
                optionGroupChildren="items"
                placeholder="Select your faculty" required
            />
          </div>
    <div class="input">
        <label for="email">Email</label>
          <InputText
            class="form-control"
            type="text"
            v-model="email"
            placeholder="Email@adress.com"
          />
      </div>
        <div class="input">
          <label for="password">Password</label>
            <InputText
              class="form-control"
              type="password"
              v-model="password"
              placeholder="Password1!"
            />
        </div>
  
      <div class="altOptionAuth">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
      </div>
  
  
  
  <button type="submit" class="mt-4 btn-pers" id="login_button" @click="signup">Sign up</button>
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
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';

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
    const selectedFaculty = ref("");
    const facultyOptions = ref([
      
    {
      label: 'Fakultet for helse, velferd og organisasjon',
      items: [
        {label: 'Institutt for sykepleie, helse og bioingeniørfag'},
        {label: 'Institutt for velferd, ledelse og organisasjon'}
      ]
    },
    {
      label: 'Fakultet for lærerutdanningar og språk',
      items: [
        {label: 'Institutt for språk, litteratur og kultur'},
        {label: 'Institutt for pedagogikk, IKT og læring'},
        {label: 'Institutt for real-, praktisk-estetiske, samfunns- og religionsfag'},
        {label: 'Nasjonalt senter for engelsk og fremmedspråk i opplæringa'},

      ]
    },
    {
      label: 'Fakultet for informasjonsteknologi, ingeniørfag og økonomi',
      items: [
        {label: 'Institutt for informasjonsteknologi og kommunikasjon'},
        {label: 'Institutt for ingeniørfag'},
        {label: 'Institutt for økonomi, innovasjon og samfunn'},

      ]
    },
    ]);
    
    const signup = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value, selectedFaculty.value.label)
        .then(async (data) => {
          console.log("User is registered");

          const userDocRef = doc(db, "users", data.user.uid);
          await setDoc(userDocRef, {
            username: username.value,
            faculty: selectedFaculty.value.label,
            email: email.value,
            uid: data.user.uid,
          });
          storeAuth.isLoggedIn = true;
          storeUser.username = username.value;
          storeUser.faculty = selectedFaculty.value.label;
          router.push('/');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.code);
        });
    };
    
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });
  </script>
<style scoped>
.form-controlUsername {
  width: 99%;
}

/* .form-control {
  width: 100%;
} */
</style>