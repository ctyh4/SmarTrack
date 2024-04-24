<template>
  <div class="budget-table-container">
    <h2>Budget Overview</h2>
    <table class="budget-table">
      <thead>
        <tr>
          <th>Month</th>
          <th v-for="category in categories" :key="category">
            {{ category }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(budget, month) in budgets" :key="month">
          <td>{{ month }}</td>
          <td v-for="category in categories" :key="category">
            {{ budget[category] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  getFirestore,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "BudgetTable",
  data() {
    return {
      user: null,
      budgets: {},
      categories: [],
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getBudgets();
        this.getCategories(); // Implement this method to fetch categories
      }
    });
  },
  methods: {
    sortBudgetsByMonth(budgetsObj) {
      const monthOrder = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };

      // Convert object to an array of objects
      const budgetsArray = Object.keys(budgetsObj).map((month) => {
        return { month, ...budgetsObj[month] };
      });

      // Sort the array by month
      budgetsArray.sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);

      // Convert sorted array back to object
      const sortedBudgets = {};
      budgetsArray.forEach((budget) => {
        sortedBudgets[budget.month] = budget;
      });

      return sortedBudgets;
    },
    async getBudgets() {
      if (!this.user) return;
      try {
        const userEmail = String(this.user.email);
        const userDocRef = doc(db, "Users", userEmail);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          this.budgets = data.Budgets || {};
          this.budgets = this.sortBudgetsByMonth(this.budgets);
        } else {
          // Handle the case where the document does not exist
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    },

    async getCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          //console.log(doc.id)
          this.categories.push(doc.id);
        });
        console.log(this.categories);
      } catch (error) {
        console.error("Error getting categories: ", error);
      }
    },
  },
};
</script>

<style scoped>
.budget-table-container {
  overflow-x: auto; /* Ensures the table is scrollable on small screens */
}

.budget-table {
  margin-top: 10px;
  width: 65%;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse; /* Removes the space between borders */
}

.budget-table thead {
  background-color: #f5f5f5; /* Adds a background color to the table header */
  border-bottom: 2px solid #e1e1e1; /* Adds a bottom border to the header */
}

.budget-table th,
.budget-table td {
  padding: 8px 16px; /* Adds padding inside the cells */
  text-align: left; /* Aligns text to the left */
  border-bottom: 1px solid #e1e1e1; /* Adds a border to each cell */
}

.budget-table th {
  font-weight: 600; /* Makes the header text bold */
}

.budget-table tr:last-child td {
  border-bottom: none; /* Removes the border from the last row */
}
</style>
