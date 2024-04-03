<template>
  <div class="edit-profile-container" v-if="user">
    <div>
      <h1> Edit Profile </h1>

      <div id="emailCell">
        <h3>Email:</h3>
        <p>{{ user.email }}</p>
      </div>
      <hr>

      <div id="nameCell">
        <h3>Name:</h3>
        <input id="name" v-model="displayName"  type="text">
      </div>
      <hr>


      <button id="savebutton" type="button" @click="saveProfile(user)">Save</button><br>
      <button id="cancelButton" type="button" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);

export default {
  name: 'Edit',
  data() {
    return {
      user: null,
      displayName: "",
    }
  },
  mounted() {
        const auth = getAuth();
        onAuthStateChanged (auth, user => {  
            if (user) {
                this.user = user;
                this.fetchData(user);
            }
        })
    },
  methods: {
    async fetchData(user) {
            try {
                const userEmail = String(user.email);
                console.log(userEmail);

                // Directly reference the document using its ID (user's email)
                const docRef = doc(db, "Users", userEmail);
                console.log(docRef);
                // Fetch the document data
                const docSnap = await getDoc(docRef);

                // Check if the document exists
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const name = userData.Name;
                    console.log(userData); // Output for debugging
                    // Update component data properties here if needed
                    this.displayName = name;
                    
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
      },
    async saveProfile(user) {
      try {
        const userDocRef = doc(getFirestore(), "Users", String(user.email));
        await updateDoc(userDocRef, {
          Name: this.displayName,
        });
        console.log(this.displayName);
        this.$router.push("/profile");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
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
