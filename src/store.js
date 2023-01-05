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
      isExistCity: [],
      modalMessage: "",
    };
  },
  actions: {
    newWeatherCard() {
      this.theCards.push({
        id: Math.floor(Math.random() * 100),
        featured: false,
        data: {},
        chart: [],
      });
    },
    getCurrentLocationWeather() {
      const success = (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const currentChart = this.getChartData(null, null, lat, lon);
        const currentLocation = {
          id: Math.floor(Math.random() * 100),
          featured: false,
          data: {},
          chart: [],
        };

        fetch(
          `${OPEN_WEATHER_URL_API}/weather?lat=${lat}&lon=${lon}&units=metric&cnt=8&lang=ua&appid=${openWeatherApiKey}`
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            currentLocation.data = response;
            const featuredCard = this.theFeaturedCards.filter(
              (e) => e.data.name === response.name
            );
            if (featuredCard.length) {
              currentLocation.featured = true;
            }
          })
          .then(() => {
            currentLocation.chart = currentChart;
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
      this.existCard = this.theCards.filter((e) => e.data.name === city);

      if (this.existCard[0]) {
        this.modalMessage = "Город існує";
      } else {
        let featureStatus = false;

        const featuredCard = this.theFeaturedCards.filter(
          (e) => e.data.name === city
        );

        if (featuredCard.length) {
          featureStatus = true;
        }
        const currentCard = this.theCards.filter((e) => e.id === id);
        const currentChart = this.getChartData(city, code);
        fetch(
          `${OPEN_WEATHER_URL_API}/weather?q=${city},${code}&lang=ua&units=metric&appid=${openWeatherApiKey}`
        )
          .then((response) => response.json())
          .then((response) => {
            currentCard[0].data = response;
            currentCard[0].featured = featureStatus;
          })
          .then(() => {
            currentCard[0].chart = currentChart;
          })
          .catch((err) => console.log(err));
      }
    },
    getChartData(city, code, lat, lon) {
      const dayChart = [];
      if (city) {
        fetch(
          `${OPEN_WEATHER_URL_API}/forecast?q=${city},${code}&units=metric&lang=ua&appid=${openWeatherApiKey}`
        )
          .then((response) => response.json())
          .then((response) => {
            dayChart.push(response.list);
          })
          .catch((err) => console.log(err));
      } else {
        fetch(
          `${OPEN_WEATHER_URL_API}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ua&appid=${openWeatherApiKey}`
        )
          .then((response) => response.json())
          .then((response) => {
            dayChart.push(response.list);
          })
          .catch((err) => console.log(err));
      }
      return dayChart;
    },

    cardToFeature(name) {
      if (this.theFeaturedCards.length < 5) {
        const currentCard = this.theCards.filter((e) => e.data.name === name);
        currentCard[0].featured = true;
        this.theFeaturedCards.push(currentCard[0]);
      } else {
        this.modalMessage = "Максимум 5 обраних";
      }
    },
    removeFromFeature(name) {
      const currentCard = this.theFeaturedCards.filter(
        (e) => e.data.name === name
      );

      currentCard[0].featured = false;
      this.theFeaturedCards = this.theFeaturedCards.filter(
        (e) => e.data.name !== name
      );
    },
    deleteCard(name) {
      this.theCards = this.theCards.filter((e) => e.data.name !== name);
    },
  },
  getters: {
    cards(state) {
      return state.theCards;
    },
    featured(state) {
      return state.theFeaturedCards;
    },
  },
});
