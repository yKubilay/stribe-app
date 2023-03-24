import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


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
        room: groupData.room,
        title: groupData.title,
        themes: groupData.themes,
        description: groupData.description,
        participants: groupData.participants,
/*      createdAt: Date.now(),

 */      createdAt: moment().format(),
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
/*Maybe 10 meeting on monday*/
    updateGroupParticipants(uid, participants) {
      return new Promise((resolve, reject) => {
        const groupRef = this.db.collection('groups').doc(uid);
        groupRef.update({
          participants: participants
        }).then(() => {
          resolve();
        }).catch((error) => {
          console.error('Error updating participants:', error);
          reject(error);
        });
  });
}

  },
});


