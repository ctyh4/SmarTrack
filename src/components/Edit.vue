<template>
  <div class="edit-container">
    <h1>Edit Profile</h1>
    <form @submit.prevent="submitForm">
      <div class="form">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required></input>

        <label for="mobile">Mobile:</label>
        <input type="tel" id="mobile" v-model="mobile" required></input>

        <label for="birthdate">Birthdate:</label>
        <input type="date" id="birthdate" v-model="birthdate" required></input>
      </div>
      <button id="savebutton" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { getFirestore } from "firebase/firestore"

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      name: "",
      mobile: "",
      birthdate: "",
    };
  },
  created() {
    const user = getAuth().currentUser;

    if (user) {
      const userDocRef = doc(db, 'Users', user.email);
      const userDocSnap = getDoc(userDocRef);

      userDocSnap.then((doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          this.name = userData.Name;
          this.mobile = userData.Mobile;
          this.birthdate = userData.Birthdate;
        }
      });
    }
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();

      const user = getAuth().currentUser;

      if (user) {
        updateDoc(doc(db, 'Users', user.email), {
          Name: this.name,
          Mobile: this.mobile,
          Birthdate: this.birthdate
        }).then(() => {
          this.$router.push('/profile');
        });
      }
    },
  },
};
</script>