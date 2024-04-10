<template>
  <div class="container" v-show="isVisible">
    <form class="myform">
      <h2>Add Card</h2>

      <div class="formli">
        <!-- <label for="cardType1">Card Type</label>
          <select id="cardType1" v-model="selected">
            <option value="" disabled selected>Select Card Type</option>
            <option>Credit</option>
            <option>Debit</option>
          </select> 
          <br><br>
        
        <label for="issuer1">Issuer</label>
        <input type="text" id="issuer1" required="" placeholder="Valid Issuer (eg.DBS)"> <br><br> -->
        <label for="cardName1">Card Name</label>
        <input type="text" id="cardName1" v-model="cardName1" required="" placeholder="Enter Card Name"><br><br>
      </div>

      <div class="confirm">
        <button id = "confirm-button" type = "button" v-on:click="confirm">Confirm</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import{ doc, setDoc } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      cardName1: '',
    };
  },
  props: {
    isVisible: Boolean,
  },
  methods: {
    async confirm() {
      const Card = this.cardName1; 
      alert("Confirming your data for card: " + Card);

      try {
        const docRef = await setDoc(doc(db, "Portfolio", Card), {
          Card_Name: Card,
        });
        console.log("Document written with ID: ", docRef.id);
        this.$emit("confirmed", Card);
        this.cardName1 = ''; // Reset input after emitting event
      }
      // console.log("Confirmed")

      // // let cardtype = document.getElementById("cardType1").value
      // // let issuer = document.getElementById("issuer1").value
      // let Card = document.getElementById("cardName1").value

      // alert("Confirming your data for card: " + Card)

      // try {
      //   const docRef = await setDoc(doc(db, "Card"), {
      //     // Card_Type: cardType1, Issuer: issuer1, 
      //     Card_Name: Card,
      //   })
      //   console.log(docRef)
      //   document.getElementById('myform').reset();
      //   this.$emit("Confirmed")
      // }
      catch(error) {
        console.error("Error adding card: ", error);
      }
    }
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
