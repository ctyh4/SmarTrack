<template>
  <sidebar></sidebar> 
  <div id="filter">
    <FilterCard/> 
  </div>
  <HomeButton></HomeButton>
    <div class="cards-page" v-if="user">
      <SearchBar/><br />
        <div class="top-nav">
            <!-- <button id="filter-button" type="button">Filters</button> -->
            <button id="add-card-button" type="button" @click="showAddCardForm = true">
              <img id = "icon" src = "./../assets/add_card_button.png">
              Add Card
            </button>
            <AddCardForm :isVisible="showAddCardForm" :userEmail="user.email" @confirmed="addCard" />
        </div>

        <div class="inventory">
          <div v-for="(cardName, index) in cards" :key="cardName" class="card">
            <!-- <img id = "icon" src = "./../assets/${cardName}.png"> -->
            <h3>{{ cardName }}</h3>
            <button @click="deleteCard(cardName, index)" style="font-size: 14px;">Delete</button>
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
  },
  data() {
    return {
      user: null,
      sidebarActive: false,
      showAddCardForm: false,
      cards: [],
      // imageUrl: SmarTrack,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged (auth, user => {  
      if (user) {
        this.user = user;
        this.fetchCards(user);
      }
    })
  },
  // created() {
  //   this.setImageUrl(this.card.id); 
  // },
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
    async addCard(cardName) {
      try {
        const userDocRef = doc(db, "Users", this.user.email);
        await updateDoc(userDocRef, {
          Inventory: arrayUnion(cardName),
        });
        this.cards.push(cardName);
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
        if (!confirm(`Are you sure you want to delete the card "${cardName}"?`)) {
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
        }
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
    async setImageUrl(cardId) {
      try {
        const image = await import(`@/assets/${cardId}.webp`);
        this.imageUrl = image.default; // Update the data property with the loaded image
      } catch (e) {
        console.error(e);
        this.imageUrl = SmarTrack; // Fallback if the image fails to load
      }
    },
  },
}
</script>

<style scoped>
#filter {
  margin-left: 150px;
  margin-top: 20px;
}

.cards-page {
  display: grid;
  margin-left: 30px;
}

.top-nav {
  overflow: hidden;
  text-align: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  color: #7F56D9;
}

#add-card-button {
    top: 20px;
    right: 10px;
    font-family: pjs;
    font-weight: 600;
    font-size: 15px;
    color: #7F56D9;
    padding: 5px 10px;
    text-align: center;
    margin: 4px 2px;
    cursor: pointer;
    width: 100px;
    border-radius: 5px;
    border-style: solid;
    border-color: #7F56D9;
}

.search-bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
}
 
#search-bar {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    width: 50%;
    box-sizing: border-box;
}

.inventory {
  align-items: center;
  text-align: center;
  margin: auto;
  width: 700px;
  height: 50%;
}
 
.cards {
    font-size: 1.2em;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    animation: fadeIn 0.5s ease-in-out;
}
 
.cards:last-child {
    border-bottom: none;
}
 
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
 
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.pushMainContent {
  margin-left: 250px; /* Match this with the sidebar's width */
}
</style>