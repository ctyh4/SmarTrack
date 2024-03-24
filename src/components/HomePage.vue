<template>
  <div id="home-container">
      <h1>Welcome back!</h1>
      <h2>What would you like to do today?</h2>
  </div>


  <div class="button-container">
    <button class="main-button" @click="$router.push('/profile')">
      <img id = "icon" src = "./../assets/profile_icon.png">
      Profile</button>
    <h3>Your personal details and settings.</h3>
  </div>

  <div class="button-container">
    <button class="main-button" @click="$router.push('/cards')">
      <img id = "icon" src = "./../assets/cards_icon.png">
      Cards</button>
    <h3>Where your inventory of cards are kept.</h3>
  </div>

  <div class="button-container">
    <button class="main-button" @click="$router.push('/discovery')">
      <img id = "icon" src = "./../assets/discovery_icon.png">
      Discovery</button>
    <h3>Looking for new bank cards but not sure which to get?
    Check out some suggestions we have for you!</h3>
  </div>

  <div class="button-container">
    <button class="main-button" @click="$router.push('/payment')">
      <img id = "icon" src = "./../assets/payment_icon.png">
      Payment Recommendation</button>
    <h3>Get a suggestion on the most optimal card to use for maximum benefits, 
      and pay instantly!
    </h3>
  </div>

  <div class="button-container">
    <button class="main-button" @click="$router.push('/tracking')">
      <img id = "icon" src = "./../assets/tracking_icon.png">
      Tracking & Analysis</button>
    <h3>Track your recent expenses, and 
      take a look at how close you are to your budgeting targets!</h3>
  </div>
</template>

<script>
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
</script>

<style>
h1 {
  font-family: pjs;
  font-size: 40px;
  font-weight: bold;
}

h2 {
  font-family: pjs;
  font-size: 15px;
}

h3 {
  font-family: pjs;
  font-size: 13px;
  width: 280px;
  align-items: center;
}

img {
  width: 25%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
}
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* makes sure that the .home div takes up full viewport height */
}

.button-container,.second-button-container {
  display: flex;
  flex-direction: row; /* Stack buttons horizontally */
  align-items: center; /* Align buttons in the center */
  margin: 30px;
  
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
}

button:hover {
  background-color: transparent;
  opacity: 0.4;
}
</style>