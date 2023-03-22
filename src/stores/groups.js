import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { v4 as uuidv4 } from 'uuid';

const groupCollection = db.collection('groups');

export const useGroupStore = defineStore({
  id: 'groups',
  state: () => ({
    groups: [],
  }),
  actions: {
    async createGroup(groupData) {
      const group = {
        uid: uuidv4(),
        title: groupData.title,
        themes: groupData.themes,
        description: groupData.description,
        createdAt: Date.now(),
      };
      const docRef = await groupCollection.doc();
      await groupCollection.add(group);
    },


    listenToGroups() {
      groupCollection.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
        const groups = [];

        querySnapshot.forEach((doc) => {
          groups.push({ id: doc.id, ...doc.data() });
        });

        this.groups = groups;
      });
    },
  },
});


