<template>
    <div id="home-container">
        <h1>Welcome back!</h1>
        <h2>What would you like to do today?</h2>
    </div>
  
    <!-- <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a href="#">Profile</a>
      <a href="#">Cards</a>
      <a href="#">Discovery</a>
      <a href="#">Payment Recommendation</a>
      <a href="#">Tracking & Analysis</a>
    </div>
  
    <span class = "menu" style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; Home</span>
    -->
  
    <div class = "button-container">
      <div class="first-button-container">
        <div class="button">
          <button @click="$router.push('/profile')">
            <img id = "icon" src = "./../assets/profile_icon.png">
            Profile</button>
          <h3>Your personal details and settings.</h3>
        </div>
  
        <div class="button">
          <button @click="$router.push('/cards')">
            <img id = "icon" src = "./../assets/cards_icon.png">
            Cards</button>
          <h3>Where your inventory of cards are kept.</h3>
        </div>
  
        <div class="button">
          <button @click="$router.push('/discovery')">
            <img id = "icon" src = "./../assets/discovery_icon.png">
            Discovery</button>
          <h3>Looking for new bank cards?
          Check out some suggestions we have for you!</h3>
        </div>
      </div>
  
      <div class="second-button-container">
        <div class="button">
          <button @click="$router.push('/payment')">
            <img id = "icon" src = "./../assets/payment_icon.png">
            Payment Recommendation</button>
          <h3>Get a suggestion on the most optimal card to use for maximum benefits, 
            and pay instantly!
          </h3>
        </div>
  
        <div class="button">
          <button @click="$router.push('/tracking')">
            <img id = "icon" src = "./../assets/tracking_icon.png">
            Tracking & Analysis</button>
          <h3>Track your recent expenses, and 
            take a look at how close you are to your budgeting targets!</h3>
        </div>
      </div>
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
  
  <style scoped>
  h1 {
    font-family: pjs;
    font-size: 40px;
    font-weight: bold;
    color: black;
  }
  
  h2 {
    font-family: pjs;
    font-size: 15px;
  }
  
  h3 {
    font-family: pjs;
    font-size: 13px;
    width: 300px;
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
  
  .home-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-left: auto;
    margin-right: auto;
    height: 100vh; /* makes sure that the .home div takes up full viewport height */
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
    opacity: 0.4;
  }
  
  .menu {
    position: relative;
  }
  
  .sidenav {
    height: 100%;
    width: 0;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
  
  .sidenav a:hover {
    color: #f1f1f1;
  }
  
  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }
  
  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }
  </style>
  