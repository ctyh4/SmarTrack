<template>
  <div>
    <button id="homebutton" type="button" @click="this.$router.push('/home')">
      Home
      <img id = "icon" src = "./../assets/home_button.png">
    </button>
  </div>
</template>

<style>
#homebutton {
  font-family: pjs;
  font-weight: 650;
  font-size: 17px;
  position: absolute;
  display: flex;
  border: transparent;
  top: 20px;
  right: 15px;
  background-color: #7f56d9;
  color: white;
  padding: 5px 10px;
  align-items: center;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 40px;
}

#icon {
  width: 17px;
  height: 17px;
  margin-top: 23px;
  margin-left: 10px;
}

button:hover {
  background-color: transparent;
  opacity: 0.7;
}
</style>
