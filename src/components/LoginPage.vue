<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <h1>Login</h1>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="credentials.email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      console.log(this.credentials);
    },
  },
};
</script>

<style>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
}
</style>
