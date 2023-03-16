import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vi from "element-plus/es/locale/lang/vi";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

const app =createApp(App)
app.use(router);
app.use(ElementPlus, {
  locale: vi,
});

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  icon: true,
  position: "top-center",
});


app.use(router);
app.mount("#app");