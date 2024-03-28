<template>
    <div class="profile-container" v-if="user">
        <div>
            <button id="homebutton" type="button" @click="$router.push('/home')">Home</button>

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

            <div id="useridCell">
                <h3>User ID:</h3>
                <p id="email"> {{ user.uid }}</p>
            </div>
            <hr>

            <button id="editbutton" type="button" @click="editProfile()">Edit</button>
        </div>
        <Logout/>
    </div>
</template>


<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logout from '@/components/Logout.vue'


export default {
    name: "Profile",
    data() { 
        return { 
            user: null, 
        }; 
    },
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
            this.$router.push("/edit")
        }
    }
}
</script>


<style>
.profile-container {
    font-family: pjs;
    text-align: center;
}

#nameCell, #useridCell, #emailCell {
    margin-bottom: 5px;
}

#homebutton {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #7F56D9;
    color: white;
    padding: 5px 10px;
    text-align: center;
    margin: 4px 2px;
    cursor: pointer;
}
</style>
