import { defineStore } from 'pinia';

export const useFilteredGroupsStore = defineStore({
  id: 'filteredGroups',
  state: () => ({
    groups: [],
    filteredRoomIds: [],
    participants: [],
  }),

  actions: {
    updateFilteredRoomIds(roomIds) {
      this.filteredRoomIds = roomIds;
    },

    updateParticipants(participants) {
      this.participants = participants;
    },
  },
});
