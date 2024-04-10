<template>
    <div>
        <button id="backButton" type="button" @click="this.$router.go(-1)">
            <img id = "icon" src = "./../assets/back_icon.png" style="width: 20px; height: 20px;">Back</button>
    </div>
</template>

<style>
#backButton {
  background: none;
  border: transparent;
  padding: 0;
  height: 20px;
  width: 20px;
  font-size: 16px;
  font-family: pjs;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 30px;
}

button:hover {
    background-color: transparent;
    opacity: 0.7;
}
</style>