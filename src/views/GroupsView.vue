<template>
<Navigation v-if="!hideNavigation" :class="{ 'hidden': hideNavigation, 'Navigation': true }" />
  
  <div class="container">
    <header class="groupsHeader" :class="{sticky: stickyHeader}">

      <h1 class="activeGroupsButton">Currently {{ activeGroupsCount }} Groups with {{ activeParticipants }} participants</h1>
      <input type="text" v-model="searchQuery" placeholder="Search for groups, your interests or other users!" />
    </header>
    <section class="basic-grid">
      <!-- Move the create group card div here -->
      <div class="card create-group-card" :style="formStyle" @click="toggleForm">
        <form :class="{form: showForm}"></form>
        <h2 class="createGroup" v-if="!showForm">Create group</h2>
        <div class="plusSymbol" v-if="!showForm">+</div>
        <div class="formContainer" v-else>
          <div class="buttonGroup">
            <button class="gridCreateButton" to="/floorplan" tag="button">Create</button>
            <button class="gridCancelButton">Cancel</button>
          </div>
            
        </div>
      </div>

      <GroupCard />

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

  const storeUser = useUserStore();
  const groupTheme = ref('Coding');
  const showTooltip = ref(false);
  const groups = useGroupStore();


  const groupsTitle = computed(() => {
  return groups.title
})



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
    areas: ["area1"],
    themes: ["Coding", "Lunch", "Gaming", "Exam-practice", "Reading", "Sports", "General"],
    participants: ["jack", "johnny", "joe", "Zac", "Håvard"]
  },
  {
    id: 2,
    areas: ["area3",],
    themes: ["exam-practice", "Coding", "Lunch", "Gaming"],

    participants: ["jim", "jack", "johnny"]
  },
   {
    id: 3,
    areas: ["area5"],
    themes: ["Coding", "Lunch", "Gaming"],

    participants: ["jim", "jack", "johnny"]
   },
   {
    id: 3,
    areas: ["area5"],
    themes: ["Coding", "Lunch", "Gaming"],

    participants: ["jim", "jack", "johnny"]
   }
])


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

const activeGroupsCount = computed(() => cards.value.length);
const activeParticipants = computed(() => (participants.value ? participants.value.length : 0));




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

/* 
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
   } */

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
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
/*     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 */
  }

  .areaAndParticipantSection {
    margin-left: 1rem;
  }

  .buttonGroup {
    display: flex;
    justify-content: flex-start;
    align-content: space-between;

/*     margin-left: 1rem;
 */  }


 
  .span {
    font-weight: 750;
  }
/*   .floorplanButton {
    font-size: 18px;
    padding:5px;
    margin-right: 2rem;
    background: #008080;
    text-decoration: none;
    color:white;
 
  } */

/*   a.floorplanButton {
    padding-top: 0.6rem;
    background: #008080;
    text-decoration: none;
    width: 73%;
    height: 60%;
    color: white;
    margin-top: 1rem;

  } */


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

.cardDetailsContainer {
  display: flex;
  flex-direction: column;
}

/* .badgesContainer {
  display: flex;
  gap: 5px;

} */

.cardContent {
    text-align: left;
    margin-left: 1rem;
    
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
    margin-top: 1.5rem;
    -webkit-line-clamp: 1;
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
  opacity: 0; /* Added */
  transition: opacity 0.3s; /* Added */
}
.badgeCount:hover + .badgeTooltip { /* Added */
  opacity: 1;
}


.badgesContainer:hover .badgeTooltip {
  visibility: visible;
  opacity: 1;
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