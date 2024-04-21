<template>
  <div class="container" v-show="isVisible">
    <form class="myform">
      <h2>Add Card</h2>

        <label for="cardName1">Card Name</label>
          <select id="cardName1" v-model="selected">
            <option value="" disabled selected>Select Card Name</option>
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
import { getFirestore, updateDoc, doc, getDoc, arrayUnion } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      cardName1: '',
    };
  },
  props: {
    isVisible: Boolean,
    userEmail: String,
  },
  methods: {
    async confirm() {
      let Card = document.getElementById("cardName1").value

      if (!Card) {
        alert("Please select a card name.");
        return;
      } try {
        const userDocRef = doc(db, "Users", this.userEmail);
        // console.log(userDocRef);

        const docSnap = await getDoc(userDocRef);
        // if (docSnap.exists()) {
          await updateDoc(userDocRef, {
            Inventory: arrayUnion(Card),
          })
          alert("Confirming your data for card: " + Card)
          Card = '';  //Reset selected value
          this.$emit("confirmed", Card);
          this.$router.push("/cards");
        // }
      } catch(error) {
        console.error("Error adding card: ", error);
      }
    },
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  width: 430px;
  border-color: #7F56D9;
  border: 2px;
  border-style: solid;
  border-radius: 20px;
}

.myform {
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
}

h2 {
  font-family: pjs;
  font-weight: bold;
  font-size: 20px;
  color: black;
  text-align: center;
  margin-bottom: 23px;
}

.formli {
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 350px;
  margin: auto;
}

#issuer, #selectCard {
  font-family: pjs;
  font-size: 14px;
  font-weight: 500;
  margin: auto;
}

label {
  display: inline-block;
  margin-right: 13px;
  width: 50%;
  text-align: right;
  font-family: pjs;
  font-size: 17px;
  font-weight: bold;
  color: black;
}

select {
  height: 35px;
  width: 45%;
}

input {
  height: 30px;
}

#confirm-button {
  text-align: center;
  font-family: pjs;
  font-weight: 600;
  font-size: 15px;
  margin-top: 0px;
  margin-bottom: 15px;
  color: white;
  background-color: #7F56D9;
  width: 90px;
  border-radius: 5px;
  /* transition: opacity 0.2s ease; */
}

#confirm-button:hover {
  opacity: 0.4;
}
</style>
