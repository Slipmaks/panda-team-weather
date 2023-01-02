import { defineStore } from "pinia";
import {
  openWeatherApiKey,
  OPEN_WEATHER_URL_API,
  geoOptionsApi,
  GEO_URL_API,
} from "./api";

export const defaultStore = defineStore("main", {
  state: () => {
    return {
      theCards: [],
      theFeaturedCards: [],
    };
  },
  actions: {
    newWeatherCard() {
      this.theCards.push({
        id: Math.floor(Math.random() * 100),
        featured: false,
        data: null,
        dailyChart: null,
        weeklyChart: null,
      });
    },
    getCurrentLocationWeather() {
      const success = (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const dailyChart = this.getDailyChart(null, null, lat, lon);
        const currentLocation = {
          id: Math.floor(Math.random() * 100),
          featured: false,
          data: {},
          dailyChart: [],
          weeklyChart: [],
        };
        fetch(
          `${OPEN_WEATHER_URL_API}/weather?lat=${lat}&lon=${lon}&units=metric&cnt=8&lang=ua&appid=${openWeatherApiKey}`
        )
          .then((response) => response.json())
          .then((response) => {
            currentLocation.data = response;
          })
          .then(() => {
            currentLocation.dailyChart = dailyChart;
            this.theCards.push(currentLocation);
          })
          .catch((err) => console.log(err));
      };
      const error = (err) => {
        console.log(err);
      };
      navigator.geolocation.getCurrentPosition(success, error);
    },
    getWeather(city, code, id) {
      const currentCard = this.theCards.filter((e) => e.id === id);

      fetch(
        `${OPEN_WEATHER_URL_API}/weather?q=${city},${code}&lang=ua&units=metric&appid=${openWeatherApiKey}`
      )
        .then((response) => response.json())
        .then((response) => {
          currentCard[0].data = response;
          // console.log(currentCard[0]);

          // weatherStatusImg.value = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
          // getHourlyWeather(city, code);
        })
        .then(() => {
          const dailyChart = this.getDailyChart(city, code);
          currentCard[0].dailyChart = dailyChart;
        })
        .catch((err) => console.log(err));
    },
    getDailyChart(city, code, lat, lon) {
      const dayChart = [];
      if (city) {
        fetch(
          `${OPEN_WEATHER_URL_API}/forecast?q=${city},${code}&units=metric&cnt=8&lang=ua&appid=${openWeatherApiKey}`
        )
          .then((response) => response.json())
          .then((response) => {
            dayChart.push(response.list);
            // for (let i = 0; i < response.list.length; i++) {
            //   let item = response.list[i];
            //   let date = new Date(item.dt_txt);
            //   let hourFormat = date.getHours() + " година";
            //   dayChart.labels.push(hourFormat);
            //   dayChart.temp.push(item.main.temp);

            // chartDayData.value.labels.push(hourFormat);
            // chartDayData.value.datasets[0].data.push(item.main.temp);
            // }
          })
          .catch((err) => console.log(err));
      } else {
        fetch(
          `${OPEN_WEATHER_URL_API}/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=8&lang=ua&appid=${openWeatherApiKey}`
        )
          .then((response) => response.json())
          .then((response) => {
            dayChart.push(response.list);

            // for (let i = 0; i < response.list.length; i++) {
            //   let item = response.list[i];
            //   let date = new Date(item.dt_txt);
            //   let hourFormat = date.getHours() + " година";

            //   dayChart.labels.push(hourFormat);
            //   dayChart.temp.push(item.main.temp);
            // }
          })
          .catch((err) => console.log(err));
      }
      console.log(dayChart);
      return dayChart;
    },
  },
  getters: {},
});
