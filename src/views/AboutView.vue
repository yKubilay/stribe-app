<template>
  <NavigationBar/>
  <div class="project_description_container">
      <h1>Stribe</h1>
      <p>Stribe is an online platform exclusively for students to connect, create meetups, and support each other towards graduating. Join us today and start making meaningful connections with other students on your academic journey!</p>
      <section class="faqs">
      <h2>FAQs</h2>
      <div class="faqs_container">
        <article class="faq" v-for="(faq, index) in faqList" :key="index" @click="toggleFAQ(index)">
          <div class="faq_icon"><Icon :icon="faq.icon"></Icon></div>
          <div class="question_answer">
            <h4>{{ faq.isOpen ? faq.answer : faq.question }}</h4>
          </div>
        </article>
      </div>
    </section>
      <br/>
      <h1 style="text-align: center;">Stribes' developers</h1>
      <p>Swipe to see Stribe's developers</p>
  </div>
  
  <section class="container" id="about_container">
    <!-- your swiper content here -->
  
  <swiper
    :slidesPerView="isMobile ? 1 : 2"
    :pagination="{
      clickable: true,
      dynamicBullets: true,
    }"
    :navigation="true"
    :keyboard="true"
    :modules="modules"
    class="my_swiper"
  >
  <swiper-slide>
      <div class="slide-container">
        <div class="slide-content">
          <div class="card-wrapper">
            <div class="about_card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_1.jpg" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name">{{ currentPerson }}Kubilay Kerim Özdemir</h2>
                  <p class="description" v-if="isExpanded">
                    24 years old.
                    <br/>
                    Interests: Programming, yoyoing, tech <br/>
                    In my leisure time, I enjoy traveling, playing
                    video games, being with friends and keeping up with software-related content
                  </p>
                  <p class="description" v-else>
                    24 years old.
                    <br/>
                    Project leader and Scrum Master
                  </p>
                  <button class="about-button"  @click="isExpanded = !isExpanded">{{ isExpanded ? 'Read less' : 'Read more' }}</button>
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
            <div class="about_card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_2.jpg" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name" data-name="Kasper">Kasper Iversen</h2>
                  <p class="description" v-if="isExpanded">
                    23 years old.
                    <br/>
                    Interests: Football, training and programming. <br/>
                    In my spare time, I play video
                    games, take care of my dog, strength training, work and code websites for
                    fun and for learning.
                  </p>
                  <p class="description" v-else>
                    23 years old.
                    <br/>
                    Development Team Coding
                  </p>
                  <button class="about-button" @click="isExpanded = !isExpanded">{{ isExpanded ? 'Read less' : 'Read more' }}</button>
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
            <div class="about_card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_3.jpg" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name" data-name="Håvard">Håvard Solheim Jenssen</h2>
                  <p class="description" v-if="isExpanded">
                    23 years old.
                    <br/>
                    Interests: Handball, training, programming <br/>
                    I generally like engaging in different sports and activities,
                    which includes gaming and a general interest in tech.
                  </p>
                  <p class="description" v-else>
                    23 years old.
                    <br/>
                    Development Team Design
                  </p>
                  <button class="about-button" @click="isExpanded = !isExpanded">{{ isExpanded ? 'Read less' : 'Read more' }}</button>
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
            <div class="about_card">
              <div class="image-content">
                <span class="overlay"></span>

                <div class="card-image">
                  <img src="../assets/images/img_4.jpg" alt="img 1" class="card-img">
                </div>
              </div>

              <div class="card-content">
                  <h2 class="name" data-name="Zach">Zachary Rotea Laguda</h2>
                  <p class="description" v-if="isExpanded">
                    23 years old.
                    <br/>
                    Interests: Volleyball, training and programming. <br/>
                    In my sparetime I like to work out, spend time with my girlfriend and play volleyball and video games.
                  </p>
                  <p class="description" v-else>
                    26 years old.
                    <br/>
                    Secretary and Product Owner
                  </p>
                  <button class="about-button" @click="isExpanded = !isExpanded">{{ isExpanded ? 'Read less' : 'Read more' }}</button>
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
  import { Keyboard, Pagination, Navigation} from 'swiper';
  import { Icon } from '@iconify/vue';
  

  export default {
    components: {
      Swiper,
      SwiperSlide,
      NavigationBar,
      Icon,
    },
    data() {
      return {
        isExpanded: false,
        faqList: [
          {
            question: "Is Stribe only for students?",
            answer: "Yes, Stribe is exclusively for students who are currently enrolled in HIOF.",
            icon: "ic:baseline-plus",
            isOpen: false,
          },
          {
            question: "How can Stribe help me graduate?",
            answer: "Stribe provides a supportive community where you can connect with other students who are also striving to graduate. By creating meetups and providing support to each other, you can stay motivated and on track towards achieving your academic goals.",
            icon: "ic:baseline-plus",
            isOpen: false,
          },
          {
            question: "How do I join Stribe?",
            answer: "To join Stribe, simply create an account using your email address and provide a username and a secure password. You can then start exploring the web app and create meetups.",
            icon: "ic:baseline-plus",
            isOpen: false,
          },
          {
            question: "Is Stribe free to use?",
            answer: "Yes, Stribe is completely free to use for all students.",
            icon: "ic:baseline-plus",
            isOpen: false,
          },
        ],
        isMobile: window.innerWidth <= 768
      };
    },
    methods: {
      toggleFAQ(index) {
        // toggle current faq
        const faq = this.faqList[index];
        faq.isOpen = !faq.isOpen;
        faq.icon = faq.isOpen ? "ic:baseline-minus" : "ic:baseline-plus";
      },
      checkIsMobile() {
        this.isMobile = window.innerWidth <= 768;
      }
    },
    setup() {
      return {
        modules: [Keyboard, Pagination, Navigation],
      };
    },

    mounted() {
      window.addEventListener('resize', this.checkIsMobile);
    }
};
  
</script>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

  }
  .faq {
      color: white;
    }
#about_container {
  min-height: 70vh;
  justify-content: space-between;
}

.my_swiper {
  position: relative;
  z-index: 0;
  
}

.blur {
  filter: blur(5px);
}



  /* FAQ - Frequently asked questions */
  
  .faqs {
    opacity: 0.9;
    margin: 10px;
    padding: 10px;
    
}

.faqs_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    color: white;
}

.faq {
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 1.4rem;
    height: fit-content;
    background: #353e57;
    cursor: pointer;
    font-style: bold;
} 

.faq h4 {
    font-size: 1rem;
    line-height: 2.2;
    font-weight: bold;
}

.faq_icon {
    align-self: flex-start;
    font-size: 1.2rem;
}
.faq p {
    margin-top: 0.8rem;
    display: none;
}
.faq.open p {
    display: block;
}

  h3 {
    color: #F5F0E7;
  }
  .project_description_container{
    text-align: center;
    margin-top: 20px;
  }

    .swiper{
      display: flex;
    }


  .swiper-slide {
    display: flex !important;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    background: #F5F0E7;
  }
  
  .slide-container {
    max-width: 1120px;
  }
  .about_card {
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
    background-color: #353e57;
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
    background-color: #353e57;
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
    border: solid 4px #353e57;
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
    background: #353E57;
  }
  .project_description_container p {
    border: solid 3px #353e57;
    margin: 20px;
    padding: 20px;
    font-size: large;
  }


  @media only screen and (max-width: 768px) {
    .about_card {
      width: 100%;
    }
  }
</style>