<template>
  <div class="budget-form">
    <h2>Would you like to add/edit your budget?</h2>
    <div>
      <label for="budget-month">Select Month: </label>
      <select id="budget-month" v-model="selectedMonth">
        <option disabled value="">Select a Month</option>
        <option v-for="month in months" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
      <br /><br />
    </div>
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
      selectedMonth: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
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
      return this.categories
        .reduce((total, category) => {
          // Ensure each amount is treated as a number.
          const amount = Number(this.budget[category]) || 0;
          return total + amount;
        }, 0)
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
        console.log(this.categories);
      } catch (error) {
        console.error("Error getting categories: ", error);
      }
    },
    async submitBudget() {
      try {
        if (!this.selectedMonth) {
          alert("Please select a month for the budget.");
          return;
        }

        const budgetData = {
          [this.selectedMonth]: {
            Food: this.budget.Food,
            Miscellaneous: this.budget.Miscellaneous,
            Retail: this.budget.Retail,
            Transport: this.budget.Transport,
            Utilities: this.budget.Utilities,
            Date: new Date().toISOString(), // Store the current timestamp
          },
        };

        if (this.user) {
          const budgetDocRef = doc(db, "Users", this.user.email);

          // Use setDoc with { merge: true } to update the budgets subfield without overwriting other fields
          await updateDoc(budgetDocRef, {
            [`Budgets.${this.selectedMonth}`]: budgetData[this.selectedMonth],
          });

          console.log(`Budget for ${this.selectedMonth} saved successfully.`);
          alert(`Budget for ${this.selectedMonth} saved successfully.`);
          this.$emit("budget-saved");
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
