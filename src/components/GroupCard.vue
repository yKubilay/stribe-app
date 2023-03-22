<template>
   <div class="grid-container" style="overflow-y: scroll; max-height: 700px; width: 350px;">

    <header class="groupsHeader">
      <h1 class="activeGroupsButton">Currently {{ activeGroupsCount }} Groups with {{ activeParticipants }} participants</h1>
      <button @click="$emit('highlight-all-rooms')">Show all rooms</button>
      <input class="searchQuery" type="text" v-model="searchQuery" placeholder="Search for groups, your interests or other users!" />
    </header>
    <div class="card" v-for="(group, index) in groupStore.groups" :key="group.uid" :style="getCardStyle(index)">
      <div class="cardDetailsContainer">
        <div class="cardContent">
          <div class="cardTitle"> {{ group.title }}
            <div class="badgesContainer">
           
            <span v-for="theme in group.themes" :key="theme">
                <span @click=showModal(group) :class="themeClass(theme)">{{ theme }}</span>
                <span :class="themeClass(theme)">{{ new Date(group.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
            </span>            
        
<!--               <span class="badgeCount">{{ group.participants.length }} people</span>
 -->            </div>     
            <div class="cardDescription" @click="showModal(group)">{{ group.description }}</div>
          </div>
        </div>
      </div>
      <div class="buttonGroup">
        <button class="floorplanButton" @click="showModal(group)">Show more</button>
        <button class="floorplanButton" @click="joinRoom(group)">Join room</button>
      </div>
      <div class="cardParticipants" v-if="cardExpanded">
        <h4>Participants</h4>
        <div class="cardParticipants" @click="showModal(group)">{{ group.participants }}</div>

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
            <section class="areaAndParticipantSection">
            <h4>Themes</h4>
            <ul>
            <li v-for="theme in selectedCard.themes" :key="theme">
                <span :class="themeClass(theme)">{{ theme }}</span>
            </li>            
            </ul>
            <h4>Area</h4> 
            <ul>
              <li class="modalGroupArea" v-for="area in selectedCard.areas" :key="area">{{ area }}</li>
            </ul>
            <h4>Participants</h4>
            <ul>
              <li class="modalGroupParticipants" v-for="participant in selectedCard.participants" :key="participant">{{ participant }}</li>
            </ul>
          </section>
            <button class="floorplanButton" @click="joinRoom(group)">Join room</button>


          </div>
        </div>
      </div>
</template>



<script setup>
  import Navigation from "@/components/Navigation.vue";
  import { onMounted, ref, computed } from "vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useUserStore } from '@/stores/user.js';
  import { watchEffect } from "vue";
  import { useGroupStore } from '@/stores/groups';


const groupStore = useGroupStore();


onMounted(() => {
  groupStore.listenToGroups();
});

  function highlightAllRoomsHandler() {
    highlightAllRooms();
  }

  const storeUser = useUserStore();
  const groupTheme = ref('Coding');
  const showTooltip = ref(false);


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



const showForm = ref(false);
const groupTitle = ref('');
const searchQuery = ref('');
const participants = ref(["jack", "johnny", "joe", "jim", "jack", "johnny", "jim", "jack", "johnny", "jim", "jack", "johnny"])
const cardExpanded = ref(false);


function themeClass(theme) {
  if (theme.toLowerCase() === 'coding') {
    return 'theme-coding';
  } else if (theme.toLowerCase() === 'gaming') {
    return 'theme-gaming';
  } else if (theme.toLowerCase() === 'lunch') {
    return 'theme-lunch';
  } else if (theme.toLowerCase() === 'general') {
    return 'theme-general';
  } else if (theme.toLowerCase() === 'reading') {
    return 'theme-reading';
  } else if (theme.toLowerCase() === 'sports') {
    return 'theme-sports';
  } else if (theme.toLowerCase() === 'exam-practice') {
    return 'theme-exam-practice';
  } else {
    return 'default-theme';
  }
}


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

/*   
  function showModal(card) {
    selectedCard.value = {
      title: `Group ${card.id}`,
      description: "certain conclusion in favor of their commercial interests. Reports written by big industry players can still be reliable secondary data, but should optimally be compared to similar reports to check for any bias or ulterior motives.",
      participants: participants.value,
      areas: card.areas,
      themes: card.themes


    };
    modalVisible.value = true;
  }
 */

 async function joinRoom(group) {
  if (!group.participants.includes(userStore.username)) {
    group.participants.push(userStore.username);
    await groupStore.updateGroupParticipants(group.uid, group.participants);
  } else {
    alert("You are already in this group!");
  }
}

 function showModal(card) {
  selectedCard.value = {
    title: card.title,
    description: card.description,
    participants: card.participants,
    areas: card.areas,
    themes: card.themes,
  };
  modalVisible.value = true;
}


  function hideModal() {
    modalVisible.value = false;
    selectedCard.value = null;
  }



function viewOnFloorplan() {

}




/* function removeItem(toRemove) {
  cards.value = cards.value.filter((card) => card !== toRemove);

} */

/* const activeGroupsCount = computed(() => cards.value.length);
 */
/* const activeParticipants = computed(() => (participants.value ? participants.value.length : 0));
 */



  function getCardStyle(index) {
    const delay = index * 100;
    return {
      animationDelay: `${delay}ms`,
      transition: "transform 0.5s",
    };
  }

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
.grid-container {
    display: grid;
    grid-template-columns: 1fr;
    margin-right: 1rem;
    width: 300px;
    gap: 1rem;
    left: 0;
    z-index: 999;
    
  }

  
  .grid-container::-webkit-scrollbar {
/*   display: none; 
 */ 
  }

  .card {
    background-color: #353e57;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }



  .cardDescription {
    font-size: 1.1rem;
  }

  .activeGroupsButton {
    font-size: 1.8rem;

  }

  .floorplanButton {
    font-size: 18px;
    padding:5px;
    margin-right: 1rem;
    background: #008080;
 
  }

  .grid-container {
    position: relative;
  }

  .searchQuery {
    border: 2px solid black;
  }

</style>