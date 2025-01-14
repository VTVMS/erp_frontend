import { createApp } from 'vue';
import './style.css';
import 'vue-select/dist/vue-select.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import vSelect from 'vue-select';

const app = createApp(App);
const pinia = createPinia();
app.use(Toast, {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
  });
app.component('v-select', vSelect)
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
