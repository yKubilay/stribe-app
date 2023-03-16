<template>
    <div class="grid-container" style="overflow-y: scroll; max-height: 700px; width: 350px;">
      <header class="groupsHeader" :class="{sticky: stickyHeader}">

          <h1 class="activeGroupsButton">Currently {{ activeGroupsCount }} Groups with {{ activeParticipants }} participants</h1>
          <input type="text" v-model="searchQuery" placeholder="Search for groups, your interests or other users!" />
          </header>
          <div class="card" v-for="(card, index) of cards" :key="card" :style="getCardStyle(index)">
            
               <div class="cardContent">
          <div class="cardTitle">Group {{ card.id }}</div>
          <div class="cardDescription" @click="showModal(card)">Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. </div>
          <div class="cardParticipants" v-if="cardExpanded">
            <h4>Participants</h4>
           
          </div>
        </div>
        <div class="buttonGroup">
          <button class="floorplanButton" @click="showModal(card)">Show more</button>
          <button class="floorplanButton" @click="joinRoom">Join room</button>
        </div>
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
            <h4>Area</h4>
            <ul>
              <li v-for="area in selectedCard.areas" :key="area">{{ area }}</li>
            </ul>
            <h4>Participants</h4>
            <ul>
              <li v-for="participant in selectedCard.participants" :key="participant">{{ participant }}</li>
            </ul>
            <button class="floorplanButton" @click="joinRoom">Join room</button>

          </div>
        </div>
      </div>

</template>

<script setup>
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

const cards = ref([
  {
    id: 1,
    areas: ["area1", "area2"],
    participants: ["jack", "johnny", "joe"]
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
    id: 4,
    areas: ["area5", "area6"],
    participants: ["jim", "jack", "johnny"]
   }
])


const showForm = ref(false);
const groupTitle = ref('');
const searchQuery = ref('');
const participants = ref(["jack", "johnny", "joe", "jim", "jack", "johnny"])
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
.grid-container {
    display: grid;
    grid-template-columns: 1fr;
    width: 300px;
    gap: 1rem;
    left: 0;
    
  }
  
  .grid-container::-webkit-scrollbar {
/*   display: none; 
 */ 
  }

  .card {
    background-color: #353e57;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .activeGroupsButton {
    font-size: 1.8rem;

  }

 
</style>