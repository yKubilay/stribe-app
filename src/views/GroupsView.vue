<template>
  <Navigation />
  
  <div class="container">
    <header class="groupsHeader" :class="{sticky: stickyHeader}">

    <h1 class="activeGroupsButton">Currently {{ activeGroupsCount }} Groups with {{ activeParticipants }} participants</h1>
      <input type="text" v-model="searchQuery" placeholder="Search for groups, your interests or other users!" />
  </header>

    <section class="basic-grid">
      <div class="card create-group-card" :style="formStyle" @click="toggleForm">
        <form :class="{form: showForm}"></form>
        <h2 class="createGroup" v-if="!showForm">Create group</h2>
        <div class="plusSymbol" v-if="!showForm">+</div>
        <div class="formContainer" v-else>
       
        <div class="buttonGroup">
          <button class="floorplanButton">Create</button>
          <button class="floorplanButton" @click="toggleForm">Cancel</button>
        </div>
        </div>
      </div>

    
      <div class="card" v-for="(card, index) of cards" :key="card" :style="getCardStyle(index)">
        <div class="cardContent">
          
        <div class="cardTitle">Group {{ card }}</div>
        
          <div class="cardDescription">
        Short description of group
        </div>
       <div class="cardParticipants" v-if="isCardExpanded">
        <h4>Participants</h4>
        <ul class="participantsList">
        <li v-for="(participants, index) in participants" :key="index">{{ participants }}</li>  
        </ul>
       </div>
        </div>

        <div class="buttonGroup">
            <button class="floorplanButton" @click="toggleCard">Show more</button>
            <button class="floorplanButton" @click="joinRoom">Join room</button>
          </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import Navigation from "@/components/Navigation.vue";
  import { onMounted, ref, computed } from "vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useUserStore } from '@/stores/user.js';

  const storeUser = useUserStore();


  const isLoggedIn = ref(false);
  let auth;

onMounted(() => {
auth = getAuth();
onAuthStateChanged(auth, (user) => {
if (user) {
isLoggedIn.value = true;
} else {
isLoggedIn.value = false;
}
});
});

const cards = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const showForm = ref(false);
const groupTitle = ref('');
const groupDescription = ref('');
const searchQuery = ref('');
const participants = ref(["jack", "johnny", "joe", "jim", "jack", "johnny"])
const isCardExpanded = ref(false);




function toggleForm() {
  if (showForm.value === false) {
    showForm.value = true;
  } else {
    showForm.value = true;
  }
}

function toggleCard() {
  if (isCardExpanded.value === false) {
    isCardExpanded.value = true;
  } else {
    isCardExpanded.value = false;
  }
}



function viewOnFloorplan() {

}

function joinRoom() {
  if (!participants.value.includes(username.value)) {
    participants.value.push(username.value);
  } else {
    alert("You are already in a group!");
  }
}



/* function removeItem(toRemove) {
  cards.value = cards.value.filter((card) => card !== toRemove);

} */

const activeGroupsCount = computed(() => cards.value.length);
const activeParticipants = computed(() => participants.value.length);




  function getCardStyle(index) {
    const delay = index * 100;
    return {
      animationDelay: `${delay}ms`,
      transition: "transform 0.5s",
    };
  }

    const stickyHeader = ref(false);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 100) { 
        stickyHeader.value = true;
      } else {
        stickyHeader.value = false;
      }
    });

 const username = computed(() => {
  return storeUser.username
})


</script>
<style>
  .activeGroupsButton {
    margin-bottom: 1%;
  }



  .createGroup {
    font-size: 45px;  
    color: #edf6f9;   
  }

  .groupsHeader {
    background-color: #F5F0E7;
  
  }

  .create-group-card {
  text-align: center;
}

  .formContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }


  


 .card:hover {
  transform: scale(1.05);
}

.expanded {
  height: auto;
}
  input[type="text"], textarea {
    width: 100%;
    padding: 8px;
    font-size: 16px;
  }

  .basic-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 5%;
    margin-top: 2%;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));

  }

  .buttonGroup {
    display: flex;
    justify-content: center;
    margin-top: 5%;
  }
  
  .floorplanButton {
    font-size: 18px;
    padding:5px;
/*     background: #2F728D;
 */    background: #008080;
 
  }

  .plusSymbol {
    font-size: 80px;
     
  }
 



  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #353e57;
    font-size: 3rem;
    color: white;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
      rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 300px;
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    overflow: hidden;
    position:relative;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transform: translate(-10%, -10%);
  }

  .card:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transform: translateY(-10px);
}

.cardContent {
    text-align: left;
}

  .cardTitle {
   font-size: 2rem;
   color: #edf6f9;   
   text-align: left;

}


  .cardDescription {
    font-size: 1.3rem;
    color: #edf6f9;    /*    margin-bottom: 1rem;
    margin-bottom: 25%; */
    text-align: left;
    margin-top: 20%;

  }

  .cardParticipants {
    list-style-type: none;
    font-size: 1.3rem;

  }

  .participantsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: left;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .participantsList li {
    flex: 1 0 calc(50% - 16px);
    max-width: calc(50% - 16px);
    margin: 8px;
    text-align: center;
  }



  .card:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    
  }

  

  .fixed-card {
   /*    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    );  */ 
    background: linear-gradient(15deg, #13547a, #80d0c7); /* primary color */

  }

  /* animate cards */
  @keyframes cardAnimation {
    from {
      opacity: 0;
      transform: translate(-10%, -10%);
    }
    to {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  .card:nth-child(odd) {
    animation-name: cardAnimation;
    animation-duration: 0.5s;
    animation-delay: 0ms;
    animation-fill-mode: forwards;
  }

  .card:nth-child(even) {
    animation-name: cardAnimation;
    animation-duration: 0.5s;
    animation-delay: 0ms;
    animation-fill-mode: forwards;
  }
</style>