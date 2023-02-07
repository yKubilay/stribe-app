<template>
    <div class="login">
      
    </div>
  
  <section class="container">
  
  <div class="navbar">
    <h1><router-link to="/">Stribe</router-link></h1>
  
    <nav>
      <ul>
        <li><router-link class="nav-link" to="/groups">Groups</router-link></li>
        <li><router-link class="nav-link" to ="/floorplan">Floorplan</router-link></li>
        <li><router-link class="nav-link" to ="/about">About</router-link></li>
        <li><router-link class="nav-link" to="/signUp">Sign up</router-link></li>
      </ul>
    </nav>
    </div>
    <div class="signUpform">
    <h2 class="mb-3">Login to Stribe</h2>
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

      <div class="alternative-option mt-4">
        Already have an account? <span @click="moveToLogin">Signup</span>
      </div>


    <button type="submit" class="mt-4 btn-pers" id="login_button" @click="login">Login</button>
  </div>
  
    </section>
  </template>
    
  <style>


  
  </style>
    