<template>
  <div v-if="user">
    <button id="homebutton" type="button" @click="this.$router.push('/home')">
      Home
      <img id="icon" src="./../assets/home_button.png" />
    </button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style scoped>
#homebutton {
  font-family: pjs;
  font-size: 16px;
  font-weight: 650;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  display: flex;
  border: transparent;
  top: 28px;
  right: 15px;
  background-color: #7f56d9;
  color: white;
  padding: 5px 10px;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 40px;
}

#icon {
  width: 17px;
  height: 17px;
  margin-right: 1px;
  margin-left: 7px;
}

button:hover {
  background-color: transparent;
  opacity: 0.7;
}
</style>
