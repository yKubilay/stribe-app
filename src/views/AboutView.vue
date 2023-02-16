
<template>
  <link rel="stylesheet" href="assets/swiper-bundle.min.css"/>
  
  <div class="about">
    
  </div>

  <section class="content">
    <svg class="svg" viewBox="-50 -80 175 300" xmlns="http://www.w3.org/2000/svg">
      <path fill="#2E728D" d="M35.9,-45.4C50.5,-46.5,68.9,-43.2,72.5,-33.6C76.1,-24,64.9,-8.1,62.5,9C60.1,26.2,66.5,44.7,61.8,57.7C57,70.6,41,78,25.9,77.6C10.8,77.1,-3.5,68.8,-14.6,60.5C-25.7,52.3,-33.6,44.1,-41.2,35.6C-48.8,27,-56.1,18.1,-59.2,7.5C-62.2,-3,-61,-15.1,-52.9,-20.5C-44.8,-25.9,-29.8,-24.5,-19.8,-25.4C-9.9,-26.4,-4.9,-29.8,2.9,-34.2C10.7,-38.7,21.4,-44.3,35.9,-45.4Z" transform="translate(100 100)" />
    </svg>
<div class="navbar">
  <h1><router-link to="/">Stribe</router-link></h1>

  <nav>
    <ul>
      <li><router-link class="nav-link" to="/groups">Groups</router-link></li>
      <li><router-link class="nav-link" to ="/floorplan">Floorplan</router-link></li>
      <li><router-link class="nav-link" to ="/about">About</router-link></li>
      <li><button class="signoutButton" @click="handleSignOut" v-if="isLoggedIn">Sign out</button></li>
    </ul>
  </nav>
  </div>
  </section>

    <section class="slide_container">
      <div class="slide_content">
        <div class="card-wrapper">
          <div class="card">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <img src="src/assets/img_1.png" alt="" class="card-img"/>
              </div>
            </div>

            <div class="card-content">
              <h2 class="name">Kasper Iversen</h2>
                <p class="description">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, sunt?
                </p>
                
                <button class="about_btn">View More</button>
            </div>
          </div>
        </div>
      </div>
      
    </section>
      <!-- info section -->
  <section class="info_section ">

<div class="container">
  <div class="info_top ">
    <div class="row ">
      <div class="col-sm-6 col-sm-5">
        <div class="info_detail">
          <a href="/">
            <h3>
              Stribe
            </h3>
          </a>
          <p>
            Soluta odit exercitationem rerum aperiam eos consectetur impedit delectus qui reiciendis, distinctio, asperiores fuga labore a? Magni natus.
          </p>
          <div class="social_box">
            <a href="">
              <Icon icon="ic:baseline-facebook" width="100"/>
            </a>
            <a href="">
              <Icon icon="mdi:twitter" width="30"/>
            </a>
            <a href="">
              <Icon icon="mdi:linkedin" width="30"/>
            </a>
            <a href="">
              <Icon icon="mdi:instagram" width="30"/>
            </a>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 mx-auto">
        <h3>
          Contact us
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <div class="contact_nav">
          <a href="">
            <Icon icon="material-symbols:location-on-outline"/>
            <span>
              Location
            </span>
          </a>
          <a href="">
            <Icon icon="material-symbols:smartphone-outline"/>
            <span>
              Call : +47 1234567890
            </span>
          </a>
          <a href="">
            <Icon icon="ic:baseline-email"/>
            <span>
              Email : student@stribe.com
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
<!-- end info_section -->

</template>

<script setup>


    import { Icon } from '@iconify/vue';
    import { useRouter } from 'vue-router';   
    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";

  
   
    

    const isLoggedIn = ref(false); 
    const router = useRouter()

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
 

.info_section {
  background-color: #091f27;
  color: #ffffff;
}



.info_section .contact_nav a {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  margin: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  color: #ffffff;
  margin-bottom: 10px;
}

.info_section .contact_nav a i {
  font-size: 22px;
  margin-right: 10px;
}

.info_section .contact_nav a:hover {
  color: teal;
}

.info_section .info_top {
  padding: 45px 0;
}

.info_section h4 {
  text-transform: uppercase;
  position: relative;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 600;
}

.info_section .social_box {
  width: 80%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 25px;
}

.info_section .social_box a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 18px;
  margin-right: 10px;
}

.info_section .social_box a:hover {
  color: teal;
  border-color: blue;
}


.slide_container {
  max-width: 1120px;
  width: 100%;
  background-color: grey;
  padding: 40px 0; 
}

.slide_content {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}


.card {
  width: 320px;
  border-radius: 25px;
  background-color: #FFF;
  
}

.image-content, 
.card-content  {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
}

.image-content {
  position: relative;
  row-gap: 5px;
  padding: 25px 0;
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #4070F4;
  border-radius: 25px 25px 0 25px;
}

.overlay::before,
.overlay::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -40px;
  height: 40px;
  width: 40px;
  background-color: #4070F4;
}

.overlay::after {
  border-radius: 0 25px 0 0;
  background-color: #FFF;
}
.card-image {
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: #FFF;
  padding: 3px; 
}

.card-image .card-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #4070F4;
}

.name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.description {
  font-size: 14px;
  color: #707070;
  text-align: center;
}

</style>
