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

            <button id="editbutton" type="button" @click="$router.push('/edit')">Edit</button>
        </div>
        
    </div>
</template>


<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, collection, getDocs, getDoc, query, where, doc} from "firebase/firestore";
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
        async fetchData(user) {
            try {
                const userEmail = String(user.email);
                console.log(userEmail);

                // Directly reference the document using its ID (user's email)
                const docRef = doc(db, "Users", userEmail);
                console.log(docRef);
                // Fetch the document data
                const docSnap = await getDoc(docRef);

                // Check if the document exists
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const name = userData.Name;
                    const uid = userData.UID;
                    const email = userData.Email;
                    console.log(userData); // Output for debugging
                    // Update component data properties here if needed
                    this.name = name;
                    this.uid = uid;
                    this.email = email;
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            }

    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged (auth, user => {  
            if (user) {
                this.user = user;
                this.fetchData(user);
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
    font-family: pjs;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #7F56D9;
    color: white;
    padding: 5px 10px;
    text-align: center;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 10px;
}
</style>
