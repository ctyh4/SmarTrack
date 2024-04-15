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
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
        imageUrl: SmarTrack,
        description: "",
        type: "",
        data: {}
      };
    },
    mounted() { // Set the details when the component is created
      this.fetchCardDetails(this.cardId);
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
      async addCard(user) {
        const userDocRef = doc(getFirestore(), "Users", String(this.user.email));
        await updateDoc(userDocRef, {
          Inventory: push({
            card: this.cardId,
          }),
        });
      },
      async addCard(user) {
        const userDocRef = doc(getFirestore(), "Users", String(this.user.email));
        await updateDoc(userDocRef, {
          Inventory: push({
            card: this.cardId,
          }),
        });
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