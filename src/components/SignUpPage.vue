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
      <h4> Password should contain: Min. 8 characters, min one uppercase letter, min one lowercase letter, min one special character</h4> <br>
      <div class="signup-form">
          <label for="name1">Name:</label>
          <input type="text" id="name1" v-model="credentials.name" required placeholder="Enter your name" /> <br>

          <label for="email1">Email:</label>
          <input type="email" id="email1" v-model="credentials.email" required placeholder="Enter your email" /> <br>

          <label for="password1">Password:</label>
          <input
            type="password"
            id="password1"
            v-model="credentials.password"
            required
            placeholder="Enter your password "
          /> <br>
        
          <label for="secondpassword1">Confirm Password:</label>
          <input
            type="password"
            id="secondpassword1"
            v-model="credentials.secondpassword"
            required
            placeholder="Confirm"
          /> <br>

          <p v-if="!emptyconfirm(credentials.secondpassword) && credentials.password !== credentials.secondpassword" style="color: red;">Passwords do not match</p>
          <p v-if="!emptypassword(credentials.password) && !passwordcheck(credentials.password)" style = "color:red;">Password does not meet requirements</p>


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
    emptypassword(pw){
      if (!pw.trim()) {
        // Password is empty, return true
        return true;
      }
      
    },
    emptyconfirm(pw){
      if (!pw.trim()) {
        // Confirm Password is empty, return true
        return true;
      }
      
    },
    passwordcheck(pw){
       // Check if the password is not empty
      
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    
    // Test the password against the regular expression
      return regex.test(pw);
    },
    savetofs(){
      console.log("saved")
      console.log("IN AC")
        let name = document.getElementById("name1").value;
        let email = document.getElementById("email1").value;
        let password = document.getElementById("password1").value;
       
        alert("Signing up...");

        try{
            const docRef = setDoc(doc(db,"Users", email),{
                Name: name, Email: email, Password: password,
            })
            console.log(docRef)
            document.getElementById('signup-form').reset();
            //this.$emit("added")
        }
        catch(error){
            console.error("Error adding document: ", error);
        }

    },
    
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
