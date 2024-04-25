<template>
  <div class="spending-header">
    <span>Track Spending for </span>
    <select v-model="selectedMonth" @change="fetchTransactions">
      <option disabled value="">Select Month</option>
      <option v-for="month in months" :key="month" :value="month">
        {{ month }}
      </option>
    </select>
  </div>
  <div class="chart-container" v-if="transactions.length > 0">
    <canvas ref="pieChartCanvas"></canvas>
  </div>

  <!-- Display a message if there are no transactions -->
  <div class="no-transactions" v-else>
    <p>No transactions found for {{ selectedMonth }}.</p>
  </div>
  <div class="total-spending" v-if="transactions.length > 0">
    <span>{{ "Total Spending in " + selectedMonth }}: </span>
    <span class="total-amount">{{ totalAmountFormatted }}</span>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";

Chart.register(...registerables);
const db = getFirestore(firebaseApp);

export default {
  name: "PieChart",
  data() {
    return {
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
      pieChart: null,
      transactions: [],
      categories: [],
      user: null,
    };
  },
  computed: {
    totalAmountFormatted() {
      const totalAmount = this.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      return `$${totalAmount.toFixed(2)}`;
    },
  },
  methods: {
    async fetchTransactions() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          // Assuming your transactions are stored with a 'timestamp' field in Firestore
          const userDocRef = doc(db, "Users", user.email);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Filter transactions by the selected month
            const monthIndex = this.months.indexOf(this.selectedMonth);
            this.transactions = data.Transactions.filter((transaction) => {
              const transactionDate = new Date(transaction.timestamp);
              return transactionDate.getMonth() === monthIndex;
            });
            if (this.transactions.length > 0) {
              this.$nextTick(() => {
                this.renderChart();
              });
            }
          }
        }
      });
    },
    renderChart() {
      const ctx = this.$refs.pieChartCanvas.getContext("2d");

      // If a pie chart instance already exists, destroy it before creating a new one
      if (this.pieChart) {
        this.pieChart.destroy();
      }

      this.pieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.categories,
          datasets: [
            {
              data: this.categories.map((category) =>
                this.transactions.reduce((acc, transaction) => {
                  if (transaction.category === category) {
                    return acc + transaction.amount;
                  }
                  return acc;
                }, 0)
              ),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
      });
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
  mounted() {
    this.getCategories();
    this.fetchTransactions();
  },
};
</script>

<style scoped>
.pie-chart-component {
  max-width: 100%; /* Take the full width of the parent container */
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the items */
}

.chart-container {
  display: flex; /* Use flexbox to center children */
  justify-content: center; /* Center children horizontally */
  align-items: center; /* Center children vertically */
  height: 250px; /* Set a fixed height */
  width: 100%; /* Full width to fit the container */
  margin: 20px 0; /* Optional: add some vertical space */
}

.spending-header,
.total-spending {
  text-align: center; /* Center the text */
  margin: 10px 0; /* Add some space above and below the text */
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .chart-container {
    height: 200px;
    width: 200px;
  }
}

.no-transactions {
  text-align: center;
  padding: 20px;
  /* Optionally, style it similar to the chart container */
  height: 200px; /* Adjust as needed */
  width: 100%; /* Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc; /* Example style, adjust as needed */
}
</style>
