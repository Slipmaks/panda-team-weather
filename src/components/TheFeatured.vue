<template>
  <div v-if="store.theFeaturedCards.length">
    <TheWeatherFeaturedCard
      v-for="item in store.theFeaturedCards"
      :key="item.id"
      :weather-data="item.data"
      :weather-id="item.id"
      :weather-feature="item.featured"
      :daily-chart="item.dailyChart"
      :weekly-chart="item.weeklyChart"
    />
  </div>
</template>

<script setup>
import TheWeatherFeaturedCard from "./TheWeatherFeaturedCard.vue";
import { defaultStore } from "../store";
const store = defaultStore();
</script>

<style scoped></style>
