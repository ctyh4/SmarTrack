<template>
    <Profile />
    <Logout />
</template>
  
<script>
import Profile from "@/components/Profile.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import Logout from "@/components/Logout.vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    name: "Profile",
    components: {
        Profile, Logout
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
    })
  },
};
</script>

  