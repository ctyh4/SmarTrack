<template>
    <div class="profile-container">
        <h1> Your Profile </h1>

        <div id="nameCell">
            <h3>Name</h3>
            <p id="name"></p>
        </div>
        <hr>

        <div id="mobileCell">
            <h3>Mobile</h3>
            <p id="mobile"></p>
        </div>
        <hr>

        <div id="emailCell">
            <h3>Email</h3>
            <p id="email"></p>
        </div>
        <hr>

        <div id="birthdateCell">
            <h3>Birth date</h3>
            <p id="birthdate"></p>
        </div>
        <hr>
        <button id="editbutton" type="button" @click="editProfile()">Edit</button>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    name: "Profile",
    mounted() {
        async function display() {
            const user = auth.currentUser;
            if (user) {
                // Get the user's email address
                const email = user.email;

                // Retrieve the user's data from the Firestore database
                let data = await db.collection("Users").doc(email).get();

                // Extract the user's name, mobile number, and birthdate from the retrieved data
                let name = data.data().Name;
                let mobile = data.data().Mobile;
                let birthdate = data.data().birthdate;

                // Update the HTML elements with the user's information
                let nameCell = document.getElementById("nameCell");
                let mobileCell = document.getElementById("mobileCell");
                let birthdateCell = document.getElementById("birthdateCell");
                nameCell.innerHTML = name;
                mobileCell.innerHTML = mobile;
                birthdateCell.innerHTML = birthdate;
            } else {
                console.log("No user is signed in.");
            }
        }
    },

    methods: {
        editProfile() {
            router.push("/edit")
        }
    }
}
</script>

<style>
.profile-container {
    text-align: center;
}
</style>