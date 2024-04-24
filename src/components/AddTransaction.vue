<template>
  <button id="ATbutton" type="button" @click="emitOpenModal">
    Add Transaction
  </button>
</template>

<script>
export default {
  name: "AddTransaction",
  methods: {
    emitOpenModal() {
      // Emit an event that the parent can listen to open the modal
      this.$emit("openModal");
    },
  },
};
</script>

<style scoped>
#ATbutton {
  font-family: pjs;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  border: transparent;
  top: 15px;
  right: 150px;
  background-color: #7f56d9;
  color: white;
  padding: 5px 10px;
  text-align: center;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  text-decoration: none;
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
