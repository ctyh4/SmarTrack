<template>
  <!-- <div v-if="user"> -->
  <sidebar @toggle="handleSidebarToggle" />
  <div
    class="home-page"
    :class="{ pushMainContent: sidebarActive }"
    v-if="user"
  >
    <div class="home-page">
      <div id="home-container">
        <h1>Welcome back!</h1>
        <h2>What would you like to do today?</h2>
      </div>

      <div class="button-container">
        <div class="button">
          <button @click="$router.push('/profile')">
            <img id="icon" src="./../assets/profile_icon.png" />Profile
          </button>
          <h3>Customise your personal details, preferences and settings.</h3>
        </div>

        <div class="button">
          <button @click="$router.push('/cards')">
            <img id="icon" src="./../assets/cards_icon.png" />Cards
          </button>
          <h3>Where your inventory of cards are kept and managed with ease.</h3>
        </div>

        <div class="button">
          <button @click="$router.push('/discovery')">
            <img id="icon" src="./../assets/discovery_icon.png" />Discovery
          </button>
          <h3>
            Looking for new bank cards? Check out some suggestions we have for
            you!
          </h3>
        </div>

        <div class="button">
          <button @click="$router.push('/payment')">
            <img id="icon" src="./../assets/payment_icon.png" />Payment
            Recommendation
          </button>
          <h3>
            Get a suggestion on the most optimal card to use for maximum
            benefits, and pay instantly!
          </h3>
        </div>

        <div class="button">
          <button @click="$router.push('/tracking')">
            <img id="icon" src="./../assets/tracking_icon.png" />Tracking &
            Analysis
          </button>
          <h3>
            Track your recent expenses, and take a look at how close you are to
            your budgeting targets!
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
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
  components: {
    sidebar: Sidebar,
  },
  data() {
    return {
      sidebarActive: false,
    };
  },
  methods: {
    handleSidebarToggle(isActive) {
      this.sidebarActive = isActive;
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: pjs;
  font-size: 40px;
  font-weight: bold;
  color: black;
  margin-bottom: 15px;
}

h2 {
  font-family: pjs;
  font-size: 15px;
}

h3 {
  font-family: pjs;
  font-size: 13px;
  width: 290px;
  align-items: center;
}

img {
  width: 25%;
  height: 25%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
}

.home-page {
  align-items: center;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

h2 {
  font-family: pjs;
  font-size: 15px;
}

h3 {
  font-family: pjs;
  font-size: 13px;
  width: 290px;
  align-items: center;
}

img {
  width: 25%;
  height: 25%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
}

.home-page {
  align-items: center;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.home-container {
  /* flex-direction: row;
    flex-wrap: wrap; */
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  margin: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.button-container {
  margin-top: 0;
}

.first-button-container {
  margin-top: 0;
  margin-bottom: 0;
  justify-content: center;
  align-items: start;
}

.second-button-container {
  margin-top: 0;
}

.button {
  flex-direction: row; /* Stack buttons horizontally */
  align-items: center; /* Align buttons in the center */
  margin: 40px;
  justify-content: center;
  display: inline-block;
}

button {
  width: 200px; /* Set the width of the buttons */
  padding: 10px;
  border: none;
  background-color: transparent;
  color: black;
  cursor: pointer;
  font-family: pjs;
  font-size: 17px;
  font-weight: bold;
  display: inline-block;
}

button:hover {
  background-color: transparent;
  opacity: 0.3;
}

.pushMainContent {
  margin-left: 250px; /* Match this with the sidebar's width */
}
</style>
