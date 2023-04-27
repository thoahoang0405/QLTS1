import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../src/components/page/HomePage.vue"
 import AssetManagementPage from "./components/page/AssetManagementPage.vue";
import IncreaseAsset from "./components/page/IncreaseFixedAssetPage.vue"
const routes =  [
    {
        
        path: "/",
        component: HomePage,
        
        children: [
            {
              path: "/tongquan",
              component: AssetManagementPage,
            },
            {
              path: "/taisan",
              component: AssetManagementPage,
             
            },
            {
              path: "/timkiem",
              component: AssetManagementPage,

            },
            {
              path: "/congcu",
              component: AssetManagementPage,
            },
            {
              path: "/danhmuc",
              component: AssetManagementPage,
            },
            {
              path: "/baocao",
              component: AssetManagementPage,
            },
            {
              path: "/taisanhbdt",
              component: AssetManagementPage,
            },
            {
              path: "/ghitang",
              component: IncreaseAsset,
            },
          ],

    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  export default router;