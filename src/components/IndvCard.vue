<template>
    <div class="indvcard">

        <div class="cardinfo">
            <div class="cardtitle">
                <h1 id="title"><img id = "cardphoto" :src = "imageUrl">{{ this.cardId }}</h1>
                <p> Description: {{ description }}</p>
                <p> Type: {{ type }}</p>
                <p v-for="item in data" :key="item"> {{ item }}</p>
            </div>
            
            <div class="bottom-button-container">
                <button id="likebutton" @click="likeCard()">
                    <img id = "icon" src = "./../assets/heart_icon.png" style="width: 20px; height: 15px;">Like</button><br><br>
                <button id="addbutton" @click="addCard()">Add Card</button><br><br>
                
            </div>
        </div>        
        
    </div>
    
</template>

<script>
import SmarTrack from "@/assets/SmarTrack.png";
import { getFirestore, doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
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
        data: {}
      };
    },
    mounted() { // Set the details when the component is created
      this.fetchCardDetails(this.cardId);
      const auth = getAuth();
        onAuthStateChanged (auth, user => {  
            if (user) {
                this.user = user;
            }
        })
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
            this.imageUrl = await import(`@/assets/${this.cardId}.webp`);
            console.log(this.cardId); // Output for debugging
            // Update component data properties here if needed
            this.data = data;
            this.description = description;
            this.type = type;
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
          console.log(userDocRef)
          const userDocSnap = await getDoc(userDocRef);

          // Check if the card ID is already in the Liked array
          const likedCards = userDocSnap.data().Liked;
          console.log(likedCards)
          if (likedCards.includes(this.cardId)) {
            console.log("Card already liked!");
            return; // Exit the method if the card is already liked
          }

          // Update the Liked array by adding the card ID
          await updateDoc(userDocRef, {
            Liked: arrayUnion(this.cardId)
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
          console.log(userDocRef)
          const userDocSnap = await getDoc(userDocRef);

          // Check if the card ID is already in the Inventory array
          const addedCards = userDocSnap.data().Inventory;
          console.log(addedCards)
          if (addedCards.includes(this.cardId)) {
            console.log("Card already added!");
            return; // Exit the method if the card is already added
          }

          // Update the Inventory array by adding the card ID
          await updateDoc(userDocRef, {
            Inventory: arrayUnion(this.cardId)
          });

          // Log success or perform any other actions
          console.log("Card added successfully!");
        } catch (error) {
          // Handle errors
          console.error("Error adding card:", error);
        }
      },

    },
  };
</script>

<style scoped>
.indvcard{ 
    align-items: center;
    align-content: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-left: auto;
    margin-right: auto;
}


#cardphoto {
    width: 35px;
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
  border-radius: 5px
}

#likebutton {
  background: rgb(244, 244, 244);
}

#addbutton, #comparebutton {
    background-color: #7F56D9;
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
    margin: auto;
}
</style>