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

<style>
#ATbutton {
  font-family: pjs;
  position: absolute;
  border: transparent;
  top: 15px;
  right: 100px;
  background-color: #7f56d9;
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
