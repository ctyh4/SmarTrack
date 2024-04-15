<template>
    <BackButton/>
    <HomeButton/>
    <!--- <div class="pagetitle"><h1>Compare Cards</h1></div> --->
    <div class="compare-cards-container">
        <div class="card-column"> 
            <label for="card1">Select Card 1:</label>
            <select v-model="selectedCard1" @change="fetchCardDetails(card1)" id="card1">
                <option value="">Select a Card</option>
                <option v-for="card in availableCards" :key="card.id" :value="card.id">{{ card.id }}</option>
            </select>
            <IndvCard :cardId="card1" />
        </div><!---IndvCard: card-data="card1" class="card-column"--->
        <div class="card-column">
            <label for="card2">Select Card 2:</label>
            <select v-model="selectedCard1" @change="fetchCardDetails(card2)" id="card2">
                <option value="">Select a Card</option>
                <option v-for="card in availableCards" :key="card.id" :value="card.id">{{ card.id }}</option>
            </select>
            <IndvCard :cardId="card2" />
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
  },
};
</script>

<style scoped>
.pagetitle {
    height: 50px;
    text-align: center
}
.compare-cards-container {
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.card-column {
  width: 48%;
}
</style>