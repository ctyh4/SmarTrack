<template>
  <div class="edit-profile-container" v-if="user">
    <div>
      <h1> Edit Profile </h1>

      <div id="nameCell">
        <h3>Name:</h3>
        <input id="name" v-model="user.displayName" type="text">
      </div>
      <hr>

      <div id="emailCell">
        <h3>Email:</h3>
        <input id="email" v-model="user.email" type="email">
      </div>
      <hr>

      <button id="savebutton" type="button" @click="saveProfile()">Save</button><br>
      <button id="cancelButton" type="button" @click="cancel()">Cancel</button>
    </div>
    <Logout/>
  </div>
</template>

<script>
import { getFirestore, doc, updateDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: 'Edit',
  data() {
    return {
      user: false,
    }
  },
  mounted() {
    const auth = getAuth()
    const db = getFirestore()

    onAuthStateChanged(auth, user => {
      if (user) {
        this.user = user
      }
    })
  },
  methods: {
    async saveProfile() {
      const userDoc = doc(getFirestore(), "Users", auth.currentUser.email);
      await updateDoc(userDoc, {
        displayName: this.user.displayName,
        email: this.user.email,
      });

      await updateProfile(auth.currentUser, {
        displayName: this.user.displayName,
        email: this.user.email,
      });

      this.$router.push("/profile");
    },

    cancel() {
      this.$router.push("/profile");
    },
  }
}
</script>

<style>
.edit-profile-container {
  font-family: pjs;
  text-align: center;
}

#nameCell, #useridCell, #emailCell {
    margin-bottom: 5px;
}
.edit-profile-container {
  align-items: center;
    align-content: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-left: auto;
    margin-right: auto;
}
#savebutton {
  margin-bottom: 15px;
}
</style>