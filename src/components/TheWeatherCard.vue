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
        <ul class="search-results" v-if="searchResults && showSearchResults">
          <li
            v-for="item in searchResults"
            :key="item.id"
            @click="getCityWeather(item.latitude, item.longitude)"
          >
            {{ item.city }}, {{ item.countryCode }}
          </li>
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
        <div v-if="!weather">Empty</div>
        <div v-else>
          <h2>{{ weather.name }}</h2>

          <img :src="weatherStatusImg" v-if="weatherStatusImg" />
        </div>
      </div>
    </div>

    <div class="default">
      <p>График</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  geoOptionsApi,
  GEO_URL_API,
  openWeatherApiKey,
  OPEN_WEATHER_URL_API,
} from "../api";

const cityName = ref("");
const searchResults = ref();
const showSearchResults = ref(false);
const weather = ref();
const weatherStatusImg = ref();
const getCities = () => {
  fetch(
    `${GEO_URL_API}/cities?minPopulation=500000&namePrefix=${cityName.value}&sort=-population`,
    geoOptionsApi
  )
    .then((response) => response.json())
    .then((response) => {
      searchResults.value = response.data;
      showSearchResults.value = true;
    })
    .catch((err) => console.error(err));
};
const getCityWeather = (lat, lon) => {
  const fixLat = lat.toFixed(2);
  const fixLon = lon.toFixed(2);
  showSearchResults.value = false;
  console.log(fixLat, fixLon);
  fetch(
    `${OPEN_WEATHER_URL_API}/weather?lat=${fixLat}&lon=${fixLon}&units=metric&appid=${openWeatherApiKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      weather.value = response;
      weatherStatusImg.value = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped>
.main {
  background-color: hsl(0, 0%, 99%);
  max-width: 320px;
}
.default {
  border: 1px solid hsl(0, 0%, 92%);
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
  cursor: pointer;
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
