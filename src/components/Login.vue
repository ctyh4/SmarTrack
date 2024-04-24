<template>
  <div class = "login-container">
    <img id="bg" src="@/assets/SmarTrack.png" alt="" class="center"> 
    <div id="pagecontent">
      Make the best of your financial tools
      <br />
      Sign in to get started!
    </div> 
    <div id="firebaseui-auth-container"></div>
    <h2> Sign in via your email address </h2>
    <form  @submit.prevent="signUp">
      <input class="input-1" type="email" v-model="email" placeholder="Enter your email">
      <button class="button-6" type="submit">Sign In</button>
    </form>


  </div>
</template>
 
<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink,sendSignInLinkToEmail } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "" // Store user's email for sign-up
    };
  },
  mounted() {
    const auth = getAuth();
    
    // Initialize FirebaseUI
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    // Configure FirebaseUI authentication options
    var uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        
      ],
      // Other config options...
    };

    // Start FirebaseUI
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  methods: {
    async signUp() {
      const auth = getAuth();
      const actionCodeSettings = {
        url: window.location.origin,
        handleCodeInApp: true,
      };
      console.log(actionCodeSettings)
      
     
      await sendSignInLinkToEmail(auth, this.email, actionCodeSettings)
      window.alert("Check your email for sign in link.")
      this.email = ''
        if(isSignInWithEmailLink(auth, window.location.href)) {
          await signInWithEmailLink(auth, this.email, window.location.href)   
      }
  }
}
};
</script>

<style scoped>
.login-container {
  display: flex;
  margin: auto;
  flex-direction: column;
}

#firebaseui-auth-container {
  margin-top: 50px;  
}

#pagecontent {
  font-size: larger;
  font-weight: bolder;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size:xx-large
}

#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

.input-1 {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-6 {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.button-6:hover,
.button-6:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
  transform: translateY(-1px);
}

.button-6:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}


                
</style>
