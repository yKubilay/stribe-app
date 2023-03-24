import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

const app = createApp(App);
const pinia = createPinia();


app.use(router);
app.use(autoAnimatePlugin);
app.use(pinia);

app.mount("#app");
