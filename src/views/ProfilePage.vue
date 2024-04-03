<template>
  <div v-if="user"> 
    <sidebar></sidebar>
  <div class="profilepage">
    <Profile /><br>
    <Logout />
  </div>
  </div>
  
</template>
  
<script>
import Sidebar from '@/components/Sidebar.vue';
import Profile from "@/components/Profile.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import Logout from "@/components/Logout.vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    name: "ProfilePage",
    components: {
        Profile, Logout,
        'sidebar' : Sidebar,
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
  align-items: center;
    align-content: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>
  