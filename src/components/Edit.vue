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

      <button id="savebutton" type="button" @click="saveProfile()">Save</button>
    </div>
    <Logout/>
  </div>
</template>

<script>
import { getFirestore, doc, updateDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logout from '@/components/Logout.vue'

export default {
  name: 'Edit',
  components: {
    Logout
  },
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
      const userDoc = doc(getFirestore(), 'users', this.user.uid)
      await updateDoc(userDoc, {
        displayName: this.user.displayName,
        email: this.user.email
      })

      this.$router.push('/profile')
    }
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
</style>