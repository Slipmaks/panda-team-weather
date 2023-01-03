<template>
  <div>
    <h1>Головна</h1>
    <div class="main-wrapper">
      <!-- <TheWeatherCard
        v-for="item in props.theCards"
        :key="item.id"
        @delete="deleteWeather(item.id)"
        @to-feature="addFeature"
        @remove-feature="deleteFeature"
        :weather-id="item.id"
        :weather-featured="item.featured"
      /> -->
      <WeatherCard
        v-for="item in store.cards"
        :key="item.id"
        :weather-data="item.data"
        :weather-id="item.id"
        :weather-feature="item.featured"
        :daily-chart="item.dailyChart"
        :weekly-chart="item.weeklyChart"
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
import TheWeatherCard from "./TheWeatherCard.vue";
import TheAddWeatherCard from "./TheAddWeatherCard.vue";
import { ref, inject, toRefs } from "vue";
import { defaultStore } from "../store";
const store = defaultStore();
// const props = defineProps(["theCards", "theFeatured"]);

// const createNewCard = () => {
//   const newCard = {
//     id: Math.floor(Math.random() * 100),
//     featured: false,
//     data: null,
//   };
//   props.theCards.push(newCard);
// };
// const deleteWeather = inject("delete");
// const deleteFeature = inject("removeFeature");
// const addFeature = (data, name, id) => {
//   const isFeatured = props.theFeatured.filter((e) => e.data.name === name);
//   if (isFeatured.length) {
//     return;
//   } else {
//     props.theCards.filter((e) => {
//       if (e.id === id) {
//         if (props.theFeatured.length < 5) {
//           e.featured = true;
//           e.data = data;
//           props.theFeatured.push(e);
//           console.log(props.theFeatured);
//         }
//       }
//     });
//   }
// };
</script>

<style scoped>
.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
