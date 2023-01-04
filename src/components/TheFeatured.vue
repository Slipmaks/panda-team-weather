<template>
  <div v-if="store.theFeaturedCards.length">
    <TheWeatherFeaturedCard
      v-for="item in store.theFeaturedCards"
      :key="item.id"
      :weather-data="item.data"
      :weather-id="item.id"
      :weather-feature="item.featured"
      :chart-data="item.chart"
    />
  </div>
</template>

<script setup>
import TheWeatherFeaturedCard from "./TheWeatherFeaturedCard.vue";
import { defaultStore } from "../store";
import { watchEffect, ref, computed } from "vue";
const store = defaultStore();
</script>

<style scoped></style>
