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
    <button @click="submitBudget">Save</button>
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
        Food: 0,
        Miscellaneous: 0,
        Retail: 0,
        Transport: 0,
        Utilities: 0,
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
        Food: 0,
        Miscellaneous: 0,
        Retail: 0,
        Transport: 0,
        Utilities: 0,
      };
    },
    async getCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          //console.log(doc.id)
          this.categories.push(doc.id);
        });
        console.log(this.categories)
      } catch (error) {
        console.error("Error getting categories: ", error);
      }
    },
    async submitBudget() {
      try {
        
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
        const auth = getAuth();
        const user = auth.currentUser;

       
        const budgetDocRef = doc(db, "Users", user.email);

        await updateDoc(budgetDocRef, { Budgets: budgetData });

        console.log(`Budget for ${currentMonth} saved successfully.`);
        alert(`Budget for ${currentMonth} saved successfully.`);
        this.resetForm();
        
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

button {
  /* Style your button accordingly */
}
</style>
