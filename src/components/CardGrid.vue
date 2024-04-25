<template>
  <div class="card-grid">
    <CardItem v-for="card in filteredCards" :key="card.id" :card="card" />
    <div v-if="noResultsFound" class="no-results">
      No cards found matching your search.
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, getDocs, collection } from "firebase/firestore";
const db = getFirestore(firebaseApp);
import CardItem from "./CardItem.vue";

export default {
  components: {
    CardItem,
  },
  data() {
    return {
      cards: [],
      filteredCards: [], // Data that will be rendered in the grid
      searchTerm: "", // The term to filter cards by
      minCashback: 0, // Minimum cash back percentage for filtering
      maxAnnualFee: 1000, // Maximum annual fee for filtering
      noResultsFound: false,
    };
  },
  created() {
    this.fetchCards().then(() => {
      this.filterCards();
    });
  },
  methods: {
    async fetchCards() {
      try {
        const querySnapshot = await getDocs(collection(db, "Cards"));
        this.cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("Done fetching cards " + this.filteredCards.length);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    },
    filterCards() {
      this.noResultsFound = false;
      this.filteredCards = this.cards.filter((card) => {
        // Adjust these checks based on how your card data structure includes cashback and annual fee
        const matchesSearchTerm = card.id
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
        const meetsCashbackCriteria = card.Data.CBPercent >= this.minCashback;
        const meetsAnnualFeeCriteria = card.Data.annualFee <= this.maxAnnualFee;
        return (
          matchesSearchTerm && meetsCashbackCriteria && meetsAnnualFeeCriteria
        );
      });

      if (this.filteredCards.length == 0) {
        this.noResultsFound = true;
      }
    },
    updateSearch(newSearchTerm) {
      this.searchTerm = newSearchTerm;
      this.filterCards();
    },
    updateFilter({ minCashback, maxAnnualFee }) {
      this.minCashback = minCashback;
      this.maxAnnualFee = maxAnnualFee;
      this.filterCards();
    },
  },
};
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Adjust minmax to desired card width */
  gap: 1rem; /* Adjust the gap to your preference */
  padding: 1rem; /* Optional: adds some space inside the grid */
  width: calc(100% - 2rem); /* take into account the padding */
  box-sizing: border-box; /* include padding in the width calculation */
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* for larger screens, define the number of columns */
  }
}
</style>
