<template>
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
  </template>
  
  <script>
  import { Icon } from '@iconify/vue';
  
  export default {
    components: {
      Icon
    },
    data() {
      return {
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
      };
    },
    methods: {
      toggleFAQ(index) {
        // toggle current faq
        const faq = this.faqList[index];
        faq.isOpen = !faq.isOpen;
        faq.icon = faq.isOpen ? "ic:baseline-minus" : "ic:baseline-plus";
      },
    }
  };
  </script>
  
  <style>
    .faq {
      color: white;
    }
</style>