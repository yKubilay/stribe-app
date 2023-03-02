import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/js/bootstrap.js";
import './assets/main.css'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_0D3f_dHAMZKHOFurQYZTXw_3HRSApvE",
      authDomain: "stribe-45c45.firebaseapp.com",
      projectId: "stribe-45c45",
      storageBucket: "stribe-45c45.appspot.com",
      messagingSenderId: "600262032115",
      appId: "1:600262032115:web:075361b29f34cb3edc9586",
      measurementId: "G-WWNZTQ9LQ4"
    // ...
  };

  initializeApp(firebaseConfig)
const app = createApp(App)

app.use(createPinia())
app.use(router)


app.mount('#app')
// Get a Firestore instance





