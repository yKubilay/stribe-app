import { defineStore } from 'pinia';

export const usePopStore = defineStore({
  id: 'pop',
  state: () => ({
    showPopup: false,
  }),
  actions: {
    setShowPopup(show) {
      this.showPopup = show;
    },
  },
});
