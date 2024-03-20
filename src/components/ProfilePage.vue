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
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    mounted() {
        async function display() {
            let data = await db.collection("Users").doc("Email").data() // "Email" has to be linkd to user idk

            let name = (data.Name)
            let mobile = (data.Mobile)
            let birthdate = (data.birthdate)

            let nameCell = document.getElementById("nameCell")
            let mobileCell = document.getElementById("mobileCell")
            let birthdateCell = document.getElementById("birthdateCell")

            nameCell.innerHTML = name
            mobileCell.innerHTML = mobile
            birthdateCell.innerHTML = birthdate

        }
    }
}
</script>

<style>
.profile-container {
    text-align: center;
}
</style>