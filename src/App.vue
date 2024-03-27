<template>
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
  color: #2c3e50;
  background-color: white;
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
