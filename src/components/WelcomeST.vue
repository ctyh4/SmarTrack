<template>
  <h1>Welcome to SmarTrack</h1>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '@/firebase.js';

export default {
  name: "WelcomeST",
  data() {
    return {
      user:false,
    }
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
h1 {
  background-color: rgb(120, 184, 99);
  text-align: center;
  width: 100%;
}
</style>
