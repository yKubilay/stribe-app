import { defineStore } from 'pinia';

export const useFilteredGroupsStore = defineStore({
  id: 'filteredGroups',
  state: () => ({
    groups: [],
    filteredRoomIds: [],
  }),

actions: {
  
    updateFilteredRoomIds(roomIds) {
      this.filteredRoomIds = roomIds;
    },
  },
  
});
