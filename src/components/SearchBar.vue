<template>
  <div class="search-container" v-if="user">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search for a card"
      class="search-input"
      @keyup.enter="emitSearch"
    />
    <button class="search-button" @click="emitSearch"></button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  data() {
    return {
      user: false,
      searchTerm: "",
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
    emitSearch() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%; /* Adjust width as needed */
  max-width: 400px; /* Maximum width of the search bar */
  margin-left: 20px;
}

.search-input {
  width: calc(100% - 60px);
  padding: 10px 50px 10px 20px; /* Right padding is larger to make space for the search icon */
  border-radius: 25px; /* Fully rounded ends */
  border: 1px solid #ccc; /* Light grey border */
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

.search-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border: none;
  background: url("@/assets/discovery_icon.png") no-repeat center center; /* Use the image as the background */
  background-size: 50%; /* Adjust size as needed */
  width: 40px; /* Set width for the button */
  cursor: pointer;
}

/* Adjust the size, color, etc., as needed to match your design */
</style>
