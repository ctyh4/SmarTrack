<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Add Transaction</h2>
      <form @submit.prevent="submitTransaction">
        <div>
          <label for="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            v-model="newTransaction.Amount"
            step="0.01"
            required
          />
        </div>
        <div>
          <label for="category">Category:</label>
          <select id="category" v-model="newTransaction.Category" required>
            <option value="">Select a category</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label for="recipient">Recipient:</label>
          <select
            id="selectRecipient"
            v-model="newTransaction.Recipient"
            required
          >
            <option value="">Select a Recipient</option>
            <option
              v-for="recipient in recipients"
              :key="recipient"
              :value="recipient"
            >
              {{ recipient }}
            </option>
          </select>
        </div>
        <div>
          <label for="paymentMethod">Card:</label>
          <select
            id="selectCard"
            v-model="newTransaction.PaymentMethod"
            required
          >
            <option value="">Select a Card</option>
            <option v-for="card in cards" :key="card" :value="card">
              {{ card }}
            </option>
          </select>
        </div>
        <div>
          <label for="date">Date:</label>
          <input
            type="datetime-local"
            id="date"
            v-model="newTransaction.Date"
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "AddTransaction",
  props: {
    isModalOpen: Boolean,
  },
  data() {
    return {
      categories: [],
      recipients: [],
      cards: [],
      newTransaction: {
        Amount: null,
        Category: "",
        Recipient: "",
        PaymentMethod: "",
        Date: "",
      },
      user: null,
    };
  },
  mounted() {
    this.getRecipients();
    this.getCategories();
    this.getCards();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    async getRecipients() {
      try {
        const querySnapshot = await getDocs(collection(db, "Companies"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // Push each recipient to the recipients array
          this.recipients.push(doc.id);
        });
      } catch (error) {
        console.error("Error getting recipients: ", error);
      }
    },
    async getCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // Push each recipient to the recipients array
          this.categories.push(doc.id);
        });
      } catch (error) {
        console.error("Error getting categories: ", error);
      }
    },
    async getCards() {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            this.user = user;
            const userEmail = String(user.email);
            const userDocRef = doc(db, "Users", userEmail);
            //console.log(userDocRef);
            const userDocSnap = await getDoc(userDocRef);
            const addedCards = userDocSnap.data().Inventory;
            this.cards = addedCards;
          }
        });
      } catch (error) {
        console.error("Error getting user document: ", error);
      }
    },
    async submitTransaction() {
      try {
        // Format the date to a Firestore timestamp if necessary
        this.newTransaction.Date = this.formatDateForFirestore(
          this.newTransaction.Date
        );

        const newTransaction = {
          amount: this.newTransaction.Amount,
          category: this.newTransaction.Category,
          recipient: this.newTransaction.Recipient,
          card: this.newTransaction.PaymentMethod,
          timestamp: this.newTransaction.Date, // Use the Date object directly
          // cardCB: cardCB, // Include card cashback calculation if necessary
        };

        // Add the new transaction to Firestore under the current user's transactions collection
        const user = this.user; // Replace with your actual user state
        const userDocRef = doc(db, "Users", user.email);
        await updateDoc(userDocRef, {
          Transactions: arrayUnion(newTransaction),
        });

        this.$emit("transaction-added");

        // Reset the form
        this.resetForm();

        // Refresh the transactions list
        // This will depend on how you're retrieving the transactions
        // If you have a method to fetch transactions, call it here
        // this.fetchTransactions();
      } catch (error) {
        console.error("Error adding transaction: ", error);
        alert("Error adding transaction.");
      }
    },
    formatDateForFirestore(datetimeLocal) {
      if (!datetimeLocal) {
        return "";
      }
      // Extract date and time parts up to minutes
      const [datePart, timePart] = datetimeLocal.split("T");
      const timeParts = timePart.split(":");
      // Reconstruct the string with date and time parts up to minutes
      const formattedDateTime = `${datePart}T${timeParts[0]}:${timeParts[1]}`;
      return formattedDateTime;
    },
    resetForm() {
      this.newTransaction = {
        Amount: null,
        Category: "",
        Recipient: "",
        PaymentMethod: "",
        Date: "",
      };
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Position fixed to stay in place even when scrolling */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 1000; /* High z-index to ensure it's above other content */
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: for styling */
  z-index: 1001; /* Ensure the content is above the overlay */
  max-width: 500px; /* Maximum width of the modal box */
  width: 90%; /* Full width up to the max width */
  margin: auto; /* Center in the overlay */
}

.close {
  position: absolute; /* Position the close button absolutely within the .modal-content */
  top: 10px; /* Position from the top of the .modal-content */
  right: 20px; /* Position from the right of the .modal-content */
  font-size: 25px;
  cursor: pointer;
  color: #333; /* Change as needed */
}
</style>
