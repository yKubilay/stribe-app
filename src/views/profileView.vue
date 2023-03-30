<template>
  <Navigation />
  <section class="container" id="profile_container">
    <div class="row justify-content-center">
      <div class="profile_card">
        <div class="card-header"><Icon id="user_icon" icon="mdi:user-box" width="50" height="50"></Icon>{{ storeUser.username + "'s profile" }}</div>
        <div class="card-body">
          <div>
            <label for="email">Email</label>
            <div>
              <InputText type="text" id="email" name="email" v-model="email" required autocomplete="email"  />
            </div>
            
          </div>

          <div>
            <label for="username">Username</label>
            <div>
              <InputText type="text"  id="username" name="username" v-model="username" required autocomplete="username" />

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
                <InputText type="text" class="form-control" id="username" name="profile_username" v-model="username" placeholder="Username" />
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <InputText type="text" class="form-control" id="email" name="profile_email" v-model="email" placeholder="Email"/>

              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="showModal = false">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="saveChanges()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { ref, onMounted } from "vue";
import { auth, db } from "@/firebase";
import { Icon } from "@iconify/vue";
import InputText from 'primevue/inputtext';

export default {
  components: {
    Navigation,
    Icon,
    InputText
  },
  setup() {
    // Define reactive data properties
    const showModal = ref(false);
    const storeUser = ref({});
    const username = ref("");
    const email = ref("");

    // Fetch user data on component mount
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
    width: 50%;
    
}
.profile_card {
  height: 100%;
  padding: 20px;
  background: #353e57;
  color: white;
  position: relative;
  left: 0;
  border-radius: 0.5rem;
  
}

.card-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;  
}

.p-inputtext {
  border-radius: 0;
}



#user_icon {
  margin: 10px;
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
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 500px;
  margin-top: -200px; 
  background-color: none;
  
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.modal-content {
    max-width: 100%;
    border-radius: 0.5rem;
    
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

.btn-primary {
  --bs-btn-bg: teal;
  --bs-btn-border-color: rgb(0, 105, 105);
  --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: rgb(0, 105, 105);
    --bs-btn-hover-border-color: rgb(0, 105, 105);
    border-radius: 0;
}
.btn-secondary {
  position: relative;
  left: -50px;
  border-radius: 0;
}
@media only screen and (max-width: 768px) {
  #profile_container {
    width: 100%;
    display: flex;
  }

  .profile_card {
    height: 50%;
  }

}

</style>