
<template>
  <link rel="stylesheet" href="assets/swiper-bundle.min.css"/>
  
  <div class="about">
    
  </div>

  <Navigation/>


    <section class="slide_container">
      <div class="slide_content">
        <div class="card-wrapper">
          <div class="card">
            <div class="image-content">
              <span class="overlay"></span>
              <div class="card-image">
                <img src="/src/assets/images/img_1.png" alt="" class="card-img"/>
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

  
  

</template>

<script setup>

    import Navigation from "@/components/Navigation.vue"
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
