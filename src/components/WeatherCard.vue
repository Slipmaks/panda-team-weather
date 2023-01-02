<!-- pinia -->
<template>
  <div class="main default" :class="[weatherFeature ? 'featured' : '']">
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
            @click="getCityWeather(item.city, item.countryCode, weatherId)"
          >
            {{ item.city }}, {{ item.countryCode }}
          </li>
        </ul>
      </div>
      <!-- <button
        v-if="props.weatherFeature"
        @click="cardToFeature(weather, weather.name, props.weatherId)"
      >
        Обране
      </button>
      <button
        v-if="!props.weatherFeature"
        @click="removeFromFeature(weather.name)"
      >
        Убрати
      </button> -->
    </div>

    <div class="default" v-if="weatherData">
      <div>
        <button @click="isDayWeather = true">День</button>
        <button @click="isDayWeather = false">Неділя</button>
      </div>
      <div v-if="isDayWeather">
        <div>
          <div>
            <h2>{{ weatherData.name }}, {{ weatherData.sys?.country }}</h2>
          </div>
          <div class="current-temp">
            <img :src="weatherStatusImg" v-if="weatherStatusImg" />
            <h2>{{ Math.round(weatherData.main.temp) }} °C</h2>
          </div>
          <div>
            <p>
              Відчувається як:
              {{ Math.round(weatherData.main.feels_like) }} °C.
              {{ weatherData.weather[0].description.charAt(0).toUpperCase()
              }}{{ weatherData.weather[0].description.slice(1) }}
            </p>
          </div>
        </div>
        <div class="default" v-if="props.dailyChart">
          <Line :options="chartOptions" :data="chartDayData" />
        </div>
        <!-- <div
          class="default"
          v-if="chartWeekData.labels.length && !isDayWeather"
        >
          <Line :options="chartOptions" :data="chartWeekData" />
        </div> -->
      </div>
    </div>
    <!-- <button @click="deleteCard">Видалити</button> -->
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { defaultStore } from "../store";
import { ref, onUpdated, onMounted, toRefs, reactive, computed } from "vue";
import { GEO_URL_API, geoOptionsApi } from "../api";
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
const props = defineProps([
  "weatherData",
  "weatherId",
  "weatherFeature",
  "dailyChart",
  "weeklyChart",
]);
const { weatherData, weatherId, weeklyChart, weatherFeature, dailyChart } =
  toRefs(props);
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const labelsData = ref([]);
const tempData = ref([]);
if (dailyChart.value) {
  for (let i = 0; i < dailyChart.value[0].length; i++) {
    let item = dailyChart.value[0][i];

    let date = new Date(item.dt_txt);
    let hourFormat = date.getHours() + " година";

    labelsData.value.push(hourFormat);
    tempData.value.push(item.main.temp);
  }
}
const chartDayData = computed(() => {
  return {
    labels: labelsData.value,
    datasets: [
      {
        label: "Погодинний прогноз",
        backgroundColor: "#ebebeb",
        data: tempData.value,
      },
    ],
  };
});
// reactive({
//   labels: [],
//   datasets: [
//     {
//       label: "Погодинний прогноз",
//       backgroundColor: "#ebebeb",
//       data: [],
//     },
//   ],
// });

const store = defaultStore();
const searchResults = ref("");
const showSearchResults = ref(false);
const isDayWeather = ref("true");
const cityName = ref("");
const weatherStatusImg = ref();

onUpdated(() => {
  // if (dailyChart.value?.labels) {
  //   chartDayData.labels = dailyChart.value.labels;
  //   chartDayData.datasets[0].data = dailyChart.value.temp;
  //   console.log(chartDayData.datasets);
  // }

  console.log(weatherData.value?.weather[0].icon);
  weatherStatusImg.value = `http://openweathermap.org/img/wn/${weatherData.value?.weather[0].icon}.png`;
});
const getCities = () => {
  fetch(
    `${GEO_URL_API}/cities?namePrefix=${cityName.value}&sort=-population`,
    geoOptionsApi
  )
    .then((response) => response.json())
    .then((response) => {
      searchResults.value = response.data;
      showSearchResults.value = true;
    })
    .catch((err) => console.error(err));
};
const getCityWeather = (city, code, id) => {
  showSearchResults.value = false;
  cityName.value = "";

  store.getWeather(city, code, id);
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

.featured {
  border: 1px solid rgb(255, 191, 0);
}
</style>
