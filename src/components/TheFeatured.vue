<template>
  <div v-if="theFeatured.length">
    <TheWeatherFeaturedCard
      v-for="item in theFeatured"
      :key="item.id"
      :feature-data="item.data"
    />
  </div>
</template>

<script setup>
import TheWeatherFeaturedCard from "./TheWeatherFeaturedCard.vue";
const props = defineProps(["theFeatured"]);
</script>

<style scoped></style>
