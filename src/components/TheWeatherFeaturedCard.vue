<template>
  <div>{{ data }}</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const data = ref();
onMounted(() => {
  data.value = JSON.parse(localStorage.getItem("featured"));
});
</script>

<style scoped></style>
