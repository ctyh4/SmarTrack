<template v-if="user">
  <Sidebar />
  <HomeButton />
  <div v-if="user">
    <div>
      <router-link to="/tracking/analysis">Analysis</router-link> |
      <router-link to="/tracking/transactions">Transactions</router-link> |
      <router-link to="/tracking/budget">Budget</router-link>
    </div>
    <div class="trackingpage">
      <h1>Transactions Page</h1>
      <br />
    </div>
    <div>
      <TransactionTable ref="transactionTable" />
      <AddTransaction @openModal="toggleModal" />
      <TransactionModal
        v-if="isModalOpen"
        @closeModal="toggleModal"
        @transaction-added="closeModalAndRefresh"
        :isModalOpen="isModalOpen"
      />
    </div>
  </div>
</template>

<script>
import HomeButton from "@/components/HomeButton.vue";
import Sidebar from "@/components/Sidebar.vue";
import TransactionTable from "@/components/TransactionTable.vue";
import AddTransaction from "@/components/AddTransaction.vue";
import TransactionModal from "@/components/TransactionModal.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "AnalysisPage",
  components: {
    HomeButton,
    Sidebar,
    TransactionTable,
    AddTransaction,
    TransactionModal,
  },
  data() {
    return {
      user: false,
      isModalOpen: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    closeModalAndRefresh() {
      this.isModalOpen = false; // Close the modal
      this.$refs.transactionTable.fetchTransactions(this.user.email); // Refresh the transactions list
    },
  },
};
</script>

<style>
.profilepage {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>
