<template>
  <div class="home">
  
    <div class="info">
      <h1>Meet new people with the same interest</h1>
      <h4>Join events or Create your own!</h4>
    </div>

    <div class="imgMain">
      <img src="../assets/work.png" alt="Logo">
    </div>
    
    <div class="button">
      <Button class="joinButton">Join</Button>
      <Button class="createButton">Create</Button>
    </div>

    <div class="homeText">
      shdbfjbfhweoubwebdkhsbdkb jbfhfbsk fwe bkhebk bwerbw ebkdb bewbb b eb b 
      ebwhebf hj ebr wbfo befow o bwe qhqhv qf
       qhv jwe qo ho qheoi hqou bqo ou qouhr ouqruoqr 
        qhbejwhbe hrv   qbe khqer hqb ob kiqv 
    </div>
    


    
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
  margin: 7%;

}

.info {
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 20px;
  color:black;
}

.button {
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  padding: 20px;
  grid-column-gap: 50px;
}
.joinButton, .createButton{
  background-color: orange;
  border-radius: 20px;
  color: white;
  padding: 10px 20px;
  border: none;
  height: 30%;
}


.imgMain {
  grid-column: 3 / 4;
  grid-row: 1 / 4;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden
}

.imgMain img {
  flex-shrink: 0;
  min-width: 30%;
  min-height: 50%
}

.homeText {
  grid-column: 1 / 3;
  grid-row: 3 / 5;
  font-size: medium;
  color: black;
}
 
}
</style>
