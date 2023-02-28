import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../src/components/page/HomePage.vue"
 import PropertyManagementPage from "./components/page/AssetManagementPage.vue";

const routes =  [
    {
        
        path: "/",
        component: HomePage,
        
        children: [
            {
              path: "/tongquan",
              component: PropertyManagementPage,
            },
            {
              path: "/taisan",
              component: PropertyManagementPage,
            },
            {
              path: "/timkiem",
              component: PropertyManagementPage,
            },
            {
              path: "/congcu",
              component: PropertyManagementPage,
            },
            {
              path: "/danhmuc",
              component: PropertyManagementPage,
            },
            {
              path: "/baocao",
              component: PropertyManagementPage,
            },
            {
              path: "/taisanhbdt",
              component: PropertyManagementPage,
            },
            {
              path: "/ghitang",
              component: PropertyManagementPage,
            },
          ],

    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  export default router;