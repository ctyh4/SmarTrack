<template v-if="user">
    <Sidebar/>
    <HomeButton/>
    <PaymentForm/>
    <div class="paymentrecopage">
      <br>
      <Logout />
    </div>
  </template>
    
  <script>
  import HomeButton from '@/components/HomeButton.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import PaymentForm from "@/components/PaymentForm.vue";
  import firebaseApp from "../firebase.js";
  import { getFirestore } from "firebase/firestore";
  import Logout from "@/components/Logout.vue";
  import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
  
  const db = getFirestore(firebaseApp);
  
  export default {
      name: "PaymentPage",
      components: {
          PaymentForm, 
          Logout,
          HomeButton,
          Sidebar,
      },
      data() {
        return {
          user: false,
        };
      },
      mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth,(user)=> {
          if (user){
            this.user = user;
        }
      });
    },
    
  };
  </script>
  
  <style>
  .profilepage {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }
  </style>
    