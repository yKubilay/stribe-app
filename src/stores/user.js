import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
      username: '',
      email: '',
      
  
    }),
    actions: { 
      setUsername(value) {
        this.username = value
      },
      setEmail(value) {
        this.email = value
      }
    }
    })

    