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
      noResultsFound: false,
    };
  },
  created() {
    this.fetchCards().then(() => {
      this.filterCards();
    });
    console.log(this.searchTerm);
  },
  methods: {
    async fetchCards() {
      try {
        const querySnapshot = await getDocs(collection(db, "Cards"));
        this.cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    },
    filterCards() {
      if (this.searchTerm) {
        this.noResultsFound = false;
        this.filteredCards = this.cards.filter((card) =>
          card.id.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        if (this.filteredCards.length == 0) {
          this.noResultsFound = true;
        }
      } else {
        this.filteredCards = this.cards; // No search term means no filtering
      }
    },
    updateSearch(newSearchTerm) {
      this.searchTerm = newSearchTerm;
      this.filterCards();
    },
  },
};
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Adjust minmax to desired card width */
  gap: 1rem; /* Adjust the gap to your preference */
  padding: 1rem; /* Optional: adds some space inside the grid */
  margin: 0 auto; /* Centers the grid horizontally */
  max-width: 1200px; /* Optional: limits the width of the entire grid */
}
</style>
