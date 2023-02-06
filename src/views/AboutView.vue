<template>
  <div class="about">
    
  </div>

  <section class="container">

<div class="navbar">
  <h1><router-link to="/">Stribe</router-link></h1>

  <nav>
    <ul>
      <li><router-link class="nav-link" to="/">Home</router-link></li>
      <li><router-link class="nav-link" to="/groups">Groups</router-link></li>
      <li><router-link class="nav-link" to ="/floorplan">Floorplan</router-link></li>
      <li><router-link class="nav-link" to ="/about">Groups</router-link></li>
    </ul>
  </nav>


  <img src="src\assets\menuLogo.png" class="menuIcon">
  </div>
    </section>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
