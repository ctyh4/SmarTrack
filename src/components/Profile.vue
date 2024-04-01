<template>
    <div class="profile-container" v-if="user">
        <div>
            <button id="homebutton" type="button" @click="$router.push('/home')">Home</button>

            <h1> Your Profile </h1>


            <div id="nameCell">
                <h3>Name:</h3>
                <p id="name"> {{ name }}</p>
            </div>
            <hr>


            <div id="emailCell">
                <h3>Email:</h3>
                <p id="email"> {{ email }}</p>
            </div>
            <hr>

            <div id="useridCell">
                <h3>User ID:</h3>
                <p id="email"> {{ uid }}</p>
            </div>
            <hr>

            <button id="editbutton" type="button" @click="editProfile()">Edit</button>
        </div>
        <Logout/>
    </div>
</template>


<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, collection, getDocs} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import Logout from '@/components/Logout.vue'
const db = getFirestore(firebaseApp);


export default {
    name: "Profile",
    data() { 
        return { 
            user: null, 
            name: "",
            email: "",
            uid: ""
        };
    },
    methods: {
        editProfile() {
            this.$router.push("/edit");
        },
        async fetchData(userEmail) {
            const q = query(collection(db, "users"), where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                const userData = doc.data();
                this.name = userData.displayName;
                this.email = userData.email;
                this.uid = userData.uid;
            });
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged (auth, user => {  
            if (user) {
                this.user = user;
                this.fetchData(this.user.email);
            }
        })
    },
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
