<template>
    <sidebar @toggle="handleSidebarToggle" />
    <div id="container">
      <FilterCard id="filter" @update-filter="handleFilterUpdate" />
    
      <div class="cards-page" v-if="user">
          <div class="top-nav">
            <SearchBar id="search-bar" @search="handleSearch" />
              <button id="card-btn" type="button" @click="route">
                Cards
                <img id = "card-icon" src = "./../assets/cards_button.png">
              </button>
              <HomeButton/>
          </div>
          
          <div class="cards-grid">
            <LikedInventory  
            :cards="filteredCards" 
            :userEmail="user.email"
            @delete-card="deleteCard"
            />
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  import SearchBar from "@/components//SearchBar.vue";
  import FilterCard from "@/components/FilterCard.vue";
  import AddCardForm from './AddCardForm.vue';
  import HomeButton from './HomeButton.vue';
  import LikedInventory from './LikedInventory.vue'
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import firebaseApp from '../firebase.js';
  import { getFirestore, updateDoc, doc, getDoc, arrayUnion } from 'firebase/firestore';
  const db = getFirestore(firebaseApp);
  
  export default {
    components: {
      Sidebar,
      FilterCard,
      SearchBar,
      AddCardForm,
      HomeButton,
      LikedInventory,
    },
    data() {
      return {
        user: null,
        sidebarActive: false,
        showAddCardForm: false,
        cards: [],
        filteredCards: [],
      };
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged (auth, (user) => {  
        if (user) {
          this.user = user;
          this.fetchCards(user);
        }
      })
    },
    methods: {
      handleSidebarToggle(isActive) {
        this.sidebarActive = isActive;
      },
      async fetchCards(user) {
        try {
          const userEmail = String(user.email);
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
      async addCard(card) {
        try {
          const userDocRef = doc(db, "Users", this.user.email);
          await updateDoc(userDocRef, {
            Inventory: arrayUnion(card),
          });
          this.cards.push(card);
          console.log(this.cards);
          this.$router.push("/likedcards");
        } catch (error) {
          console.error("Error updating profile:", error);
        } 
      },
      async route() {
      this.$router.push("/cards");
    },
    async deleteCard(cardName, index) {
      try {
        // Confirm with the user that they want to delete the card
        if (!confirm(`Are you sure you want to delete the card "${cardName}" from your liked cards?`)) {
          return;
        }

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
          console.log("Deleted", {cardName}, "from liked cards");
          this.$router.push("/liked");
        }
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
      handleSearch(searchTerm) {
        this.$refs.cardGrid.updateSearch(searchTerm);
        // this.filteredCards = this.cards.filter(card =>
        //   card.name.toLowerCase().includes(searchTerm.toLowerCase())
        // );
      },
      handleFilterUpdate({ minCashback, maxAnnualFee }) {
        console.log("handling filter update");
        this.$refs.cardGrid.updateFilter({ minCashback, maxAnnualFee });
        // this.filteredCards = this.cards.filter(card =>
        //   card.cashback >= minCashback && card.annualFee <= maxAnnualFee
        // );
      },
    },
  }
  </script>
  
  <style scoped>
#container {
  display: flex;
  flex-direction: row;
  justify-content: center; /* Center children horizontally */
  align-items: flex-start; /* Align children to the top */
  padding-top: 20px;
}
  
  #filter {
    margin-left: 140px;
    height: 300px;
    width: 200px;
  }
  
  .cards-page {
    margin-left: 25px;
    flex-grow: 1;
  }
  
  .top-nav {
    text-align: center;
    align-items: center;
    display: flex;
    color: #7F56D9;
  }
  
  #card-btn {
      display: flex;
      height: 40px;
      width: 100px;
      top: 28px;
      right: 130px;
      position: absolute;
      font-family: pjs;
      font-weight: 650;
      font-size: 16px;
      color: #7F56D9;
      background-color: white;
      padding: 5px 10px;
      text-align: center;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 10px;
      border-style: solid;
      border-color: #7F56D9;
  }
  
  #card-icon {
    width: 21px;
    height: 17px;
    margin-left: 7px;
  }
  
  .cards-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: auto;
    margin-top: 10px;
    width: 800px;
    height: 50%;
    scroll-behavior: smooth;
  }
  
  #delete-icon {
    width: 25px;
    border: transparent;
    background-color: white;
    cursor: pointer;
  }
  
  .pushMainContent {
    margin-left: 250px; /* Match this with the sidebar's width */
  }
  </style>