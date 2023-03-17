<template>
<Navigation v-if="!hideNavigation" :class="{ 'hidden': hideNavigation, 'Navigation': true }" />
  
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
            <button class="floorplanButton" >Cancel</button>
          </div>
        </div>
      </div>

      <div class="card" v-for="(card, index) of cards" :key="card" :style="getCardStyle(index)">
        <div class="cardContent">
          <div class="cardTitle">Group {{ card.id }}
          </div>
          <span class="themeBadge">{{groupTheme}} </span> 
          <span class="participantsBadge">{{activeParticipants}} People</span> 
          
          <div class="cardDescription" @click="showModal(card)"> readability with the use of significant indentation. </div>
          <div class="cardParticipants" v-if="cardExpanded">
            <h4>Participants</h4>
           
          </div>
        </div>
        
        <div class="buttonGroup">
          <button class="floorplanButton" @click="showModal(card)">Show more</button>
          <button class="floorplanButton" @click="joinRoom">Join room</button>
        </div>
      </div>

      <div class="modal" v-if="modalVisible" @click.self="hideModal">
        <div class="modal-content" @click.stop>
          
          <div class="modal-card">
            <section class="modal-header">
              <button class="closeButton" @click="hideModal">X</button>
              <h2>{{ selectedCard.title }}</h2>
            </section>
            
            <p class="modal-description">{{ selectedCard.description }}</p>
            <section class="areaAndParticipantSection">
            <h4>Area</h4>
            <ul>
              <li class="modalGroupArea" v-for="area in selectedCard.areas" :key="area">{{ area }}</li>
            </ul>
            <h4>Participants</h4>
            <ul>
              <li class="modalGroupParticipants" v-for="participant in selectedCard.participants" :key="participant">{{ participant }}</li>
            </ul>
          </section>
            <button class="floorplanButton" @click="joinRoom">Join room</button>

          </div>
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
  import { watchEffect } from "vue";

  const storeUser = useUserStore();
  const groupTheme = ref('Coding');


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

const cards = ref([
  {
    id: 1,
    areas: ["area1", "area2"],
    participants: ["jack", "johnny", "joe", "Zac", "Håvard"]
  },
  {
    id: 2,
    areas: ["area3", "area4"],
    participants: ["jim", "jack", "johnny"]
  },
   {
    id: 3,
    areas: ["area5", "area6"],
    participants: ["jim", "jack", "johnny"]
   },
   {
    id: 3,
    areas: ["area5", "area6"],
    participants: ["jim", "jack", "johnny"]
   }
])


const showForm = ref(false);
const groupTitle = ref('');
const searchQuery = ref('');
const participants = ref(["jack", "johnny", "joe", "jim", "jack", "johnny", "jim", "jack", "johnny", "jim", "jack", "johnny"])
const cardExpanded = ref(false);




function toggleForm() {
  showForm.value = !showForm.value;
}




function toggleCard() {
  if (cardExpanded.value === false) {
    cardExpanded.value = true;
    showModal(card);
  } else {
    cardExpanded.value = false;
    hideModal();
  }
}

  const modalVisible = ref(false);
  const selectedCard = ref(null);

  
  function showModal(card) {
    selectedCard.value = {
      title: `Group ${card.id}`,
      description: "certain conclusion in favor of their commercial interests. Reports written by big industry players can still be reliable secondary data, but should optimally be compared to similar reports to check for any bias or ulterior motives.",
      participants: participants.value,
      areas: card.areas

    };
    modalVisible.value = true;
  }

  function hideModal() {
    modalVisible.value = false;
    selectedCard.value = null;
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
/* 
  const hideNavigation = ref(false);

  onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
      hideNavigation.value = true;
      stickyHeader.value = true;
    } else {
      hideNavigation.value = false;
      stickyHeader.value = false;
    }
  });
}); */


 const username = computed(() => {
  return storeUser.username
})

watchEffect(() => {
    const navigation = document.querySelector('.navigation');
    if (navigation) {
      if (hideNavigation.value) {
        navigation.classList.add('hidden');
      } else {
        navigation.classList.remove('hidden');
      }
    }
  });

</script>
<style>


  .activeGroupsButton {
    margin-bottom: 1%;
  }

  .groupsHeader {
    background-color: #F5F0E7;
    margin-top: 2%;
  
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

  .areaAndParticipantSection {
    margin-left: 1rem;
  }

  .buttonGroup {
    display: flex;
    justify-content: center;
  }
  
  .floorplanButton {
    font-size: 18px;
    padding:5px;
    margin-top: -0%;
/*     background: #2F728D;
 */    background: #008080;
 
  }

  .closeButton {
    font-size: 18px;
    padding:5px;
    position: absolute;
    top: 1%;
    right: -0.8rem;
    background: #008080;
    cursor: pointer;
    z-index: 1;

  }

  


  .createGroup {
    font-size: 45px; 
    margin-top: 16%; 
    color: #edf6f9;   
    cursor: pointer;

  }

  .plusSymbol {
    font-size: 80px;
    margin-bottom: 20%;
    cursor: pointer;
     
  }

  .participantsBadge {
      background-color: #F98620;
      color: white;
      font-size: 0.7rem;
      padding:2.5px;
      margin-left: 3%;
      text-align: center;
      border-radius: 4rem;
  }

  .themeBadge {
    background-color: #F98620;
      color: white;
      font-size: 0.7rem;
      padding:2.5px;
      width: 15%;
      margin-left: 0%;
      margin-bottom: -8.5%;
      margin-top: 15%;
      text-align: center;
      border-radius: 4rem;
/*       border-bottom: 1px 3pxsolid white;
 */  }
 

 
   .card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  width: 100%;
  background: #353e57;
  color: white;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  border-radius: 4px;
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
  transform: translateY(-10px);
}

.cardContent {
    text-align: left;
    margin-left: 2rem;
}

  .cardTitle {
   font-size: 2rem;
   color: #edf6f9;   
   text-align: left;

}

.Navigation {
  transform: translateY(0%);
  transition: transform 0.5s ease-in-out;
  transition-duration: 3s;
}

.Navigation.hidden {
  transform: translateY(-100%);
}
  .cardDescription {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 1.1rem;
    color: #edf6f9;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;
    margin-top: 5%;
  }

  .modalGroupArea {
    font-size: 1.1rem;
  }


  .cardDescription:hover {
  text-decoration: underline;
}

  .cardParticipants {
    list-style-type: none;
    font-size: 1.1rem;

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

  /*Modal that pops up when "Show more" is pressed*/
  .modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
  will-change: transform, opacity;
  font-size: 1.2rem;

  
}


.modal-content {
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.4);
  background-color: #353E57;
  color: white;
  max-width: 50%;
  max-height: 90%;
  overflow: auto;
  

}

.modal-description {
  margin-top: 2%;
  margin-left: 2rem;
  font-size: 1.1rem;
}

.modalGroupParticipants {
  font-size: 1.1rem;
}



  .close {
    top: 10px;
    font-size: 30px;
/*     font-weight: bold;
 */    cursor: pointer;
  }
  
  .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-left:0;
  padding-right:0;
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


  @media(max-width: 768px) {
    .modal-content {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.4);
  background-color: #353E57;
  color: white;
  
  max-width: 90%;
  max-height: 100%;
  overflow: auto;
  }

  .container {
    max-width: 100%;
    padding: 0.5rem;
  }

  .basic-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));

  }

  .closeButton {
    font-size: 1rem;
    padding: 3px 6px;
  }

}

</style>