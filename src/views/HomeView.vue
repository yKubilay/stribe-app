<template>
  

  
  <svg class="svg" viewBox="-50 -80 175 300" xmlns="http://www.w3.org/2000/svg">
      <path fill="#2E728D" d="M35.9,-45.4C50.5,-46.5,68.9,-43.2,72.5,-33.6C76.1,-24,64.9,-8.1,62.5,9C60.1,26.2,66.5,44.7,61.8,57.7C57,70.6,41,78,25.9,77.6C10.8,77.1,-3.5,68.8,-14.6,60.5C-25.7,52.3,-33.6,44.1,-41.2,35.6C-48.8,27,-56.1,18.1,-59.2,7.5C-62.2,-3,-61,-15.1,-52.9,-20.5C-44.8,-25.9,-29.8,-24.5,-19.8,-25.4C-9.9,-26.4,-4.9,-29.8,2.9,-34.2C10.7,-38.7,21.4,-44.3,35.9,-45.4Z" transform="translate(100 100)" />
    </svg>

 


    <Navigation/>


<section class="container">
 

  <div class="row">
    <div class="col-1">
        <h2>Welcome to Stribe</h2>  
        <h3>Meet and collaborate with likeminded students!</h3>  

        <div class="button-container">
    <router-link to="/signup">
    <button class="homeButton" type="button" slot-scope="{navigate}">Get started</button>
  </router-link>
  <router-link to="/about">
    <button class="homeButton" type="button" slot-scope="{navigate}">About us</button>
  </router-link>
        </div>
    </div>
  <div class="col-2">
    <img src="/src/assets/images/wplaceNoBg.png" class="homeImage" >
   
  </div>


</div>

</section>


  

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
.button {
  font-size: 14px;
  padding:2px;
  margin-top: -0%;
/*     background: #2F728D;
*/    background: #008080;
}

@media (hover: hover) {
 
 h1 a:hover {
   border-bottom: 4px solid #2b91b9;
 }
}

@media only screen and (max-width:1300px) {

   .row {
     width: 1000px;
     margin: 8px 0;
   }

   .col-1 { 
     padding: 0 12px 0 100px;
     width: 100%;
   }
   .col-1::after {
     position: absolute; 
     right: 400px; 
   }
   .col-1 h2 {
     
     font-size: 40px;
     width: 80%;
   }
   
   .col-1 h3 {
     font-size: 24px;
     width: 80%;
   }
   .col-2 {
     flex-basis: 100%;
     justify-content: center;
   } 
  /*  .firstFloor {
=======
   .firstFloor {

     padding-top: 10%;
     width: 100%;
     height: 0;
     padding-top: 10%;
     padding-bottom: 100%; 
     position: relative
   } */
  /*  .firstFloorSVG {
     position: absolute;
     width: 100%;
     height: 100%;
   
   } */
  }
@media only screen and (max-width:768px) { 
 
 
  .svg {
   display: none;
 }


 .col-1 {
   margin-top: 40px;
   padding: 10px 15px 0 30px;
   margin: 20px;
 }
 .col-1 h2 {
   font-size: 30px;
 }
 .col-1 h4{
   font-size: 7px;
 }

 .col-1 .homeButton {
  font-size: 12pt;
  margin-left: 10px;
  
 }
 .col-2 .homeImage {
   width: 40%;
   margin-top: 40px;
 }
}


</style>