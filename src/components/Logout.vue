<template>

<button id = "btn" @click="signOut()" v-if="user"> Logout </button>

</template> 


<script>
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

export default {
  name: "Logout",
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
  methods: {
    signOut(){
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth,user)
      this.$router.push({name:'Login'})
    }
  }
}
</script>


<style scoped>
#btn{
  font-family: pjs;
  text-align: center;
  margin: auto;
  padding: 5px 10px;
}
</style>

