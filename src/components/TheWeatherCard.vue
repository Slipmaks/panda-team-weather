<template>
  <div class="main default">
    <div class="default search-featured">
      <div class="search">
        <input
          v-model="cityName"
          v-debounce:1000ms.cancelonempty="getCities"
          type="text"
          options="options"
        />
        <ul class="search-results">
          <li>res</li>
          <li>res</li>
        </ul>
      </div>
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
  max-width: 320px;
}
.default {
  border: 1px solid hsl(0, 0%, 92%);
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
}
.search-featured {
  display: flex;
  justify-content: space-between;
}
.search {
  display: inline-block;
  position: relative;
}
.search input {
  outline: none;
  border: 1px solid hsl(0, 0%, 92%);
}
.search input[type="text" i] {
  padding: 4px 8px;
}
.search-results {
  position: absolute;
  z-index: 10;

  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}
.search-results li {
  padding: 0.25rem 0.5rem;
  border: 1px solid hsl(0, 0%, 92%);
  background-color: hsl(0, 0%, 98%);
  transition: all 0.3s ease-in-out;
}
.search-results li:hover {
  background-color: hsl(0, 0%, 92%);
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
