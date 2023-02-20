<script></script>

<template>
 
<nav class="navbar navbar-expand-lg bg-light navbar-fixed-top width">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/floorplan">Floorplan</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to ="/groups">Groups</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
</template>


<style>

.navbar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    
}


</style>