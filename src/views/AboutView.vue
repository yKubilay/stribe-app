<template>
  <NavigationBar/>
  <div class="project_description_container">
      <h3>Stribe</h3>
      <h4>Frequently asked questions</h4>
      <p>Why did we choose to make Stribe?</p>
      <p>Her skal vi skrive litt om prosjektet</p>
      <h1 style="text-align: center;">Stribes' developers</h1>
  </div>
  
  <section class="container">
  <swiper
    :slidesPerView="1"
    :navigation="true"
    :pagination="{
      clickable: true,
    }"
    :keyboard="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <div class="slide-container">
        <div class="slide-content">
          <div class="card-wrapper">
            <div class="card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_1.png" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name">Kasper Iversen</h2>
                  <p class="description">
                    23 years old.
                    <br/>
                    Interests: Football, training and programming. 
                  </p>
                  <button class="about-button">Les mer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide-container">
        <div class="slide-content">
          <div class="card-wrapper">
            <div class="card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_2.jfif" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name">Håvard Solheim Jenssen</h2>
                  <p class="description">
                    23 years old.
                    <br/>
                    Interests: Handball, training, programming and freesbee-golf. 
                  </p>
                  <button class="about-button">Les mer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide-container">
        <div class="slide-content">
          <div class="card-wrapper">
            <div class="card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_3.jfif" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name">Zachary Laguda</h2>
                  <p class="description">
                    25 years old(?).
                    <br/>
                    Interests: Volleyball, training and programming. 
                  </p>
                  <button class="about-button">Les mer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide-container">
        <div class="slide-content">
          <div class="card-wrapper">
            <div class="card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_4.jpg" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name">Kubilay Kerim Özdemir</h2>
                  <p class="description">
                    24 years old.
                    <br/>
                    Interests: yo-yo and programming. 
                  </p>
                  <button class="about-button">Les mer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</section>
</template>
<script>
import NavigationBar from '../components/Navigation.vue';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/css';

import "swiper/css/pagination";
import "swiper/css/navigation";

  // import required modules
  import { Keyboard, Pagination, Navigation } from 'swiper';

  export default {
    components: {
      Swiper,
      SwiperSlide,
      NavigationBar 
    },
    setup() {
      return {
        modules: [Keyboard, Pagination, Navigation],
      };
    },
  };
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  
  
  h3 {
    color: #F5F0E7;
  }
  .project_description_container{
    text-align: center;
  }
  .swiper-slide {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F5F0E7;
  }
  .slide-container {
    max-width: 1120px;
    
  }
  .card {
    border-radius: 35px;
    background-color: #fff;
    width: 500px;
  }

  .image-content {
    position: relative;
    row-gap: 5px;
  }

  .image-content,
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 14px;
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: teal;
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
    background-color: teal;
  }

  .overlay::after {
    border-radius: 0 25px 0 0;
    background-color: #fff;
  }
  .card-image {
    position: relative;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background: #fff;
    padding: 3px;
    margin: 25px;
  }

  .card-image .card-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: solid 4px teal;
  }

  .name {
    font-size: 23px;
    font-weight: 600;
    color: #333;
  }
  .description {
    font-size: 18px;
    color: #242222;
    text-align: center;
    font-weight: 500;
  }
  .about-button {
     border: none;
     font-size: 18px;
     color: #fff;
     padding: 8px 16px;
     background: rgb(45, 185, 231);
     border-radius: 6px;
     margin: 14px;
     cursor: pointer;
     transition: all 0.3 ease;
  }

  .about-button:hover {
    background: #4cd1ca;
  }
</style>