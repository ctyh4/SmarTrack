<template>
  <WelcomeST />
</template>
<script>
import WelcomeST from "@/components/WelcomeST.vue";
import Login from "@/components/LoginPage.vue";

export default {
  name: "App",
  components: {
    WelcomeST,
  },
  data() {
    return {
      refreshComp: 0,
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
  },
};
</script>
<style>
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
