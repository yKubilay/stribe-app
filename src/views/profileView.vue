<template>
      <Navigation />
      <section class="container">
        <div class="row justify-content-center">
          <div>
            <div class="card">
              <div class="card-header">{{ storeUser.username }}</div>
          <div class="card-body">
            <div>
              <label for="email">Email</label>
  
              <div>
                <input id="email" type="email" class="form-control" name="email" v-model="email" required autocomplete="email" autofocus>
              </div>
            </div>
  
            <div>
              <label for="username">Username</label>
  
              <div>
                <input id="username" type="text" name="username" v-model="username" required autocomplete="username">
              </div>
            </div>
  
            <div>
              <div>
                <button type="submit" class="btn btn-primary" @click="showModal = true">
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Profile</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="showModal = false">Close</button>
          <button type="button" class="btn btn-primary" @click="saveChanges()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import Navigation from '@/components/Navigation.vue';
import { ref, onMounted } from 'vue';
import { auth, db } from '../main.js';

export default {
  components: {
    Navigation,
  },
  setup() {
    // Define reactive data properties
    const showModal = ref(false);
    const storeUser = ref({});
    const username = ref('');
    const email = ref('');

    // Fetch user data on component mount
    onMounted(async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await db.collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            storeUser.value = userDoc.data();
            username.value = userDoc.data().username;
            email.value = userDoc.data().email;
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    });

    // Save changes to user data
    const saveChanges = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          await db.collection('users').doc(user.uid).update({
            username: username.value,
            email: email.value,
          });
          showModal.value = false;
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // Return reactive properties and methods
    return {
      showModal,
      storeUser,
      username,
      email,
      saveChanges
    };
  }
}
</script>
<style>
   
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }


</style>