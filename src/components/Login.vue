<template>
  <div class = "login-container">
    <img id="bg" src="@/assets/SmarTrack.png" alt="" class="center"> 
    <div id="pagecontent">
      Make the best of your financial tools
      <br />
      Sign in to get started!
    </div> 
    <div id="firebaseui-auth-container"></div>
  </div>
</template>
 
<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";


export default {
  name: "Login",
  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    var uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        },
      ],
      // Other config options...
    };

    ui.start("#firebaseui-auth-container", uiConfig);
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
}

#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
</style>
