<template v-if="user">
  <Sidebar />
  <HomeButton />
  <div v-if="user">
    <div class="trackingpage">
      <h1>Transactions Page</h1>
      <br />
    </div>
    <div>
      <router-link to="/tracking/analysis">Analysis</router-link> |
      <router-link to="/tracking/transactions">Transactions</router-link> |
      <router-link to="/tracking/budget">Budget</router-link>
    </div>
  </div>
</template>

<script>
import HomeButton from "@/components/HomeButton.vue";
import Sidebar from "@/components/Sidebar.vue";
import Transactions from "@/components/Transactions.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "AnalysisPage",
  components: {
    HomeButton,
    Sidebar,
    Transactions,
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

<style>
.profilepage {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>
