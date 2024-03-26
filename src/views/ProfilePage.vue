<template>
    <Profile />
    <h3> profile page</h3>
</template>
  
<script>
import Profile from "@/components/Profile.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
    name: "Profile",
    components: {
        Profile,
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

  