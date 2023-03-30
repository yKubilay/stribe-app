<template>
  <section class="container">
    <swiper
    :slidesPerView="1"
    :pagination="{ clickable: true }"
    :keyboard="true"
    :modules="modules"
    class="mySwiper"
  >
  <swiper-slide v-for="(group, index) in groupStore.groups" :key="group.uid" class="custom-swiper-slide">
        <div class="slide-container">
          <div class="card" :style="getCardStyle(index)">
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
            </div>

            <div class="buttonGroup">
              <button class="floorplanButton" @click="showModal(group)">Show more</button>
              <button class="floorplanButton" @click="joinRoom(group)">Join room</button>
            </div>

            <div class="cardParticipants" v-if="cardExpanded">
              <h4>Participants</h4>
              <div class="cardParticipants" @click="showModal(group)">{{ group.participants }}</div>
            </div>
            <div class="swiper-navigation">
 
  </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
  import { onMounted, ref, computed } from "vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { useUserStore } from '@/stores/user.js';
  import { watchEffect } from "vue";
  import { useGroupStore } from '@/stores/groups';
  import 'swiper/swiper-bundle.min.css';

  import InputText from 'primevue/inputtext';
  import moment from 'moment';
  import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




const groupStore = useGroupStore();
const swiperRef = ref(null);


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

function swipe(direction) {
    if (direction === 'next') {
      swiperRef.value.swiper.slideNext();
    } else if (direction === 'prev') {
      swiperRef.value.swiper.slidePrev();
    }
  }

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

 function joinRoom(group) {
  const loggedInUserName = userStore.username;
  const updatedParticipants = [...group.participants, loggedInUserName];

  groupStore.updateGroupParticipants(group.uid, updatedParticipants);
}


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


const setup = () => {
  return {
    modules: [Keyboard, Pagination, Navigation]
  };
}



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
<style scoped>
.card {
  margin-top: 2rem;
  height: 100%;
}

.cardDescription {
  padding: 1rem;
  display: none;
}

.swiper-navigation {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none; 
}


.swiper-button-prev,
.swiper-button-next {
  font-size: 2rem;
  pointer-events: auto;}
 .swiper-button-next-custom,
.swiper-button-prev-custom {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 20px);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
 
.swiper-button-next-custom {
  right: 20px;
}

.swiper-button-prev-custom {
  left: 20px;
}



</style>
