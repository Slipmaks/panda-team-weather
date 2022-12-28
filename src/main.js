import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { vue3Debounce } from "vue-debounce";
const app = createApp(App);
app.directive(
  "debounce",
  vue3Debounce({
    lock: true,
    trim: true,
  })
);
app.mount("#app");
