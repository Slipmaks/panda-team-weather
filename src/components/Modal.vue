<template>
  <Teleport to="body">
    <div
      v-if="store.modalMessage.length"
      @keydown.esc="store.modalMessage = ''"
    >
      <div class="modal">
        <button @click="store.modalMessage = ''"><strong>x</strong></button>
        <p>{{ store.modalMessage }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defaultStore } from "../store";
const store = defaultStore();
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  padding: 30px;
  background-color: hsl(0, 0%, 99%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px #00000026;
}
.modal p {
  align-self: center;
  text-align: center;
}
.modal button {
  margin: 0;
  align-self: end;
}
</style>
