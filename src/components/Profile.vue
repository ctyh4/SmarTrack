<template>
    <div class="profile-container" v-if="user">
        <div> 
            <h1> Your Profile </h1>

            <div id="nameCell">
                <h3>Name:</h3>
                <p id="name"> {{ user.displayName }}</p>
            </div>
            <hr>

            <div id="emailCell">
                <h3>Email:</h3>
                <p id="email"> {{ user.email }}</p>
            </div>
            <hr>

            <button id="editbutton" type="button" @click="editProfile()">Edit</button>
        </div>
        <Logout/>
    </div>
</template>

<script>
import firebaseApp from '@/firebase.js';
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logout from '@/components/Logout.vue'


export default {
    mounted() {
        const auth = getAuth();
        onAuthStateChanged (auth, user => {  
            if (user) { 
                this.user = user;
            }
        })
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