<template>
  <div class="container">
    <TheLogo></TheLogo>
    <div>
      <button @click="isShowMain = true">Главная</button>
      <button @click="isShowMain = false">Избранное</button>
    </div>
    <div>
      <TheMain v-if="isShowMain" />
      <TheFeatured v-else />
    </div>
  </div>
</template>
<script setup>
import TheLogo from "./components/TheLogo.vue";
import TheMain from "./components/TheMain.vue";
import TheFeatured from "./components/TheFeatured.vue";
import { ref } from "vue";

const isShowMain = ref(true);
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 20px auto;
}
</style>
