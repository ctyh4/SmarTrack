<template>
  <div class = "login-container">
    <img id="bg" src="@/assets/SmarTrack.png" alt="" class="center"> 
    <div id="pagecontent">
      Make the best of your financial tools
      <br />
      Sign in to get started!
    </div> 
    <div id="firebaseui-auth-container"></div>

    <!-- Form to collect email for sign-up -->
    <form  @submit.prevent="signUp">
      <input class="input-1" type="email" v-model="email" placeholder="Enter your email">
      <button class="button-6" role="button" id type="submit">Sign Up</button>
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

    // Check if the user has clicked the sign-up link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }

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
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
      try {
        await sendSignInLinkToEmail(auth, this.email, actionCodeSettings)
        .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', this.email);
        })
      } catch (error) {
        console.error("Error sending sign-in link:", error);
        alert("Failed to send sign-in link. Please try again later.");
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
  margin-bottom: 50px;  
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
