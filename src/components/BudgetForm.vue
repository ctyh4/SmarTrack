<template>
  <div class="budget-form">
    <h2>How would you like to budget this month?</h2>
    <div class="categories">
      <div class="category" v-for="category in categories" :key="category">
        <label>{{ category }}</label>
        <input type="number" v-model="budget[category]" />
      </div>
    </div>
    <div class="total">
      <label>Total: $</label>
      <span>{{ totalBudget }}</span>
    </div>
    <button id="savebutton" type="button" @click="submitBudget">Save</button>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "BudgetForm",
  data() {
    return {
      categories: [],
      budget: {
        Food: null,
        Miscellaneous: 0,
        Retail: null,
        Transport: null,
        Utilities: null,
      },
    };
  },
  mounted() {
    this.getCategories();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  computed: {
    totalBudget() {
      return Object.values(this.budget)
        .reduce((total, amount) => total + amount, 0)
        .toFixed(2);
    },
  },

  methods: {
    resetForm() {
      this.budget = {
        Food: null,
        Miscellaneous: 0,
        Retail: null,
        Transport: null,
        Utilities: null,
      };
    },
    async getCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          this.categories.push(doc.id);
        });
      } catch (error) {
        console.error("Error getting categories: ", error);
      }
    },
    async submitBudget() {
      const currentMonth = new Date().toLocaleString("default", {
        month: "long",
      });
      const currentYear = new Date().getFullYear().toString();
      const monthYearKey = `${currentMonth}-${currentYear}`;
      const budgetData = {
        [monthYearKey]: {
          Food: this.budget.Food,
          Miscellaneous: this.budget.Miscellaneous,
          Transport: this.budget.Transport,
          Retail: this.budget.Retail,
          Utilities: this.budget.Utilities,
        },
      };
      console.log(`Submitting budget data:`, budgetData);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const budgetDocRef = doc(db, "Users", user.email);

          await updateDoc(budgetDocRef, { Budgets: budgetData });

          console.log(`Budget for ${currentMonth} saved successfully.`);
          alert(`Budget for ${currentMonth} saved successfully.`);
          this.resetForm();
        } else {
          console.error("User is not logged in.");
          alert("You must be logged in to save your budget.");
        }
      } catch (error) {
        console.error("Error submitting budget: ", error);
        alert("Error submitting budget.");
      }
    },
  },
};
</script>

<style scoped>
.budget-form {
  /* Styles for your budget form */
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.category {
  display: flex;
  flex-direction: column;
}

.category label {
  margin-bottom: 5px;
}

.total {
  font-weight: bold;
}

#savebutton {
  font-family: pjs;
  border: transparent;
  background-color: #7f56d9;
  color: white;
  padding: 5px 10px;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
}

button:hover {
  background-color: transparent;
  opacity: 0.7;
}
</style>
