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
  <div class="signup-container">
    <form @submit.prevent="onsignup">
      <h2>Sign up for an account</h2>
      <div class="signup-form">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="credentials.name" required placeholder="Enter your name" /> <br>

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="credentials.email" required placeholder="Enter your email" /> <br>

          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
            placeholder="Enter your password"
          /> <br>
        
          <label for="secondpassword">Confirm Password:</label>
          <input
            type="password"
            id="secondpassword"
            v-model="credentials.secondpassword"
            required
            placeholder="Retype Password"
          /> <br><br>

        <div class ="signup">
        <button id = "signupbutton" button type="submit" v-on:click="savetofs">Sign Up</button>
        </div>
        
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "signup",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
        secondpassword: "",
        name:"",
      },
    };
  },
  methods: {
    onsignup() {
      console.log(this.credentials);
    },
    async savetofs(){
      console.log("saved")
    }
  },
};
</script>

<style>
.signup-form{  
  display: inline-block;
    text-align: right;
}

form{
    text-align: center;
    align-items: center;
    margin: auto;
}

input:hover{
    box-shadow: 3px 3px purple;
    border-radius: 2px
}

.signup{
    text-align: center;
}
</style>
