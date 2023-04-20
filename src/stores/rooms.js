import { defineStore } from 'pinia';

export const useRoomsStore = defineStore({
  id: 'rooms',
  state: () => ({
    roomId: null,
  }),
  actions: {
    setRoomId(roomId) {
      this.roomId = roomId;
    },
    
  },
});
