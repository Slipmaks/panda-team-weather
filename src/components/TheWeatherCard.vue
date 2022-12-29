<template>
  <div class="main default">
    <div class="default">
      <input
        v-model="cityName"
        v-debounce:1000ms.cancelonempty="getCities"
        type="text"
        options="options"
      />
      <button>В избранное</button>
    </div>

    <div class="default">
      <div>
        <button>День</button>
        <button>Неделя</button>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          culpa voluptate repellat. Provident nostrum sed a velit dicta tempora
          dolore, aspernatur fugit iste, ratione repellat assumenda magnam ullam
          repudiandae porro.
        </p>
      </div>
    </div>

    <div class="default">
      <p>График</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { geoOptionsApi, GEO_URL_API } from "../api";
const API_WEATHER = "63681b42bf0cf1ef874d7bbd33c652a5";
const cityName = ref("");

const getCities = () => {
  fetch(
    `${GEO_URL_API}/cities?minPopulation=500000&namePrefix=${cityName.value}&sort=-population`,
    geoOptionsApi
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
</script>

<style scoped>
.main {
  background-color: hsl(0, 0%, 99%);
}
.default {
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
}
.weather {
}
.day {
}
.week {
}
.chart {
}
</style>
