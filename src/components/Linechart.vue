<template>
    <div class="line-chart" >
        <line-chart :data="chartData" :title="chartTitle" :colors="chartColors"></line-chart>
    </div>
</template>


<script>
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);


export default {
    name: 'Charts',
    data() {
        return {
            user: false,
            chartData: [],
            chartTitle: 'Total Amount Spent by Month',
            chartColors: ['#7f56d9']
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {  
            if (user) {
                this.user = user;
            }
            this.getTransactions();
        });
    },
    methods: {
        async getTransactions() {
            try {
                const userEmail = String(this.user.email);
                const userDocRef = doc(db, "Users", userEmail);
                const userDocSnap = await getDoc(userDocRef);
                const transactions = userDocSnap.data().Transactions;


                // Step 1: Convert timestamp to month
                const transactionsByMonth = transactions.map(transaction => {
                    const date = new Date(transaction.timestamp);
                    const month = date.getMonth(); // Get month (0-11)
                    return { month, amount: transaction.amount };
                });
                console.log(transactionsByMonth)
                // Step 2: Group transactions by month
                const groupedTransactions = transactionsByMonth.reduce((acc, transaction) => {
                    const { month, amount } = transaction;
                    if (!acc[month]) {
                        acc[month] = [];
                    }
                    acc[month].push(amount);
                    return acc;
                }, {});
                console.log(groupedTransactions)
                // Calculate the average of each array in groupedTransactions
                const total = {};
                for (const month in groupedTransactions) {
                    const transactions = groupedTransactions[month];
                    const sum = transactions.reduce((acc, amount) => acc + amount, 0);
                    total[month] = sum;
                }
                console.log(total)
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                this.chartData = Object.entries(total).map(([month, sum]) => {
                    return [monthNames[month], sum];
                });


            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }
}
</script>

<style scoped>
.line-chart {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 75%;
}
</style>