<template>
  

  
<!--   <svg class="svg" viewBox="-50 -80 175 300" xmlns="http://www.w3.org/2000/svg">
      <path fill="#2E728D" d="M35.9,-45.4C50.5,-46.5,68.9,-43.2,72.5,-33.6C76.1,-24,64.9,-8.1,62.5,9C60.1,26.2,66.5,44.7,61.8,57.7C57,70.6,41,78,25.9,77.6C10.8,77.1,-3.5,68.8,-14.6,60.5C-25.7,52.3,-33.6,44.1,-41.2,35.6C-48.8,27,-56.1,18.1,-59.2,7.5C-62.2,-3,-61,-15.1,-52.9,-20.5C-44.8,-25.9,-29.8,-24.5,-19.8,-25.4C-9.9,-26.4,-4.9,-29.8,2.9,-34.2C10.7,-38.7,21.4,-44.3,35.9,-45.4Z" transform="translate(100 100)" />
    </svg>
 -->
 


    <Navigation/>




  <div class="container">
  <div
   v-for = "i in 6"
   class="card">
   <header class="card-header">
    <p class="card-header-title">
      Coding
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      <p>Learn Vue with Firebase and state management.....</p>
      <a href="#"></a>. <a href="#"></a> <a href="#"></a>
      <br>
      <time datetime="2016-1-1"></time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">View floorplan</a>
    <a href="#" class="card-footer-item">Join group</a>
<!--     <a href="#" class="card-footer-item">Delete</a>
 -->  </footer>
</div>
</div>


</template>

<script setup>
    import Navigation from "@/components/Navigation.vue"   
    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged} from "firebase/auth";

    const isLoggedIn = ref(false); 

let auth;
onMounted (() => {
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

<style>

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-header {
  display: flex;
  background: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  }

  

</style>