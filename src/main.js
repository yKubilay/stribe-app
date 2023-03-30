import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import PrimeVue from 'primevue/config';
import 'swiper/swiper-bundle.css';


/* import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
 */
import 'primevue/resources/themes/lara-light-blue/theme.css';
 
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';    

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue);
app.use(router);
app.use(autoAnimatePlugin);
app.use(pinia);


app.mount("#app");
