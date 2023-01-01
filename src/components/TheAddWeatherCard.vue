<template>
  <div class="main-empty">
    <h1>+</h1>
  </div>
</template>

<script setup></script>

<style scoped>
.main-empty {
  background-color: hsl(0, 0%, 99%);
  width: 6rem;
  height: 6rem;
  border: 1px solid hsl(0, 0%, 90%);
  margin: 0.5rem;
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.main-empty h1 {
  font-size: 6rem;
  color: hsl(0, 0%, 75%);
  cursor: default;
  transition: all 0.3s;
}
.main-empty:hover {
  background-color: hsl(0, 0%, 90%);
}
.main-empty:hover h1 {
  color: hsl(0, 0%, 99%);
}
</style>
