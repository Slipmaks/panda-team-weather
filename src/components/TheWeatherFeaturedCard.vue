<template>
  <div class="main default" :class="[weatherFeature ? 'featured' : '']">
    <div class="default" v-if="weatherData && loaded">
      <div>
        <button @click="isDayWeather = true">День</button>
        <button @click="isDayWeather = false">Тиждень</button>
      </div>
      <div>
        <div>
          <div>
            <h2>{{ weatherData.name }}, {{ weatherData.sys?.country }}</h2>
          </div>
          <div class="current-temp" v-if="loaded && isDayWeather">
            <img :src="weatherStatusImg" v-if="weatherStatusImg" />
            <h2>{{ Math.round(weatherData.main?.temp) }} °C</h2>
          </div>
          <div class="current-temp" v-if="loaded && !isDayWeather">
            <p>Середня температура: &nbsp</p>
            <h2>{{ Math.round(avgWeekTemp) }} °C</h2>
          </div>
          <div v-if="isDayWeather">
            <p>
              Відчувається як:
              {{ Math.round(weatherData.main?.feels_like) }} °C.
              {{ weatherData?.weather[0].description.charAt(0).toUpperCase()
              }}{{ weatherData?.weather[0].description.slice(1) }}
            </p>
          </div>
        </div>
        <div class="default" v-if="isDayWeather && chartData.length">
          <Line :options="chartOptions" :data="chartDayData" />
        </div>
        <div class="default" v-if="!isDayWeather">
          <Line :options="chartOptions" :data="chartWeekData" />
        </div>
      </div>
    </div>
    <button @click="removeFromFeature">Видалити</button>
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { defaultStore } from "../store";
import { ref, toRefs, computed } from "vue";

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
  "chartData",
]);
const { weatherData, weatherId, weatherFeature, chartData } = toRefs(props);
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const labelsDayData = ref([]);
const tempDayData = ref([]);
const labelsWeekData = ref([]);
const tempWeekData = ref([]);
const loaded = ref(false);

const chartDayData = computed(() => {
  return {
    labels: labelsDayData.value,
    datasets: [
      {
        label: "Погодинний прогноз",
        backgroundColor: "#ebebeb",
        data: tempDayData.value,
      },
    ],
  };
});
const chartWeekData = computed(() => {
  return {
    labels: labelsWeekData.value,
    datasets: [
      {
        label: "Температура на 5 днів",
        backgroundColor: "#ebebeb",
        data: tempWeekData.value,
      },
    ],
  };
});
const store = defaultStore();

const isDayWeather = ref("true");

const weatherStatusImg = ref();
const avgWeekTemp = ref();

const paintData = () => {
  setTimeout(() => {
    weatherStatusImg.value = `http://openweathermap.org/img/wn/${weatherData.value?.weather[0].icon}.png`;

    const allWeeklyTemp = [];
    for (let i = 0; i < 8; i++) {
      let item = chartData.value[0][i];

      let date = new Date(item.dt_txt);
      let hourFormat = date.getHours() + " год.";
      let fixTempVal = Math.round(item.main.temp);
      labelsDayData.value.push(hourFormat);
      tempDayData.value.push(fixTempVal);
    }
    for (let i = 0; i < chartData.value[0].length; i++) {
      let item = chartData.value[0][i];
      allWeeklyTemp.push(item.main.temp);
    }
    let day = 0;
    for (let i = 0; i < allWeeklyTemp.length; i += 8) {
      day += 1;
      const chunk = allWeeklyTemp.slice(i, i + 8);
      const averageVal = chunk.reduce((a, b) => a + b) / chunk.length;
      const fixAverageVal = Math.round(averageVal);
      tempWeekData.value.push(fixAverageVal);
      labelsWeekData.value.push(day + " день");
    }
    avgWeekTemp.value =
      allWeeklyTemp.reduce((a, b) => a + b) / allWeeklyTemp.length;
    loaded.value = true;
  }, 0);
};
paintData();
const removeFromFeature = () => {
  store.removeFromFeature(weatherData.value.name);
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
