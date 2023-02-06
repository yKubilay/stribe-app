<template>
  
<section class="container">

  <div class="navbar">
    <h1><router-link to="/">Stribe</router-link></h1>

    <nav>
      <ul>
        <li><router-link class="nav-link" to="/groups">Groups</router-link></li>
        <li><router-link class="nav-link" to ="/floorplan">Floorplan</router-link></li>
        <li><router-link class="nav-link" to ="/about">About</router-link></li>
        <li><router-link class="nav-link" to="/signup">Sign up</router-link></li>

      </ul>

    </nav>


    <img src="src\assets\menuLogo.png" class="menuIcon">
  </div>

  <div class="row">
    <div class="col-1">
        <h2>Welcome to Stribe</h2>  
        <h3>Meet and collaborate with <br>likeminded students!</h3>  
        <button type="button">Get started</button>
        <button type="button">About us</button>
    </div>
  <div class="col-2">
    <img src="src\assets\wplaceNoBg.png" class="homeImage" >
  </div>
</div>



</section>


</template>



<style>


  
</style>
