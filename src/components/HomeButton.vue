<template>
    <div>
        <button id="homebutton" type="button" @click="this.$router.push('/home')">Home</button>
    </div>
    
</template>

<style>
#homebutton {
    font-family: pjs;
    position: absolute;
    border: transparent;
    top: 15px;
    right: 20px;
    background-color: #7F56D9;
    color: white;
    padding: 5px 10px;
    text-align: center;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 10px;
}

button:hover {
    background-color: transparent;
    opacity: 0.7;
}
</style>