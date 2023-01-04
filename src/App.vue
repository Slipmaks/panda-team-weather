<template>
  <div class="container">
    <TheLogo></TheLogo>
    <div>
      <button @click="isShowMain = true">Головна</button>
      <button @click="isShowMain = false">Обране</button>
    </div>
    <div>
      <TheMain v-if="isShowMain" />
      <TheFeatured v-else />
    </div>
  </div>
</template>
<script setup>
import { defaultStore } from "./store";
import TheLogo from "./components/TheLogo.vue";
import TheMain from "./components/TheMain.vue";
import TheFeatured from "./components/TheFeatured.vue";
import { ref, watchEffect, onMounted } from "vue";
const store = defaultStore();

const isShowMain = ref(true);
if (localStorage.getItem("featured") === null) {
  console.log("empty");
} else {
  const storageFeatured = JSON.parse(localStorage.getItem("featured"));
  if (storageFeatured.length) {
    store.theFeaturedCards = storageFeatured;
  } else {
  }
  // theFeatured.value = JSON.parse(localStorage.getItem("featured"));
  // if (theFeatured.value.length) {
  //   console.log(theFeatured.value);
  // }
}

onMounted(() => {
  store.getCurrentLocationWeather();
  watchEffect(() => {
    localStorage.setItem("featured", JSON.stringify(store.featured));
  });
});

// pinia
</script>
<style>
.container {
  max-width: 1200px;
  margin: 20px auto;
}
button {
  border: 1px solid #ebebeb;
  background-color: hsl(0, 0%, 92%);
  padding: 0.275rem;
  margin: auto 0.15rem;
  transition: all 0.3s;
  color: hsl(0, 0%, 0%);
}
button:hover {
  cursor: pointer;
  background-color: hsl(0, 0%, 99%);
  color: hsl(0, 0%, 0%);
}
</style>
