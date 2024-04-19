<template>
  <div v-if="user">
    <div class="sidebar-container">
      <div id="mySidenav" class="sidenav" :class="{ 'openNavClass': isActive }">
        <a class="closebtn" @click="toggleNav">&times;</a>
    
        <!-- <a class = "page-router" style = "margin-top: 45px;" @click="$router.push('/Home')">Home</a> -->
        <a class = "page-router" style = "margin-top: 45px;" @click="$router.push('/Profile')">Profile</a>
        <a class = "page-router" @click="$router.push('/Cards')">Cards</a>
        <a class = "page-router" @click="$router.push('/Discovery')">Discovery</a>
        <a class = "page-router" @click="$router.push('/Payment')">Payment Recommendation</a>
        <a class = "page-router" @click="$router.push('/transactions')">Tracking & Analysis</a>
      </div>
      
      <div id="main" :class="{ 'pushMainContent': isActive }">
        <span style="font-size: 30px; cursor: pointer;" @click="toggleNav">&#9776;</span>
        <span style = "cursor: pointer; font-family: pjs; font-weight: bold; font-size: 20px; margin-left: 9px; margin-top: 9px;" 
           @click="toggleNav">Home</span>
      </div>
    </div>
  </div>
  </template>
      
  <script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  
  export default {
    data() {
      return {
        isActive: false,
        user:false,
      };
    },

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth,(user)=> {
        if (user){
          this.user = user;
        }
      })
    },
    methods: {
      toggleNav() {
        this.isActive =!this.isActive;
      }
    }
  };
  </script>
      
  <style>
  .sidebar-container {
    display: flex;
    height: 100vh;
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
    position: fixed; /* Changed from fixed to relative */
    z-index: 2; /* Ensures sidebar is over main content */
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden; /* Prevents content from spilling out */
    transition: width 0.5s; /* Smooth transition for the width */
    padding-top: 0px;
  }
      
  .openNavClass {
    width: 250px; /* Sidebar width when open */
  }
      
  #main {
    flex-grow: 1; /* Takes up the remaining space */
    transition: margin-left .5s; /* Smooth transition for the main content */
    padding: 16px;
    width: 100%;
    /* z-index: 1; /* Lower z-index than sidebar */
    position: relative; /* Ensures correct positioning */
    overflow-x: hidden; /* Prevents content from spilling out */
    left: 0;
    display: flex;
  }
      
  .pushMainContent {
    margin-left: 250px; /* Pushes the main content when sidebar opens */
  }
      
  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none; 
    font-size: 20px;
    color: #818181;
    display: block;
    transition: color 0.3s;
    font-family: pjs;
    margin-top: 20px;
  }
      
  .sidenav a:hover {
    color: #f1f1f1;
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
      