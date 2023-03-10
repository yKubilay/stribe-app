<template>
  <div class="card" :class="{ 'expanded': showMore }" @click="showMore = !showMore">
    <div class="card-content">
      <p>{{ data }}</p>
      <button v-if="!showMore" class="show-more-button">Show More</button>
    </div>
    <div class="expanded-content" v-if="showMore">
      <p>{{ data }}</p>
    </div>
    <div class="background-overlay" v-if="showMore" @click.stop=""></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMore: false
    }
  }
}
</script>

<style>
.card {
  position: relative;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}

.card.expanded {
  height: auto;
}

.card-content {
  padding: 1rem;
}

.show-more-button {
  margin-top: 0.5rem;
}

.expanded-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background-color: white;
  z-index: 1;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}
</style>
