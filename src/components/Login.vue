<template>
 <div style="text-align:center">
 <h1 id="mainHead">SmarTrack</h1>
 <div id="firebaseui-auth-container"></div>
 <div id="pagecontent">
      SmarTrack is an app to track and give recommendations for your various payments based on your financial tools.
      <br />

      Sign in to get started!
    </div>
 </div>
</template>

<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";


export default {
  name:"Login",
  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    if(!ui){
      ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  var uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
      // Other config options...
    };

    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>

<style scoped>
#firebaseui-auth-container{
  margin-top: 50px;
  margin-bottom: 50px;
}
#pagecontent {
  height: 100px;
  font-size: larger;
  font-weight: bolder;
  text-align: center;
}
#mainHead {
  text-align: center;
  /* font-size: 50px; */
  /* height: 100px; */
  text-shadow: 2px 2px grey;
}
#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>
