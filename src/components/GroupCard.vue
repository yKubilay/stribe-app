<template>

    <header class="groupsHeader" v-if="props.isUsedInFloorPlan">
      <h1 class="activeGroupsButton">
        Currently {{ groupStore.groups.length }} Groups with {{ groupStore.totalParticipants }} participants

      </h1>
      <button class="floorplanButton" @click="$emit('highlight-all-rooms')">Show all rooms</button>
      <button class="floorplanButton" @click="$emit('highlight-all-rooms')">Create group</button>

      <InputText type="text" id="searchQuery" name="meeting-title" v-model="groupTitle" placeholder="Search for groups, themes or other users!" style=" border-radius: 0;" />
    </header>




    <div class="card" v-for="(group, index) in groupStore.groups" :key="group.uid" :style="getCardStyle(index)">
      <div class="cardDetailsContainer">
        <div class="cardContent">
          <div class="cardTitle">
            <div class="mainTitle" @click="showModal(group)">{{ group.title }}</div>

                    
            <div class="outerBadgesContainer">
            <div class="createdAtContainer">
              <span :class="themeClass(group.themes[0])" class="themeBadge">{{ moment(group.createdAt).fromNow() }}</span>
            </div>

            <div class="badgesContainer">
              <span v-if="group.themes.length > 0" class="themeBadge" @click="showModal(group)" :class="themeClass(group.themes[0])">
                {{ group.themes[0] }} <span v-if="group.themes.length > 1">+{{ group.themes.length - 1 }}</span>
              </span>
              <span :class="themeClass(group.themes[0])" class="themeBadge">{{ group.participants.length }} people</span>
            </div>
          </div>
          
          <div class="cardDescription" @click="showModal(group)">{{ group.description }}</div>
          
        </div>
      </div>

     </div><div class="buttonGroup">
        <button class="floorplanButton" @click="showModal(group)">Show more</button>
        <button v-if="isUserInGroup(group)" class="leaveRoomButton" @click="leaveRoom(group)">Leave Room</button>
        <button v-else class="floorplanButton" @click="joinRoom(group)">Join Room</button>
      </div>
    
      <div class="cardParticipants" v-if="cardExpanded">
        <h4>Participants</h4>
        <div class="cardParticipants" @click="showModal(group)">{{ group.participants }}</div>

      </div>
    </div>


        <div class="modal" v-if="modalVisible" @click.self="hideModal">
        <div class="modal-content" @click.stop>
          
          <div class="modal-card">
            <section class="modal-header">
              
              <button class="closeButton" @click="hideModal">X</button>
              
              <h2>{{ selectedCard.title }}</h2>
            </section>
            <h4 class="modalDescriptionStyling">Description</h4>

            <p class="modal-description">{{ selectedCard.description }}</p>
            <section class="areaAndParticipantSection">
            <h4>Themes</h4>
            <ul>
            <li v-for="theme in selectedCard.themes" :key="theme">
              <span class="themeBadge" :class="themeClass(theme)">{{ theme }}</span>
            </li>            
          </ul>
            <h4>Area</h4>
            <ul>
<!--             <li v-for="room in selectedCard.room" :key="room">
 -->               {{ selectedCard.room }}<!-- </li> -->
               
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

<Message severity="error" text="An error occurred" />


</template>



<script setup>
  import Navigation from "@/components/Navigation.vue";
  import { onMounted, ref, computed } from "vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useUserStore } from '@/stores/user.js';
  import { watchEffect } from "vue";
  import { useGroupStore } from '@/stores/groups';
  import { defineProps } from 'vue';
  import { defineComponent } from 'vue';
  import InputText from 'primevue/inputtext';
  import moment from 'moment';
  import ErrorModal from '@/components/ErrorModal.vue';
  import Message from 'primevue/message';


const userStore = useUserStore();
const groupStore = useGroupStore();


onMounted(() => {
  groupStore.listenToGroups();
});

  function highlightAllRoomsHandler() {
    highlightAllRooms();
  }

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


const errorModalRef = ref(null);

const showForm = ref(false);
const groupTitle = ref('');
const searchQuery = ref('');
/* const participants = ref(["jack", "johnny", "joe", "jim", "jack", "johnny", "jim", "jack", "johnny", "jim", "jack", "johnny"])
 */const cardExpanded = ref(false);


function toggleForm() {
  showForm.value = !showForm.value;
}

function showError(message) {
  errorMessage.value = message;
  showErrorModal.value = true;
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



function showModal(card) {
  selectedCard.value = {
    title: card.title,
    description: card.description,
    participants: card.participants,
    room: card.room,
    themes: card.themes,
  };
  modalVisible.value = true;
}

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
  } else if (theme.toLowerCase() === 'assignment work') {
    return 'theme-assignment-work';
  } else if (theme.toLowerCase() === 'exam-practice') {
    return 'theme-exam-practice';
  } else {
    return 'default-theme';
  }
}

  function hideModal() {
    modalVisible.value = false;
    selectedCard.value = null;
  }

  const props = defineProps({
    isUsedInFloorPlan: { type: Boolean, default: false },
  });


function viewOnFloorplan() {

}

function joinRoom(group) {
  const loggedInUserName = userStore.username;

  const userInGroup = group.participants.includes(loggedInUserName);
  if (userInGroup) {

    alert('You are already in this group!');
    return;
  }

  const inAnotherGroup = groupStore.groups.some(g => g.participants.includes(loggedInUserName));
  if (inAnotherGroup) {

    alert('You are already in this group!');
    return;
  }

  const updatedParticipants = [...group.participants, loggedInUserName];
  groupStore.updateGroupParticipants(group.id, updatedParticipants);
}


function leaveRoom(group) {
  const loggedInUserName = userStore.username;
  const updatedParticipants = group.participants.filter(
    participant => participant !== loggedInUserName
  );
  
  groupStore.updateGroupParticipants(group.id, updatedParticipants);
}


 
 const activeParticipants = computed(() => (participants.value ? participants.value.length : 0));


function isUserInGroup(group) {
  const loggedInUserName = userStore.username;
  return group.participants.includes(loggedInUserName);
}



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


   defineComponent({
    setup() {
      return { message }
    }
  })

</script>

<style scoped>


  .themeClass {
    margin: 5%;
  }

 

  .themeBadge {
  margin-right: 1rem;
}
  
  .grid-container::-webkit-scrollbar {
/*   display: none; 
 */ 
  } 

  .closeButton {
  width: 4.5rem;
  margin-right: 3rem;
}

  .card {
    background-color: #353e57;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }


  
  
   /* Conditionally rendering theme colors */
   .theme-coding {
      background-color: #F88621;
      color: #582E03;
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;
    }.theme-gaming {
      background-color: #6F0A75;
      color: #E99EEE; 
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;
    }.theme-lunch {
      background-color: #9B6413;
      color: #FCE2B5; 
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;
    }
      .theme-assignment-work {
      background-color: #9B6413;
      color: #FCE2B5; 
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;

    } .theme-general {
      background-color: #D6D2D0;
      color: #453F3B; 
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;
    }.theme-reading {
      background-color: #007EBD;
      color: #BFEBFE; 
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;
    }.theme-sports {
      background-color: #BA1729;
      color: #FCBBC0; 
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;
    }.theme-exam-practice {
      background-color: #FBBC22;
      color: #624808; 
      font-weight: 550;
      font-size: 1rem;
      border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      cursor:pointer;
    }

    .mainTitle {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.mainTitle:hover {
  text-decoration: underline;
}


  .leaveRoomButton {
    font-size: 1rem;
    padding:5px;
    background: #BA1729;
    margin: 0;

  }
 
  .cardDescription {
    font-size: 1.1rem;
  }

  .activeGroupsButton {
    font-size: 1.8rem;

  }

  .modalDescriptionStyling {
    margin-left: 1rem;
  }

  .floorplanButton {
    font-size: 1rem;
    padding:5px;
    background: #008080;
    margin: 0;

  }


  span .themeBadge {
    margin-right: 0.5rem;
  }
 
  .badgesContainer::after {
  content: " ";
  display: block;
  width: 100%;
  border-bottom: 3px solid lightgray;
}


  
  .searchQuery {
    border: 2px solid black;
  }


</style>