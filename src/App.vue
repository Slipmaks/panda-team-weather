<template>
  <div class="container">
    <TheLogo></TheLogo>
    <div>
      <button @click="isShowMain = true">Главная</button>
      <button @click="isShowMain = false">Избранное</button>
    </div>
    <div>
      <TheMain
        v-if="isShowMain"
        :the-cards="theCards"
        :the-featured="theFeatured"
      />
      <TheFeatured v-else :the-featured="theFeatured" />
    </div>
  </div>
</template>
<script setup>
import { defaultStore } from "./store";
import TheLogo from "./components/TheLogo.vue";
import TheMain from "./components/TheMain.vue";
import TheFeatured from "./components/TheFeatured.vue";
import { ref, watch, provide, watchEffect, onMounted } from "vue";
import { OPEN_WEATHER_URL_API, openWeatherApiKey } from "./api";

const isShowMain = ref(true);
const theCards = ref([]);
const theFeatured = ref([]);
if (localStorage.getItem("featured") === null) {
  console.log("empty");
} else {
  theFeatured.value = JSON.parse(localStorage.getItem("featured"));
  if (theFeatured.value.length) {
    console.log(theFeatured.value);
  }
}

onMounted(() => {
  store.getCurrentLocationWeather();
  watchEffect(() => {
    localStorage.setItem("featured", JSON.stringify(theFeatured.value));
  });
});

const deleteCard = (id) => {
  theCards.value = theCards.value.filter((e) => e.id !== id);
};
const deleteFeature = (name) => {
  theFeatured.value = theFeatured.value.filter((e) => {
    if (e.data.name === name) {
      e.featured = false;
    } else {
      return e;
    }
  });
};
provide("theFeatured", theFeatured.value);
provide("delete", deleteCard);
provide("removeFeature", deleteFeature);

// pinia
const store = defaultStore();
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 20px auto;
}
</style>
