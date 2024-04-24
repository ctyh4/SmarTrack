<template v-if="user">
  <Sidebar />
  <HomeButton />
  <div class="container" v-if="user">
    <div>
      <router-link to="/tracking/analysis">Analysis</router-link> |
      <router-link to="/tracking/transactions">Transactions</router-link> |
      <router-link to="/tracking/budget">Budget</router-link>
    </div>
      <h1>Analysis Page</h1>
    <div class="grid-container">
      <Bargraph /><br/>
      <Linechart /><br/>
      <BudgetVsActual /> <br/>
      <CashbackByCard />
    </div>
  </div>
</template>

<script>
import HomeButton from "@/components/HomeButton.vue";
import Sidebar from "@/components/Sidebar.vue";
import Bargraph from "@/components/Bargraph.vue";
import Linechart from "@/components/Linechart.vue";
import BudgetVsActual from "@/components/BudgetVsActual.vue";
import CashbackByCard from "@/components/CashbackByCard.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "AnalysisPage",
  components: {
    HomeButton,
    Sidebar,
    Bargraph,
    Linechart,
    BudgetVsActual,
    CashbackByCard
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
.container {
  margin-top: 30px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>
