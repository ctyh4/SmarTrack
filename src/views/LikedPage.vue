<template>
    <LikedCards />
  </template>
  <script>
  import firebaseApp from "../firebase.js";
  import { getFirestore } from "firebase/firestore";
  import LikedCards from "../components/LikedCards.vue";
//   import Logout from "@/components/Logout.vue";
  import {getAuth, onAuthStateChanged } from "firebase/auth";
  const db = getFirestore(firebaseApp);
  
  export default {
    name: "App",
    components: {
      LikedCards, 
      /* Logout
      */
    },
    data() {
      return {
        refreshComp: 0,
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
  };
  </script>

  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }
  
  #bg {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }
  </style>
  