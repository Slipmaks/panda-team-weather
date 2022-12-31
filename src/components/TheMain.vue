<template>
  <div>
    <h1>Головна</h1>
    <div class="main-wrapper">
      <TheWeatherCard
        v-for="item in theCards"
        :key="item.id"
        @delete="deleteCard(item.id)"
        @to-feature="feature"
      />
      <TheEmptyWeatherCard @click="createNewCard" v-if="theCards.length <= 4" />
    </div>
  </div>
</template>

<script setup>
import TheWeatherCard from "./TheWeatherCard.vue";
import TheEmptyWeatherCard from "./TheEmptyWeatherCard.vue";
import { ref } from "vue";

const theCards = ref([
  { id: Math.floor(Math.random() * 100), featured: false, city: "" },
]);

const createNewCard = () => {
  const newCard = {
    id: Math.floor(Math.random() * 100),
    featured: false,
    city: "",
    temp: "",
    feels_like: "",
  };
  theCards.value.push(newCard);
};
const deleteCard = (id) => {
  theCards.value = theCards.value.filter((e) => e.id !== id);
};
const feature = (o, id) => {
  console.log(o);
  console.log(id);
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
