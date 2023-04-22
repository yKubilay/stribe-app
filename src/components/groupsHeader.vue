<template>
  <header class="groupsHeader" :class="{sticky: stickyHeader}" v-if="groupStore.groups.length > 0">
    <button class="createButton" v-if="props.showCreateGroupButton" 
    @click="createGroup" :style="createButtonStyle">{{ createGroupText }}</button>


     <div class="header-buttons">
       
      <h1 class="activeGroupsButton" :class="{ smallerText: props.smallerText }">
          Currently {{ groupStore.groups.length }} Groups with {{ groupStore.totalParticipants }} participants
      </h1>


        <div>
           <Dropdown v-model="sortCriterias" :options="sortCriterias" optionLabel="name" placeholder="Sort groups" class="w-full md:w-14rem" />
     </div> 
     
     </div>

     <div class="search-container" v-if="props.showCompactSearch">
        <InputText type="text" v-model="searchQuery" @input="handleSearchInput" placeholder="Search groups, themes or users!" class="search-bar" />
        <button @click="clearSearch" class="clear-search-btn">X</button>
     </div>
     <InputText v-else type="text" v-model="searchQuery" @input="handleSearchInput" placeholder="Search groups, themes or users!"  :class="{ 'search-bar-wide': !props.showCompactSearch }" />



   </header>


</template>

<script setup>
 import { ref, watch  } from "vue";
 import { useGroupStore } from '@/stores/groups.js';
 import { usePopStore } from '@/stores/pop.js';
 import { useRoomsStore } from '@/stores/rooms.js'
 import { computed } from 'vue';
 import InputText from 'primevue/inputtext';

 const popStore = usePopStore();
 const groupStore = useGroupStore();
 const searchQuery = ref('');
 const roomsStore = useRoomsStore();

const props = defineProps({ showCreateGroupButton: Boolean, smallerText: Boolean, fullWidthBadge: Boolean, showCompactSearch: Boolean,   
  wideSearch: { type: Boolean, default: false },
}
);


 const emit = defineEmits(["search-query-changed"]);

 function handleSearchInput(event) {
   emit('search-query-changed', event.target.value);
 }


function createGroup() {
popStore.setShowPopup(!popStore.showPopup);
}


function clearSearch() {
  searchQuery.value = '';
  handleSearchInput({ target: { value: '' } });
}


const createGroupText = computed(() => {
return popStore.showPopup ? "Creating group..." : "Create Group";
});

const createButtonStyle = computed(() => {
   if (popStore.showPopup === false) {
     return {
       background: 'linear-gradient(15deg, #008080 25%, #13547a 50%, #80d0c7 75%)',
       backgroundSize: '400% 400%',
       animation: 'gradient 8s ease-in-out infinite',
     };
   } else {
     return {
       backgroundColor: '#008080',
     };
   }
 });

 const roomId = computed(() => roomsStore.roomId);
 
 watch(roomId, (newRoomId) => {
searchQuery.value = newRoomId;
handleSearchInput({ target: { value: newRoomId } });
});

</script>

<style scoped>

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.search-container {
  position: relative;
  display: inline-block;
}

.clear-search-btn {
    position: absolute;
    width: 4rem;
    height: 2.8rem;
    top: 33%;
    border-radius: 0.4rem;
    left:16.5rem;
    transform: translateY(-50%);
    border: none;
    background-color: teal;
    font-size: 1rem;
    cursor: pointer;
  }

.header-container {
display: flex;
justify-content: space-between;
align-items: center;
}

button {
margin: 0;
margin-top: 0.5rem;
width: 100%;
}

.createButton {
  background: linear-gradient(15deg, #008080 25%, #13547a 50%, #80d0c7 75%);
  background-size: 400% 400%;
  animation: gradient 8s ease-in-out infinite;
  margin-bottom: 0.8rem;
}
.smallerText {
  font-size: 1.07rem;
}
.groupsHeader {
  margin-right: 0.2rem;
}

.search-bar-wide {
  width: 100%;
  border: 2px solid black;
}


.createButton {
  font-size: 1.5rem;
  height: 5rem;
}
.search-bar {
  width: 16rem;
  border: 2px solid black;
}


</style>