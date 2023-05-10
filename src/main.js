import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vi from "element-plus/es/locale/lang/vi";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import clickOutside from './js/common/directive';
import 'splitpanes/dist/splitpanes.css'
import VueNumberFormat from '@coders-tm/vue-number-format'
import mitt from 'mitt';
const app =createApp(App)
app.use(router);
app.use(ElementPlus, {
  locale: vi,
});
app.use(VueNumberFormat, {precision: 8})
const emitter= mitt();
app.directive("outside", clickOutside)
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  icon: true,
  position: "bottom-right",
});
app.config.globalProperties.emitter = emitter;

app.use(router);
app.mount("#app");