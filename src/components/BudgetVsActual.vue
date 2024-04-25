<template>
  <div class="graphs">
    <div class="select-month">
      <h2>Budget vs Actual Spending</h2>
      <span>Track Spending for </span>
      <select v-model="selectedMonth" @change="getTransactions">
        <option disabled value="">Select Month</option>
        <option v-for="month in months" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
    </div>
    <div class="chart">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables, Title } from "chart.js/auto";
import "chartjs-plugin-datalabels";
Chart.register(...registerables, Title);
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "BudgetVsActual",
  data() {
    return {
      user: false,
      selectedMonth: new Date().toLocaleString("default", { month: "long" }),
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
      transactions: [],
      budget: [],
      chart: null,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
      }
      this.getTransactions();
    });
    this.getCategories();
    this.getTransactions();
  },
  methods: {
    renderChart() {
      try {
        const ctx = this.$refs.chart.getContext("2d");

        if (this.chart) {
          this.chart.destroy();
        }

        const config = {
          type: "bar",
          data: {
            labels: this.categories,
            datasets: [
              {
                type: "line",
                label: "Actual Spending",
                data: this.categories.map((category) =>
                  this.transactions.length === 0
                    ? 0
                    : this.transactions.reduce((acc, transaction) => {
                        if (transaction.category === category) {
                          return acc + transaction.amount;
                        }
                        return acc || 0;
                      }, 0)
                ),
                fill: false,
                borderColor: "#7f56d9",
              },
              {
                type: "bar",
                label: "Budget",
                data: this.categories.map((category) => {
                  if (this.budget.length === 0) {
                    return 0;
                  }
                  const budgetAmount = this.budget[category]; // assuming only one budget object
                  return budgetAmount || 0; // default to 0 if category doesn't exist
                }),
                borderColor: "#7f56d9",
                backgroundColor: "rgb(227, 217, 248)",
              },
            ],

            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Budget Vs. Actual Spending",
                },
              },
            },
          },
        };
        this.chart = new Chart(ctx, config);
      } catch (error) {
        console.error("Error building chart:", error);
      }
    },
    async getTransactions() {
      if (!this.user) return;
      try {
        const userEmail = String(this.user.email);
        const userDocRef = doc(db, "Users", userEmail);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          // Assuming budgets are an object with months as keys
          this.budget = data.Budgets[this.selectedMonth] || {}; // Fallback to an empty object if no budget is set for the month

          const transactions = userDocSnap.data().Transactions || []; // Default to empty array if no transactions are found
          const monthIndex = this.months.indexOf(this.selectedMonth); // Get the index of the selected month

          this.transactions = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.timestamp);
            return transactionDate.getMonth() === monthIndex;
          });
        }

        this.renderChart();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    async getCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        this.categories = querySnapshot.docs.map((doc) => doc.id);
      } catch (error) {
        console.error("Error getting categories: ", error);
      }
    },
  },
};
</script>

<style scoped>
.graphs {
  margin-left: auto;
  margin-right: auto;
}

.chart {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 75%;
}
</style>
