<template>
    <EditProfile />
</template>
  
<script>
import EditProfile from "@/components/Edit.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
    name: "Edit",
    components: {
        EditProfile,
    },
    data() {
      return {
        user: false,
      };
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth,(user) => {
        if (user){
          this.user = user;
        }
    })
  },
};
</script>
  