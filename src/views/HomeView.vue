<template>
  <div class="home">
  
    <div class="info">
      <h1>Meet new people with the same interest</h1>
      <h4>Join events or Create your own!</h4>
    </div>

    <div id="img">
      <img src="../assets/group.png" alt="Logo">
    </div>
    
    <div id="button">
      <Button class="join">Join</Button>
      <Button class="create">Create</Button>
    </div>

    


    
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 7%;

}

.info {
  grid-column-start: 1;
  grid-column-end: 2;
  padding: 20px;
}

#button {
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  padding: 20px;
}

img {
  grid-column-start: 2;
  grid-column-end: 3;
  width: 100%;
  height: auto;
  object-fit: cover;
}
 
}
</style>
