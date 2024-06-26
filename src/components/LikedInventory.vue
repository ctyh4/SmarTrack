<template>
    <div class="cards-grid">
      <CardDisplay 
        v-for="card in cards" 
        :key="card.id" 
        :card="card" 
        @delete-card="deleteCard"
      />
      <div v-if="!cards.length" class="no-results">
        No cards found.
      </div>
    </div>
</template>
  
<script>
import CardDisplay from "./CardDisplay.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
  
  export default {
    components: {
      CardDisplay,
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
    mounted() {
        const auth = getAuth();
        onAuthStateChanged (auth, user => {  
        if (user) {
            this.user = user;
            this.fetchCards();
        }
        })
    },
    methods: {
      async fetchCards() {
      try {
        const userEmail = this.user.email;
        console.log(userEmail);

        const docRef = doc(db, "Users", userEmail);
        console.log(docRef);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().Liked) {
          const userData = docSnap.data();
          this.cards = userData.Liked;
          console.log(this.cards); 
        } else {
          console.log("No inventory found or no such document!");
        }
      } catch (error) {
        console.error("Error fetching user cards:", error);
      }
    },
    async deleteCard(cardName, index) {
      try {
        // Update Firestore
        // Fetch the current inventory, filter out the card to delete, then update Firestore
        const userDocRef = doc(db, "Users", this.user.email);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists() && docSnap.data().Liked) {
          const updatedLiked = docSnap.data().Liked.filter(item => item !== cardName);
          await updateDoc(userDocRef, {
            Liked: updatedLiked,
          });

          // Remove the card from local state
          this.cards.splice(index, 1);
          console.log("Deleted", {cardName});
          this.$router.push("/liked");
        }
      } catch (error) {
        console.error("Error deleting card:", error);
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
    }
  }
  </script>
  
  <style scoped>
  .cards-grid {
    display: grid;
    margin-left: -100px;
    scroll-behavior: smooth;
  }
</style>
  