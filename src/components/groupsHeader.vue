<template>
    <header class="groupsHeader" :class="{sticky: stickyHeader}" v-if="groupStore.groups.length > 0">
      <button class="createButton" v-if="props.showCreateGroupButton" @click="createGroup">{{ createGroupText }}</button>


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