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
            question: "What is the color code for red?",
            answer: "Red color dot is for coding relevant work",
            icon: "ic:baseline-plus",
            isOpen: false,
          },
          {
            question: "What is the color code for blue?",
            answer: "Blue color dot is for coding non-relevant work",
            icon: "ic:baseline-plus",
            isOpen: false,
          },
          {
            question: "What is the color code for green?",
            answer: "Green color dot is for coding testing",
            icon: "ic:baseline-plus",
            isOpen: false,
          },
          {
            question: "What is the color code for yellow?",
            answer: "Yellow color dot is for coding non-coding work",
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
  