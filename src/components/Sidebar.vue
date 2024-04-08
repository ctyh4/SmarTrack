<template>
    <div class="sidebar-container">
      <div id="mySidenav" class="sidenav" :class="{ 'openNavClass': isActive }">
        <a class="closebtn" @click="toggleNav">&times;</a>
    
        <!-- <a class = "page-router" style = "margin-top: 45px;" @click="$router.push('/Home')">Home</a> -->
        <a class = "page-router" style = "margin-top: 45px;" @click="$router.push('/Profile')">Profile</a>
        <a v-if="$route.path !== '/Cards'" class = "page-router" @click="$router.push('/Cards')">Cards</a>
        <a class = "page-router" @click="$router.push('/Discovery')">Discovery</a>
        <a class = "page-router" @click="$router.push('/Payment')">Payment Recommendation</a>
        <a class = "page-router" @click="$router.push('/Tracking')">Tracking & Analysis</a>
      </div>
      
      <div id="main" :class="{ 'pushMainContent': isActive }">
        <span style="font-size: 30px; cursor: pointer;" @click="toggleNav">&#9776;</span>
        <span style = "cursor: pointer; font-family: pjs; font-weight: bold; font-size: 20px; margin-left: 9px; margin-top: 9px;" 
           @click="toggleNav">Home</span>
      </div>
    </div>
  </template>
      
  <script>
  export default {
    data() {
      return {
        isActive: false,
      };
    },
    
    methods: {
      toggleNav() {
        this.isActive =!this.isActive;  
        this.$emit('toggle', this.isActive); // Emitting an event named 'toggle'    
      },
    }
  };
  </script>
      
  <style>
  .sidebar-container {
    display: flex;
    height: 100vh;
    position: absolute; /* Places home menu div over entire page div */
  }
  
  .page-router {
    text-align: center; 
    align-content: center; 
    font-family: pjs;
    font-size: 50px;
  }
  
  .sidenav {
    height: 100vh;
    width: 0; /* Sidebar is hidden initially */
    position: fixed; 
    z-index: 2; /* Ensures sidebar is over main content */
    top: 0;
    left: 0;
    background-color: black;
    overflow-x: hidden; /* Prevents content from spilling out of page */
    transition: width 0.3s linear; /* Smooth linear transition for the width */
    padding-top: 0px;
  }
      
  .openNavClass {
    width: 250px; /* Sidebar width when open */
  }
      
  #main {
    flex-grow: 1; /* Takes up the remaining space */
    transition: margin-left 0.3s linear; /* Smooth linear transition for main content */
    padding: 16px;
    width: 100%;
    position: relative; /* Ensures correct positioning */
    overflow-x: hidden; 
    display: flex;    
  }
      
  .pushMainContent {
    margin-left: 250px; /* Pushes main content when sidebar opens */
    transition: 0.3s;
}
      
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none; 
    font-size: 20px;
    color: #9a9a9a;
    display: block;
    transition: color 0.3s linear;
    font-family: pjs;
    margin-top: 20px;
  }
      
  .sidenav a:hover {
    color: #f1f1f1;
    cursor: pointer;
  }
      
  .sidenav .closebtn {
    position: absolute;
    margin-top: 0px;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    cursor: pointer;
  }
      
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
  </style>
      