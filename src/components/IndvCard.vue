<template>
    <div class="indvcard">

        <div class="cardinfo">
            <div class="cardtitle">
                <h1 id="title"><img id = "cardphoto" src = "./../assets/DBS Visa Debit Card.webp"> Card Title {{  }}</h1>
                <p> Card details {{  }}</p>
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
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
        card: null,
      };
    },
    async mounted() {
      const db = getFirestore();
      const cardDoc = doc(db, "Cards", this.cardId);
      const cardSnap = await getDoc(cardDoc);
      if (cardSnap.exists()) {
        this.card = cardSnap.data();
      } else {
        console.log("No such card!");
      }
    },
    methods: {
      addCard() {
        // Add card logic here
      },
      likeCard() {
        // Add card logic here
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