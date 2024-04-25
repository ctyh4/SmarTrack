<template>
  <div class="backdrop" v-show="isVisible"></div>

  <div class="container" v-show="isVisible">
    <form class="myform">
      <button id="delete-button">x</button>
      <h2>Add Card</h2>

        <div class="label">Card Name</div>
          <select id="cardName1" v-model="selected">
            <option id="option" value="" disabled selected>Select Card Name</option>
            <option>Citi Cash Back+ Mastercard</option>
            <option>DBS Visa Debit Card</option>
            <option>OCBC Debit Card</option>
            <option>Standard Chartered Simply Cash Credit Card</option>
            <option>UOB One Card</option>
          </select> 
          <br><br>

      <div class="confirm">
        <button id = "confirm-button" type = "button" v-on:click="confirm">Confirm</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, updateDoc, doc, getDoc, arrayUnion } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: null,
      cardName1: '',
      selected: '',
    };
  },
  props: {
    isVisible: Boolean,
    userEmail: String,
  },
  mounted() {
        const auth = getAuth();
        onAuthStateChanged (auth, user => {  
            if (user) {
                this.user = user;
            }
        })
    },
  methods: {
    async confirm() {
      if (!this.selected) {
        alert("Please select a card name.");
        return;
      } try {
        const userDocRef = doc(db, "Users", this.user.email);
        console.log(userDocRef);

        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          await updateDoc(userDocRef, {
            Inventory: arrayUnion(this.selected),
          })
          alert("Confirming your data for card: " + this.selected)
          this.$emit("confirmed", this.selected);
          console.log("Added", this.selected);
          this.$router.push("/cards");
        }
      } catch(error) {
        console.error("Error adding card: ", error);
      }
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 400px;
  background-color: white;
  border-color: #7F56D9;
  border: 2px;
  border-style: solid;
  border-radius: 20px;
  position: fixed;
  top: 45%; 
  left: 51%; 
  transform: translate(-50%, -50%); 
  z-index: 1000;
}

#delete-button {
  position: absolute;
  font-size: 20px;
  color:rgb(95, 93, 93);
  top: 10px;
  right: 10px;
  background: transparent; 
  border: none; 
  cursor: pointer;
}

h2 {
  font-family: pjs;
  font-weight: bold;
  font-size: 22px;
  color: black;
  text-align: center;
  margin: 5px;
  margin-bottom: 25px;
}

.label {
  display: inline-block;
  width: 50%;
  font-family: pjs;
  font-size: 18px;
  font-weight: bold;
  color: black;
}

select {
  height: 35px;
  width: 50%;
}

#confirm-button {
  text-align: center;
  font-family: pjs;
  font-weight: 600;
  font-size: 17px;
  margin-top: 4px;
  margin-bottom: 10px;
  color: white;
  background-color: #7F56D9;
  border-color: #7F56D9;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  transition: opacity 0.1s ease;
  cursor: pointer;
}

#confirm-button:hover {
  opacity: 0.4;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.7;
  background-color: rgba(255, 255, 255, 0.5); /* See-through background */
  z-index: 999; /* Just below the modal to cover page content */
  backdrop-filter: blur(300px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 999;
  pointer-events: none; /* Make sure clicks pass through */
}
</style>
