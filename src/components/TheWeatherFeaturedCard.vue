<template>
  <div class="main default" :class="[weatherFeature ? 'featured' : '']">
    <div class="default search-featured">
      <button v-if="!weatherFeature" @click="cardToFeature">Обране</button>
      <button v-if="weatherFeature" @click="removeFromFeature">Убрати</button>
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
        <div class="default">
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
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { defaultStore } from "../store";
import { ref, toRefs, computed } from "vue";
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
const isDayWeather = ref("true");
const weatherStatusImg = ref();
for (let i = 0; i < dailyChart.value[0].length; i++) {
  let item = dailyChart.value[0][i];

  let date = new Date(item.dt_txt);
  let hourFormat = date.getHours() + " година";

  labelsData.value.push(hourFormat);
  tempData.value.push(item.main.temp);
}
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
