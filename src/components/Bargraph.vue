<template>
    <div class="bar-graph" >
        <bar-chart :data="chartData" :title="chartTitle" :colors="chartColors" :horizontal="true"></bar-chart>
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
            chartTitle: 'Total Amount Spent by Card',
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


                // Step 1: Convert transactions to Card and amount
                const transactionsByCard = transactions.map(transaction => {
                    const card = transaction.card; // Get Card 
                    return { card, amount: transaction.amount };
                });
                console.log(transactionsByCard)
                // Step 2: Group transactions by Card
                const groupedTransactions = transactionsByCard.reduce((acc, transaction) => {
                    const { card, amount } = transaction;
                    if (!acc[card]) {
                        acc[card] = [];
                    }
                    acc[card].push(amount);
                    return acc;
                }, {});
                console.log(groupedTransactions)
                // Calculate the average of each array in groupedTransactions
                const total = {};
                for (const card in groupedTransactions) {
                    const transactions = groupedTransactions[card];
                    const sum = transactions.reduce((acc, amount) => acc + amount, 0);
                    total[card] = sum;
                }
                console.log(total)
                this.chartData = Object.entries(total).map(([card, sum]) => [card, sum]);


            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }
}
</script>

<style scoped>
.bar-graph {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 75%;
}
</style>