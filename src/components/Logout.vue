/* 
If an existing email is used, a warning is shown beneath the email input and sign up is prevented
If  the password does not meet security requirements, a warning is shown beneath the password and sign up is prevented
Once sign up is successful, an email is sent to the user provided email with a verification code. 
Users will be prompted with the verification code when they first login.
If they provide the wrong verification code, a warning will show that it is wrong
If they provide the correct verification code, they will be directed to the home page
The verification code will only be required the first time the user logs in. Subsequent logins will not require the verification
*/

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
      const user = auth.updateCurrentUser;
      signOut(auth,user)
      this.$router.push({name:'Login'})
    }
  }
}
</script>


<style>
#btn{
  text-align: center;
  margin: auto;
}
</style>

