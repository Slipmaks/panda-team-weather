<template>
  <div>
    <h1>Главная</h1>
    <div class="main-wrapper">
      <TheWeatherCard v-for="item in theCards" :key="item.id" />
      <TheEmptyWeatherCard @click="createNewCard" v-if="theCards.length <= 4" />
    </div>
  </div>
</template>

<script setup>
import TheWeatherCard from "./TheWeatherCard.vue";
import TheEmptyWeatherCard from "./TheEmptyWeatherCard.vue";
import { ref, computed } from "vue";

const theCards = ref([{ id: Math.floor(Math.random() * 100) }]);

const createNewCard = () => {
  const newCard = {
    id: Math.floor(Math.random() * 100),
  };
  theCards.value.push(newCard);
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
