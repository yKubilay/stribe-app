<template>
    <div class="authRow">
    <div class="signUpform">
    <h2 class="mb-3">Create an account</h2>
    <div class="input">
        <label for="name">Full name</label>
          <input
            class="form-control"
            type="text"
            v-model="name"
            placeholder="Full name"
          />  
    <div class="input">
        <label for="email">Email</label>
          <input
            class="form-control"
            type="text"
            v-model="email"
            placeholder="email@adress.com"
          />
      </div>
        <div class="input">
          <label for="password">Password</label>
            <input
              class="form-control"
              type="password"
              v-model="password"
              placeholder="password123"
            />
        </div>

      <div class="altOptionAuth">
        Already have an account? <span @click="moveToLogin"> Login</span>
      </div>
      </div>



<button type="submit" class="mt-4 btn-pers" id="login_button" @click="signup">Signup</button>
</div>
  </div>
</template>