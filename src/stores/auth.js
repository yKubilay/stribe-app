import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    setLoggedIn(value) {
      this.isLoggedIn = value
    }
    
  }
})
















/* import { createStore } from 'vuex'

const store = createStore({
  state: {
    isLoggedIn: false
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value
    },
    setLoggedOut(state, value) {
      state.isLoggedIn = value
    }
  },
  actions: {
    setLoggedIn(context, value) {
      context.commit('setLoggedIn', value)
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn
  },

})


export default store */

