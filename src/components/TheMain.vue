<template>
  <div>
    <h1>Головна</h1>
    <div class="main-wrapper">
      <TheWeatherCard
        v-for="item in currentCard"
        :key="item.id"
        @delete="deleteWeather(item.id)"
        @to-feature="addFeature"
        @remove-feature="deleteFeature"
        :weather-id="item.id"
        :weather-featured="item.featured"
      />
      <TheAddWeatherCard @click="createNewCard" v-if="theCards.length <= 4" />
    </div>
  </div>
</template>

<script setup>
import TheWeatherCard from "./TheWeatherCard.vue";
import TheAddWeatherCard from "./TheAddWeatherCard.vue";
import { ref, inject, toRefs } from "vue";

const props = defineProps(["theCards", "theFeatured"]);
const { theCards: currentCard } = toRefs(props);
const createNewCard = () => {
  const newCard = {
    id: Math.floor(Math.random() * 100),
    featured: false,
    data: null,
  };
  props.theCards.push(newCard);
};
const deleteWeather = inject("delete");
const deleteFeature = inject("removeFeature");
const addFeature = (data, name, id) => {
  const isFeatured = props.theFeatured.filter((e) => e.data.name === name);
  if (isFeatured.length) {
    return;
  } else {
    props.theCards.filter((e) => {
      if (e.id === id) {
        if (props.theFeatured.length < 5) {
          e.featured = true;
          e.data = data;
          props.theFeatured.push(e);
          console.log(props.theFeatured);
        }
      }
    });
  }
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
