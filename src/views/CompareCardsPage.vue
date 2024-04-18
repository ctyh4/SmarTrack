<template>
    <BackButton/>
    <HomeButton/>
    <div class="page">
        <div class="page-title">
            <h1>Compare Cards</h1>
        </div>
        <div class="compare-cards-container">
            <div class="card-column"> 
                <label for="card1">Select Card 1:</label>
                <select v-model="card1" @change="fetchCardDetails1(card1)" id="card1">
                    <option value="">Select a Card</option>
                    <option v-for="card in availableCards" :key="card.id" :value="card.id">{{ card.id }}</option>
                </select>
                <IndvCard v-if="card1" :cardId="card1" />
            </div><!---IndvCard: card-data="card1" class="card-column"--->
            <div class="card-column">
                <label for="card2">Select Card 2:</label>
                <select v-model="card2" @change="fetchCardDetails2(card2)" id="card2">
                    <option value="">Select a Card</option>
                    <option v-for="card in availableCards" :key="card.id" :value="card.id">{{ card.id }}</option>
                </select>
                <IndvCard v-if="card2" :cardId="card2" />
            </div>
        </div>
    </div>
    
</template>

<script>
import BackButton from "@/components/BackButton.vue"
import HomeButton from "@/components/HomeButton.vue"
import IndvCard from  "@/components/IndvCard.vue"
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
const db  = getFirestore();

export default {
    name: "ComparePage",
    components: {
        BackButton,
        HomeButton, 
        IndvCard
    },
    data() {
        return {
            availableCards: [],
            card1: "",
            card2: ""
        }
    },
    created() {
        this.fetchAvailableCards();
    },
    methods: {
    async fetchAvailableCards() {
      try {
        const cardsCollection = collection(db, "Cards");
        const querySnapshot = await getDocs(cardsCollection);
        querySnapshot.forEach((doc) => {
          // Add document data to availableCards array
          this.availableCards.push({
            id: doc.id,
          });
        });
        } catch (error) {
            console.error("Error fetching available cards:", error);
        }
    },
    
    fetchCardDetails1(card1) {
        this.card1 = card1
    },

    fetchCardDetails2(card2) {
        this.card2 = card2
    }
  },
};
</script>

<style scoped>
.page {
    width: 100%;
}

.page-title {
    margin-top: 60px;
    font-size: 25px;
    text-align: center
}
.compare-cards-container {
  margin-top: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

label {
    font-size: 15px;
    font-weight: bold;
}

.card-column {
  width: 48%;
}
</style>