<template>
  <sidebar></sidebar>

  <div class="discoverypage">
    <SearchBar @search="handleSearch" /><br />
    <CardGrid ref="cardGrid" /><br />
    <Logout />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import CardGrid from "@/components/CardGrid.vue";
import SearchBar from "@/components//SearchBar.vue";
//import CardItem from "@/components/CardItem.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import Logout from "@/components/Logout.vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "DiscoveryPage",
  components: {
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
  },
};
</script>
