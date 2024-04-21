<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Recipient</th>
          <th>Payment Method</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ formatCurrency(transaction.amount) }}</td>
          <td>{{ transaction.category }}</td>
          <td>{{ transaction.recipient }}</td>
          <td>{{ transaction.card }}</td>
          <td>{{ formatDate(transaction.timestamp) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "TransactionTable",
  data() {
    return {
      transactions: [],
    };
  },
  methods: {
    async fetchTransactions(email) {
      const userDocRef = doc(db, "Users", email);
      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          this.transactions = userData.Transactions || [];
          // Sorting the transactions by timestamp in descending order
          this.transactions.sort((a, b) =>
            b.timestamp > a.timestamp ? 1 : -1
          );
        } else {
          console.log("No such document!");
          this.transactions = [];
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        this.transactions = [];
      }
    },
    formatDate(firestoreTimestamp) {
      // Check if the timestamp is an instance of Firestore Timestamp
      if (firestoreTimestamp && firestoreTimestamp.toDate) {
        // Convert Firestore Timestamp to JavaScript Date object
        const date = firestoreTimestamp.toDate();
        // Format the date to local string
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } else {
        return typeof firestoreTimestamp === "string"
          ? new Date(firestoreTimestamp).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Invalid Date";
      }
    },
    formatCurrency(value) {
      // Convert the number to a string and format it as currency with 2 decimal places
      return `$${parseFloat(value).toFixed(2)}`;
    },
  },
  mounted() {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Use the email to fetch transactions
        this.fetchTransactions(user.email);
      }
    });
  },
};
</script>

<style scoped>
/* Style the table itself */
table {
  width: 100%;
  border-collapse: collapse; /* Collapse borders */
  margin-top: 1rem; /* Add space above the table */
  font-size: 0.9rem; /* Adjust font size */
  background-color: #fff; /* Background color */
}

/* Style the table headers */
thead {
  background-color: #f4f4f8; /* Header background color */
}

th {
  text-align: left; /* Align text to the left */
  padding: 0.5rem; /* Add padding */
  border-bottom: 2px solid #e1e1e1; /* Bottom border */
}

/* Style the table rows */
tbody tr {
  border-bottom: 1px solid #e1e1e1; /* Bottom border */
}

/* Style the table cells */
td {
  padding: 0.5rem; /* Add padding */
  text-align: left; /* Align text to the left */
}

/* Style rows on hover */
tbody tr:hover {
  background-color: #f9f9fb; /* Hover background color */
}

/* Align numeric values to the right for better readability */
td:nth-child(1), /* Amount */
  td:nth-child(5) {
  /* Date */
  text-align: right; /* Align text to the right */
}

/* Add styling for tabs (Analysis, Transactions, Budget) */
.tabs {
  list-style-type: none; /* Remove list bullet points */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
  display: flex; /* Display tabs inline */
  justify-content: center; /* Center tabs */
  background-color: #f8f8f8; /* Background color for tabs */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow for some depth */
}

.tabs li {
  padding: 0.5rem 1rem; /* Padding around tab text */
  cursor: pointer; /* Change mouse cursor on hover */
}

.tabs li:hover {
  background-color: #e1e1e1; /* Hover color for tabs */
}

.tabs li.active {
  border-bottom: 2px solid #3498db; /* Active tab indicator */
  color: #3498db; /* Active tab text color */
}
</style>
