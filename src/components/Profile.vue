<template>
    <div v-if="user">
    <div class="profile-container" v-if="user">
        <div>
            
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
    </div>
</template>


<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore, getDoc, doc} from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
    name: "Profile",
    data() { 
        return { 
            user: false, 
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

<style scoped>
.profile-container {
    font-family: pjs;
    text-align: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
}

#editbutton {
    font-family: pjs;
    padding: 5px;
}

#nameCell, #useridCell, #emailCell {
    margin-bottom: 5px;
}

</style>
