import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vi from "element-plus/es/locale/lang/vi";
import VeeValidate from 'vee-validate';

const app =createApp(App)
app.use(router);
app.use(ElementPlus, {
  locale: vi,
});
app.use(VeeValidate);
app.use(router);
app.mount("#app");