<template>
    <div class="groups">
      </div>
  
      <svg class="svg" viewBox="-50 -80 175 300" xmlns="http://www.w3.org/2000/svg">
        <path fill="#2E728D" d="M35.9,-45.4C50.5,-46.5,68.9,-43.2,72.5,-33.6C76.1,-24,64.9,-8.1,62.5,9C60.1,26.2,66.5,44.7,61.8,57.7C57,70.6,41,78,25.9,77.6C10.8,77.1,-3.5,68.8,-14.6,60.5C-25.7,52.3,-33.6,44.1,-41.2,35.6C-48.8,27,-56.1,18.1,-59.2,7.5C-62.2,-3,-61,-15.1,-52.9,-20.5C-44.8,-25.9,-29.8,-24.5,-19.8,-25.4C-9.9,-26.4,-4.9,-29.8,2.9,-34.2C10.7,-38.7,21.4,-44.3,35.9,-45.4Z" transform="translate(100 100)" />
      </svg>
    <Navigation/>
    
      
  <div class="container">
    <h1>Create a Meetup</h1>
    <form @submit.prevent="createMeetup">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="title" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input id="location" v-model="location" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input id="imageUrl" v-model="imageUrl" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input id="date" v-model="date" type="date" class="form-control">
      </div>
      <div class="form-group">
        <label for="time">Time</label>
        <input id="time" v-model="time" type="time" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Create Meetup</button>
    </form>
  </div>
</template>
<script>
    import Navigation from '../components/Navigation.vue';
    import  db  from '../firebase.js'
export default {
  data() {
    return {
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      date: '',
      time: ''
    }
  },
  components: {
    Navigation
  },
  methods: {
    async createMeetup() {
      // Create a new meetup object with the form data
      const meetup = {
        title: this.title,
        description: this.description,
        location: this.location,
        imageUrl: this.imageUrl,
        date: this.date,
      }
      /
      db.collection('meetups').add(meetup)
      // Clear the form data
      this.title = ''
      this.description = ''
      this.location = ''
      this.imageUrl = ''
      this.date = ''
      this.time = ''
    }
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  font-weight: bold;
}
</style>