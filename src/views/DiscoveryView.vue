<template>
  <Sidebar />
  <HomeButton />
  <div id="filter" v-if="user">
    <FilterCard @update-filter="handleFilterUpdate" />
  </div>

  <div class="discoverypage" v-if="user">
    <SearchBar @search="handleSearch" /><br />
    <CardGrid ref="cardGrid" /><br />
    <Logout />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import HomeButton from "@/components/HomeButton.vue";
import CardGrid from "@/components/CardGrid.vue";
import SearchBar from "@/components//SearchBar.vue";
import FilterCard from "@/components/FilterCard.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "DiscoveryPage",
  components: {
    FilterCard,
    SearchBar,
    CardGrid,
    Sidebar,
    HomeButton,
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

<style scoped>
#filter {
  margin-left: 175px;
  margin-top: 20px;
  width: 400px;
}
.discoverypage {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>
