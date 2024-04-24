<template>
  <div>
    <button id="homebutton" type="button" @click="this.$router.push('/home')">
      
      Home
      <img id = "icon" src = "./../assets/home_button.png">
    </button>
  </div>
</template>

<style scoped>
#homebutton {
  font-family: pjs;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  border: transparent;
  top: 15px;
  right: 20px;
  background-color: #7f56d9;
  color: white;
  padding: 5px 10px;
  text-align: center;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  text-decoration: none;
}

#icon {
  width: 17px;
  height: 17px;
  margin-right: 1px;
  margin-top: 23px;
  margin-left: 7px;
}

button:hover {
  background-color: transparent;
  opacity: 0.7;
}
</style>
