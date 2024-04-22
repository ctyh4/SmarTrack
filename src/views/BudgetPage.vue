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
      <h1>Budget Page</h1>
      <br />
    </div>
    <div>
      <SpendingPie />
      <BudgetForm />
    </div>
  </div>
</template>

<script>
import HomeButton from "@/components/HomeButton.vue";
import SpendingPie from "@/components/SpendingPie.vue";
import BudgetForm from "@/components/BudgetForm.vue";
import Sidebar from "@/components/Sidebar.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "BudgetPage",
  components: {
    HomeButton,
    Sidebar,
    BudgetForm,
    SpendingPie,
  },
  data() {
    return {
      user: false,
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
};
</script>

<style scoped>
.profilepage {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>
