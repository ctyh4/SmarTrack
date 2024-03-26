<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Login">Login</router-link> |
      <router-link to="/SignUp">SignUp</router-link> 
    </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: block;
  color: #7F56D9;
  background-color: white;
  margin: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-size: medium;
  font-weight: bold;
  color: black;
  padding: 20px;
}

#nav a.router-link-exact-active {
  color: #7F56D9;
}

@font-face {
  font-family: pjs;
  src: url('./../src/assets/PlusJakartaSans-VariableFont_wght.ttf');
}
</style>
