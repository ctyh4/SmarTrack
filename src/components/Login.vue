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
 <div style="text-align:center">
 <h1 id="mainHead">SmarTrack</h1>
 <div id="firebaseui-auth-container"></div>
 </div>
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name:"LoginPage",
  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    if(!ui){
    ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  var uiConfig = {
    signInSuccessUrl: '/home',
    signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ]
  };
  ui.start("#firebaseui-auth-container", uiConfig)
  }
}

</script>

<style scoped>
#firebaseui-auth-container{
  margin-top: 50px;;
  margin-bottom: 50px;;
}
</style>
