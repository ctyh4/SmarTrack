<template>
    <div class="inventory">
        <div v-for="card in cards" :key="card.id" class="card">
            <img :src="card.image" alt="Card Image" class="card-image">
            <h2>{{ card.name }}</h2>
            <!-- <p>{{ card.detail }}</p> -->
        </div> 
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import{ collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
    data() {
    return {
      cards: [],
    };
  },
  methods: {
    async fetchData(user) {
            try {
                const userEmail = String(user.email);
                console.log(userEmail);

                // Directly reference the document using its ID (user's email)
                const docRef = doc(db, "Users", userEmail);
                console.log(docRef);
                // Fetch the document data
                const docSnap = await getDoc(docRef);

                // Check if the document exists
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const name = userData.Name;
                    console.log(userData); // Output for debugging
                    // Update component data properties here if needed
                    this.displayName = name;
                    
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
      },
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
    // mounted() {
    //     async function display() {
    //         let allDocuments = await getDocs(collection(db, "Cards"))

    //         let index = 1
            
    //         allDocuments.forEach((docs) => {
    //             let documentData = docs.data()

    //             let card = (documentData.Card)

    //             let table = document.getElementById("table")
    //             let row = table.insertRow(index)

    //             let cell1 = row.insertCell(0);
    //         })
    //     }
    // }
}
</script>

<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  width: 240px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 5px;
}

p {
  font-size: 1em;
  color: #555;
}
</style>