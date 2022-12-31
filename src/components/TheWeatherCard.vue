<template>
  <div class="main default">
    <div class="default search-featured">
      <div class="search">
        <input
          v-model="cityName"
          v-debounce:1000ms.cancelonempty="getCities"
          type="text"
          options="options"
          placeholder="Введіть назву міста"
        />
        <ul class="search-results" v-if="searchResults && showSearchResults">
          <li
            v-for="item in searchResults"
            :key="item.id"
            @click="getCityWeather(item.city, item.countryCode)"
          >
            {{ item.city }}, {{ item.countryCode }}
          </li>
        </ul>
      </div>
      <button>Обране</button>
    </div>

    <div class="default" v-if="weather">
      <div>
        <button @click="isDayWeather = true">День</button>
        <button @click="isDayWeather = false">Неділя</button>
      </div>
      <div v-if="isDayWeather">
        <div>
          <div>
            <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
          </div>
          <div class="current-temp">
            <img :src="weatherStatusImg" v-if="weatherStatusImg" />
            <h2>{{ Math.round(weather.main.temp) }} °C</h2>
          </div>
          <div>
            <p>
              Відчувається як: {{ Math.round(weather.main.feels_like) }} °C.
              {{ weather.weather[0].description.charAt(0).toUpperCase()
              }}{{ weather.weather[0].description.slice(1) }}
            </p>
          </div>
        </div>
        <div class="default" v-if="chartData.labels.length">
          <Line :options="chartOptions" :data="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  geoOptionsApi,
  GEO_URL_API,
  openWeatherApiKey,
  OPEN_WEATHER_URL_API,
} from "../api";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const cityName = ref("");
const searchResults = ref();
const showSearchResults = ref(false);
const weather = ref();
const weatherStatusImg = ref();
const isDayWeather = ref("true");
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Погодинний прогноз",
      backgroundColor: "#ebebeb",
      data: [],
    },
  ],
});

const getCities = () => {
  fetch(
    `${GEO_URL_API}/cities?namePrefix=${cityName.value}&sort=-population`,
    geoOptionsApi
  )
    .then((response) => response.json())
    .then((response) => {
      searchResults.value = response.data;
      console.log(response.data);
      showSearchResults.value = true;
    })
    .catch((err) => console.error(err));
};
const getCityWeather = (city, code) => {
  showSearchResults.value = false;
  fetch(
    `${OPEN_WEATHER_URL_API}/weather?q=${city},${code}&lang=ua&units=metric&appid=${openWeatherApiKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      weather.value = response;
      weatherStatusImg.value = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
      getHourlyWeather(city, code);
    })
    .catch((err) => console.log(err));
};
const getHourlyWeather = (city, code) => {
  fetch(
    `${OPEN_WEATHER_URL_API}/forecast?q=${city},${code}&units=metric&cnt=8&lang=ua&appid=${openWeatherApiKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.list.length; i++) {
        let item = response.list[i];
        let date = new Date(item.dt_txt);
        let hourFormat = date.getHours() + " година";
        chartData.value.labels.push(hourFormat);
        chartData.value.datasets[0].data.push(item.main.temp);
      }
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
.current-temp {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
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
