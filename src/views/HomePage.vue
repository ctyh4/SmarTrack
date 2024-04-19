<template>
 
    <Home />
  <!-- <Logout /> -->

  
</template>
<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc,getDoc } from "firebase/firestore";
import Home from "@/components/Home.vue";
import Logout from "@/components/Logout.vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "App",
  components: {
    Home, 
    /* Logout
    */
  },
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=> {
      if (user){
        this.user = user;
        this.storeFS(user);
      }
    })
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
    async storeFS(user) {
      const docRef = doc(db, "Users", String(user.email));
      console.log(docRef);
      // Fetch the document data
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()) {
        setDoc(doc(db, "Users", String(user.email)), {
        Name: user.displayName,
        Email: user.email,
        UID: user.uid,
        Liked: [],
        Inventory: [],
        CardsWithMinSpend: {},
        CardsWithCBCap: {},
        Transactions: {}
      })
      .then(() => {
        console.log("User data stored in Firestore successfully");
      })
      .catch(error => {
        console.error("Error storing user data in Firestore:", error);
      });
      }
    },
  }
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>
