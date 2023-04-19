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

       <input type="text" v-model="searchQuery" @input="handleSearchInput" placeholder="Search groups, themes or other users!" />



     </header>


 </template>
 
 <script setup>
   import { ref } from "vue";
   import { useGroupStore } from '@/stores/groups.js';
   import { usePopStore } from '@/stores/pop.js';
   import { computed } from 'vue';

   const popStore = usePopStore();
   const groupStore = useGroupStore();
   const searchQuery = ref('');


const props = defineProps({ showCreateGroupButton: Boolean, smallerText: Boolean, fullWidthBadge: Boolean });

   const emit = defineEmits(["search-query-changed"]);
 
   function handleSearchInput(event) {
     emit('search-query-changed', event.target.value);
   }


  function createGroup() {
  popStore.setShowPopup(!popStore.showPopup);
}


const createGroupText = computed(() => {
  return popStore.showPopup ? "Creating group..." : "Create Group";
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
    font-size: 1.1rem;
  }

  .groupsHeader {
    margin-right: 0.2rem;
  }

  .createButton {
    font-size: 1.5rem;
    background-color: #047171;
  }

</style>