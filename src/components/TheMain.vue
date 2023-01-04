<template>
  <div>
    <h1>Головна</h1>
    <div class="main-wrapper">
      <WeatherCard
        v-for="item in store.cards"
        :key="item.id"
        :weather-data="item.data"
        :weather-id="item.id"
        :weather-feature="item.featured"
        :chart-data="item.chart"
      />
      <TheAddWeatherCard
        @click="store.newWeatherCard"
        v-if="store.theCards.length < 5"
      />
    </div>
  </div>
</template>

<script setup>
import WeatherCard from "./WeatherCard.vue";

import TheAddWeatherCard from "./TheAddWeatherCard.vue";
import { defaultStore } from "../store";
const store = defaultStore();
</script>

<style scoped>
.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
