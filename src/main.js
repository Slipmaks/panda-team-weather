import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { vue3Debounce } from "vue-debounce";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();
app.directive(
  "debounce",
  vue3Debounce({
    lock: true,
    trim: true,
  })
);
app.use(pinia);
app.mount("#app");
