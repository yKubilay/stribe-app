<template>
<Navigation v-if="!hideNavigation" :class="{ 'hidden': hideNavigation, 'Navigation': true }" />
  
  <div class="container" >
    <GroupsHeader @search-query-changed="searchQuery = $event"/>
    
    
 
    <section class="basic-grid">

      <div class="card create-group-card" :style="formStyle" @click="toggleForm" v-if="groupStore.groups.length > 0">
        <form :class="{form: showForm}"></form>
        <router-link to="/floorplan">
        <h2 class="createGroup">Create group</h2>
        <div class="plusSymbol">+</div>

        </router-link>
        <div class="formContainer">
          <div class="buttonGroup">
          
      </div>
        </div>
      </div>

      <GroupCard
        :search-query="searchQuery"
        :sort-criterias="sortCriterias"
      />


    </section>
  </div>
</template>

<script setup>
  import Navigation from "@/components/Navigation.vue";
  import { onMounted, ref, computed } from "vue";
  import GroupCard from "@/components/GroupCard.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useUserStore } from '@/stores/user.js';
  import { watchEffect } from "vue";
  import  { useGroupStore } from '@/stores/groups.js';
  import 'primeicons/primeicons.css';
  import Dropdown from 'primevue/dropdown';
  import MultiSelect from 'primevue/multiselect';
import GroupsHeader from "../components/groupsHeader.vue";

  const storeUser = useUserStore();
  const groupTheme = ref('Coding');
  const showTooltip = ref(false);
  const groups = useGroupStore();
  const groupStore = useGroupStore();
  const unsubscribe = ref(null);


  const groupsTitle = computed(() => {
  return groups.title
})


 
const sortedParticipants = computed(() => {
  let sorted = participants.value.slice();

  if (sortCriteria.value === 'participantsDescending') {
    sorted.sort((a, b) => {
      const aParticipants = groupStore.participants[a] ? groupStore.participants[a].length : 0;
      const bParticipants = groupStore.participants[b] ? groupStore.participants[b].length : 0;
      return bParticipants - aParticipants;
    });
  } else if (sortCriteria.value === 'participantsAscending') {
    sorted.sort((a, b) => {
      const aParticipants = groupStore.participants[a] ? groupStore.participants[a].length : 0;
      const bParticipants = groupStore.participants[b] ? groupStore.participants[b].length : 0;
      return aParticipants - bParticipants;
    });
  }

  return sorted;
});




  const themes = [
    { label: 'Coding', value: 'Coding' },
    { label: 'Gaming', value: 'Gaming' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'General', value: 'General' },
    { label: 'Reading', value: 'Reading' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Exam Practice', value: 'Exam Practice' },
  ];      


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

const selectedThemes = ref([]);
const sortCriteria = ref('newestToOldest');
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

const activeGroups = computed(() => groupStore.groups.value);
  console.log(activeGroups);


function toggleForm() {
  showForm.value = !showForm.value;
}

const sortCriterias = [
  { name: 'Newest to Oldest', value: 'newestToOldest' },
  { name: 'Oldest to Newest', value: 'oldestToNewest' },
  { name: 'Participants Descending', value: 'participantsDescending' },
  { name: 'Participants Ascending', value: 'participantsAscending' },
];








function clearSelectedThemes() {
  selectedThemes.value = [];
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
      title: card.title,
      description: "certain conclusion in favor of their commercial interests. Reports written by big industry players can still be reliable secondary data, but should optimally be compared to similar reports to check for any bias or ulterior motives.",
      participants: participants.value,
      areas: card.areas,
      themes: card.themes


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
<style >

  .buttonGroup {
    gap: 2rem;
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
  /*   .badgesContainer {
      display: flex;
      padding-bottom: 5px; 
      border-bottom: 2px solid lightgray; 

} */

/* .badgesContainer {
  display: flex;
  padding-bottom: 5px;
  margin: 2%;
  border-bottom: 2px solid lightgray; 
  } */


    .themeBadge {
      background: #F8860D;
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
   }
/* 
  .activeGroupsButton {
    margin-bottom: 1%;
    font-size: 2rem;
    border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
      background: #008080;
      color: white;
  }

  .activeFiltersButton {
    margin-bottom: 1%;
    font-size: 2rem;
    border-radius: 0.3rem;
    padding: 0.1rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background: #008080;
    color: white;
    margin-left: 75%;
  } */

  .activeFiltersButton {
    border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
      background: #008080;
      color: white;
  }

  .activeGroupsButton {
    border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
/*       width: 49%;
 */      font-size: 2.15rem;
      background: #037171;
/*       background: #353E57;
 */      color: white;
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


/*   .floorplanButton {
    color:White;
    text-decoration: none;
  }
 */
  


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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }




  /*     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 */
  

  .areaAndParticipantSection {
    margin-left: 1rem;
  }


    

  .buttonGroup {
    display: flex;
    justify-content: space-between;
  }
 
  .span {
    font-weight: 750;
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

 /*  .participantsBadge, .themeBadge {
    font-size: 0.8rem;
    padding:5px;
    position: absolute;
    top: 1%;
    border-radius: 0.6rem;
    right: -0.8rem;
    background: #F8860D;
    color: #582E03;
    font-weight: 600;
    cursor: pointer;
    z-index: 1;
  }

   */


   .participantsBadge,.themeBadge {
    font-size: 0.8rem;
/*     background:#F5F0E7;
 */  
/*     color: #000000;
 */    font-weight: 750;
    border-radius: 0.3rem;
    padding: 0.1rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    
   }


 
   .card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  width: 100%;
  background: #353e57;
  color: white;

  border-radius: 4px;
  overflow: hidden;
  position:relative;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: 0.5s;


}
.cardTitle {
  font-size: 1.5rem;
  color: #edf6f9;
  text-align: left;
  max-width: 100%;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.buttonGroup {
  display: inline-flex;

  justify-content: space-between;
  max-width: 100%;
}

 .badgesContainer {
  width: 300px;
} 

.cardContent {
    text-align: left;
    
}



  .cardTitle {
   font-size: 1.5rem;
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
    font-size: 1rem;
    color: #edf6f9;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;
    margin-top: 0.5rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
  }

  .modalGroupArea {
    font-size: 1.1rem;
  }

  .badge-separator {
  display: block;
  width: 90%;
  height: 0.1rem;
  background-color: #e6e0e0d3;
  border-radius: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.badgeCount {
  font-size: 0.8rem;
  background: #e6ccb2;
  color: #000000;
  font-weight: 750;
  border-radius: 0.3rem;
  padding: 0.1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
}

.badgeTooltip {
  background-color: #353e57;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0; 
  transition: opacity 0.3s;
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



  

  .fixed-card {
   /*    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    );  */ 
    background: linear-gradient(15deg, #13547a, #80d0c7); /* primary color */

  }



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

  z-index: 99999;
  
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

  .closeButton {
      font-size: 18px;
      padding: 0%;
      position: absolute;
      top: -20%;
      right: -5%;
      background: #008080;
      width: 20%;
      cursor: pointer;

  }
.modal-description {
  margin-top: 2%;
  margin-left: 2rem;
  font-size: 1.1rem;
}

.modalGroupParticipants {
  font-size: 1.1rem;
}

.header-buttons {
  display: flex;
  justify-content: space-between;
}


  .close {
    top: 10px;
    font-size: 30px;
/*     font-weight: bold;
 */    cursor: pointer;
  }
  
  .plusSymbol {
    color: white;
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

  .activeFiltersButton {
    border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
      background: #008080;
      color: white;
      display: none;
  }

/*   .activeGroupsButton {
    border-radius: 0.3rem;
      padding: 0.1rem;
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 1rem;
      padding-right: 1rem;
     font-size: 1.15rem;
      background: #008080;
      color: white;
  }
 */
  .groupsHeader {
    background-color: #F5F0E7;
    margin-top: 2%;
  
  }

  .container {
    max-width: 100%;
    padding: 0.5rem;
  }

  .basic-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }

 
}

</style>