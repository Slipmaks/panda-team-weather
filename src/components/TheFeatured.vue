<template>
  <div>
    <h1>Обране</h1>

    <div v-if="store.theFeaturedCards.length" class="main-wrapper">
      <TheWeatherFeaturedCard
        v-for="item in store.theFeaturedCards"
        :key="item.id"
        :weather-data="item.data"
        :weather-id="item.id"
        :weather-feature="item.featured"
        :chart-data="item.chart"
      />
    </div>
    <div v-else><p>Додайте до обраного</p></div>
  </div>
</template>

<script setup>
import TheWeatherFeaturedCard from "./TheWeatherFeaturedCard.vue";
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
