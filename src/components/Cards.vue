<template>
  <sidebar @toggle="handleSidebarToggle" />
  <div id="container">
    <FilterCard id="filter" @update-filter="handleFilterUpdate" />
  
    <div class="cards-page" v-if="user">
        <div class="top-nav">
          <SearchBar @search="handleSearch" />
            <button id="add-card-btn" type="button" @click="showAddCardForm = true">
              Add Card
              <img id = "add-card-icon" src = "./../assets/add_card_button.png">
            </button>
            <AddCardForm id="add-card-form" :isVisible="showAddCardForm" :userEmail="user.email" @confirmed="addCard" />
            
            <button id="liked-card-btn" type="button" @click="route">
              Liked Cards
              <img id = "liked-card-icon" src = "./../assets/liked_button.png">
            </button>
            <HomeButton/>
        </div>
        
        <div class="cards-grid">
          <CardInventory  
          :cards="filteredCards" 
          :userEmail="user.email"
          @delete-card="deleteCard"/>
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
import CardInventory from './CardInventory.vue';
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
    CardInventory,
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

        if (docSnap.exists() && docSnap.data().Inventory) {
          const userData = docSnap.data();
          this.cards = userData.Inventory;
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
        this.showAddCardForm = false; //Close Add Card Form
        this.$router.push("/cards");
      } catch (error) {
        console.error("Error updating profile:", error);
      } 
    },
    async deleteCard(cardName, index) {
      try {
        // Confirm with the user that they want to delete the card
        if (!confirm(`Are you sure you want to delete the card "${cardName}" from your inventory?`)) {
          return;
        }

        // Update Firestore
        // Fetch the current inventory, filter out the card to delete, then update Firestore
        const userDocRef = doc(db, "Users", this.user.email);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists() && docSnap.data().Inventory) {
          const updatedInventory = docSnap.data().Inventory.filter(item => item !== cardName);
          await updateDoc(userDocRef, {
            Inventory: updatedInventory,
          });

          // Remove the card from local state
          this.cards.splice(index, 1);
          console.log("Deleted", {cardName});
          this.$router.push("/cards");
        }
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
    async route() {
      this.$router.push("/liked");
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
  margin-left: 150px;
  height: 300px;
  width: 200px;
}

.cards-page {
  width: calc(100% - 270px);
  max-width: 1100px;
  margin-left: 25px;
  flex-grow: 1;
}

.top-nav {
  text-align: center;
  align-items: center;
  display: flex;
  color: #7F56D9;
}

#add-card-btn {
    display: flex;
    height: 40px;
    width: 130px;
    top: 28px;
    right: 125px;
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

#liked-card-btn {
    display: flex;
    height: 40px;
    width: 150px;
    top: 28px;
    right: 265px;
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

#add-card-icon {
  width: 17px;
  height: 17px;
  margin-left: 7px;
}

#liked-card-icon {
  width: 20px;
  height: 17px;
  margin-left: 7px;
}

.cards-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 800px;
  height: 50%;
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