<template>
  <sidebar></sidebar>
  <div>
    <FilterCard id="filter" @update-filter="handleFilterUpdate" />
  </div>

  <div class="discoverypage" v-if="user">
    <SearchBar @search="handleSearch" /><br />
    <CardGrid ref="cardGrid" /><br />
    <Logout />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import CardGrid from "@/components/CardGrid.vue";
import SearchBar from "@/components//SearchBar.vue";
import FilterCard from "@/components/FilterCard.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import Logout from "@/components/Logout.vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "DiscoveryPage",
  components: {
    FilterCard,
    SearchBar,
    CardGrid,
    Logout,
    sidebar: Sidebar,
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
  methods: {
    handleSearch(searchTerm) {
      this.$refs.cardGrid.updateSearch(searchTerm);
    },
    handleFilterUpdate({ minCashback, maxAnnualFee }) {
      console.log("handling filter update");
      this.$refs.cardGrid.updateFilter({ minCashback, maxAnnualFee });
    },
  },
};
</script>


<style>
#filter {
  margin-top: 20px;
  margin-left: 180px;
  width: 200px;
}
</style>