<template>
      <Navigation />
      <section class="container" id="profile_container">
        <div class="row justify-content-center">
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
  <div class="modal" tabindex="-1" role="dialog" :class="{ 'd-block': showModal }">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Profile</h5>
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
   
#profile_container {
    max-width: 800px;
    height: 100%;
}
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  height: 100%;
}

.card-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}




.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

.modal-dialog {
  max-width: 500px;
  margin: 100px auto;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.modal-content {
    max-width: 100%;
}

.close {
  position: absolute;
  top: -15px;
  right: 2px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  opacity: 0.8;
  cursor: pointer;
  width: auto;
}

.close:hover {
  opacity: 1;
}

</style>