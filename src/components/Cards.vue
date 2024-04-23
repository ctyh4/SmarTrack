<template>
  <!-- <sidebar></sidebar>  -->
  <div>
    <FilterCard @update-filter="handleFilterUpdate" /> 
  </div>
    <div class="cards-page" v-if="user">
      <SearchBar @search="handleSearch" /><br />
        <div class="top-nav">
            <button id="home-button" type="button" @click="$router.push('/home')">Home</button>
            <button id="filter-button" type="button">Filters</button>
            <!-- <div id="search-bar-container">
              <input id = "search-bar" type="text" placeholder="Search here">
            </div> -->
            <button id="add-card-button" type="button" @click="showAddCardForm = true">Add Card</button>
            <AddCardForm :isVisible="showAddCardForm" :userEmail="user.email" @confirmed="addCard" />
        </div>

        <div class="inventory">
          <!-- <CardsInventory/> -->
          <div v-for="cardName in cards" :key="cardName" class="card">
            <h3>{{ cardName }}</h3>
          </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import SearchBar from "@/components//SearchBar.vue";
import FilterCard from "@/components/FilterCard.vue";
import AddCardForm from './AddCardForm.vue';
import CardsInventory from './CardsInventory.vue';
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
    CardsInventory,
  },
  data() {
    return {
      user:null,
      sidebarActive: false,
      showAddCardForm: false,
      cards: [],
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged (auth, user => {  
      if (user) {
        this.user = user;
        this.fetchData(user);
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
    async addCard(cardName) {
      try {
        const userDocRef = doc(db, "Users", String(user.email));
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
    watch: {
    // When the user logs in, fetch their card inventory
      user: {
        immediate: true,
        handler(newUser) {
          if (newUser) {
            this.fetchCards(newUser);
          }
        }
      },
    },
  },
}
</script>

<style scoped>
.cards-page {
    text-align: center;
    align-items: center;
    margin: auto;
}

.top-nav {
  overflow: hidden;
  text-align: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  color: #7F56D9;
}

/* Style the links inside the navigation bar */
.top-nav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.top-nav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the "active" element to highlight the current page */
.top-nav a.active {
  background-color: #2196F3;
  color: white;
}

/* Style the search box inside the navigation bar */
.search-bar input[type=text] {
  float: right;
  padding: 6px;
  border: none;
  margin: auto;
  margin-top: 8px;
  font-size: 15px;
  font-family: pjs;
  width: 400px;
}

/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
  .top-nav a, .top-nav input[type=text] {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .top-nav input[type=text] {
    border: 1px solid #ccc;
  }
}

#home-button, #filter-button {
    top: 25px;
    right: 10px;
    background-color: #7F56D9;
    font-family: pjs;
    font-weight: 600;
    font-size: 15px;
    color: white;
    padding: 5px 10px;
    text-align: center;
    margin: 4px 2px;
    cursor: pointer;
    width: 80px;
    border-radius: 5px;
}

#add-card-button {
    top: 25px;
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

#home-button {
    position: absolute;
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
 
#list {
    list-style: none;
    padding: 0;
    margin: 0;
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