<template>
  <div class="indvcard" v-if="user">
    <div class="cardtitle">
      <h1 id="title">
        <img id="cardphoto" :src="imageUrl" /> {{ this.cardId }}
      </h1>
    </div>

    <div class="card-desc">
      <h3>Description:</h3>
      <p>{{ description }}</p>
      <hr />
    </div>

    <div class="card-type">
      <h3>Type:</h3>
      <p>{{ type }}</p>
      <hr />
    </div>

    <div class="card-details" v-for="(value, newKey) in data" :key="newKey">
      <h3>{{ newKey }}:</h3>
      <p>{{ value }}</p>
      <hr />
    </div>
  </div>

  <div class="bottom-button-container">
    <button id="likebutton" @click="likeCard()">
      <img
        id="icon"
        src="./../assets/heart_icon.png"
        style="width: 20px; height: 15px"
      />Like</button
    ><br /><br />
    <button id="addbutton" @click="addCard()">Add Card</button><br /><br />
  </div>
</template>

<script>
import SmarTrack from "@/assets/SmarTrack.png";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore();

export default {
  name: "IndividualCard",
  props: {
    cardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: false,
      imageUrl: SmarTrack,
      description: "",
      type: "",
      data: {},
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchCards(user);
      }
    });
  },
  watch: {
    cardId: {
      immediate: true,
      handler(newCardId) {
        if (newCardId) {
          this.fetchCardDetails(newCardId);
        }
      },
    },
  },
  methods: {
    async fetchCardDetails(cardId) {
      try {
        if (!this.cardId) {
          console.error("Card ID is undefined");
          return;
        }
        const docRef = doc(db, "Cards", cardId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const cardData = docSnap.data();
          const data = cardData.Data;
          const description = cardData.Description;
          const type = cardData.Type;
          const image = await import(`@/assets/${this.cardId}.webp`);
          this.imageUrl = image.default;
          console.log(this.cardId); // Output for debugging
          // Update component data properties here if needed
          this.data = data;
          this.description = description;
          this.type = type;
          this.mapKeys();
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async likeCard() {
      try {
        // Get the user's document reference based on their email (assuming this.user.email is the user's email)
        const userEmail = String(this.user.email);
        const userDocRef = doc(db, "Users", userEmail);
        console.log(userDocRef);
        const userDocSnap = await getDoc(userDocRef);

        // Check if the card ID is already in the Liked array
        const likedCards = userDocSnap.data().Liked;
        console.log(likedCards);
        if (likedCards.includes(this.cardId)) {
          console.log("Card already liked!");
          return; // Exit the method if the card is already liked
        }

        // Update the Liked array by adding the card ID
        await updateDoc(userDocRef, {
          Liked: arrayUnion(this.cardId),
        });

        // Log success or perform any other actions
        console.log("Card liked successfully!");
      } catch (error) {
        // Handle errors
        console.error("Error liking card:", error);
      }
    },

    async addCard() {
      try {
        // Get the user's document reference based on their email (assuming this.user.email is the user's email)
        const userEmail = String(this.user.email);
        const userDocRef = doc(db, "Users", userEmail);
        console.log(userDocRef);
        const userDocSnap = await getDoc(userDocRef);

        // Check if the card ID is already in the Inventory array
        const addedCards = userDocSnap.data().Inventory;
        console.log(addedCards);
        if (addedCards.includes(this.cardId)) {
          console.log("Card already added!");
          return; // Exit the method if the card is already added
        }

        // Update the Inventory array by adding the card ID
        await updateDoc(userDocRef, {
          Inventory: arrayUnion(this.cardId),
        });

        //Checking if the card has a minspend. If so, add it to a dictionary, organized by month and year
        const cardDocRef = doc(db, "Cards", this.cardId);
        const cardDocSnap = await getDoc(cardDocRef);
        const cardType = cardDocSnap.data().Type;
        const data = cardDocSnap.data().Data; // Access the 'Data' dictionary
        const minSpend = data.MinSpend; // Access the 'MinSpend' property within 'Data'
        const target = data.Spend; //Min amount of money to spend before incurring costs
        const cbLimit = data.CashbackLimit; //Limit to cashback received
        const cbCap = data.CBCap;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month starts from 0, so add 1

        let newDictMS = userDocSnap.data().CardsWithMinSpend; //Get the current dict in user
        if (cardType == "CC" && minSpend == true) {
          newDictMS[this.cardId] = {
            [`${year}-${month}`]: { Target: target, Current: 0 }, //Update the dict to include the new card, sorted by year and month
          };

          await updateDoc(userDocRef, {
            CardsWithMinSpend: newDictMS,
          });
        }

        let newDictCB = userDocSnap.data().CardsWithCBCap; //Get the current dict in user for cards with cb cap
        if (cardType == "CC" && cbCap == true) {
          newDictCB[this.cardId] = {
            [`${year}-${month}`]: { Limit: cbLimit, Current: 0 }, //Update the dict to include the new card, sorted by year and month
          };

          await updateDoc(userDocRef, {
            CardsWithCBCap: newDictCB,
          });
        }

        // Log success or perform any other actions
        console.log("Card added successfully!");
      } catch (error) {
        // Handle errors
        console.error("Error adding card:", error);
      }
    },
    mapKeys() {
      const keyMapping = {
        CBCap: "Cash Back Cap",
        CBPercent: "Cash Back %",
        Spend: "Spend",
        RebatePercent: "Rebate %",
        CashbackLimit: "Cash Back Limit",
        MinSpend: "Minimum Spend",
        annualFee: "Annual Fee",
      };

      // Map keys in all dictionaries
      const mappedData = {};
      for (const oldKey in this.data) {
        const newKey = keyMapping[oldKey];
        if (newKey) {
          mappedData[newKey] = this.data[oldKey];
        }
      }
      this.data = mappedData;
    },
  },
};
</script>

<style scoped>
.indvcard {
  align-items: center;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.card-desc {
  width: 75%;
}

#cardphoto {
  width: 100px;
  height: auto;
}

button {
  border: transparent;
  padding: 5px;
  text-align: center;
  font-size: 16px;
  font-family: pjs;
  align-items: center;
  justify-content: center;
  color: #333;
  cursor: pointer;
  border-radius: 5px;
}

#likebutton {
  background: rgb(244, 244, 244);
}

#addbutton,
#comparebutton {
  background-color: #7f56d9;
  color: white;
}

button:hover {
  background-color: transparent;
  opacity: 0.7;
}

.bottom-button-container {
  align-items: center;
  justify-content: center;
  display: block;
  margin-top: 30px;
}
</style>
