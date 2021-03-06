import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import VeePage from "@/views/VeePage.vue";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: DashboardPage,
      meta: {
        layout: 'default-layout',
        breadcrumb: [
          {
            text: 'Home',
            link: '/'
          },
          {
            text: 'MDM',
          }
        ]
      }
    },
    {
      path: "/login",
      component: LoginPage,
      meta: {
        layout: 'login-layout',
      }
    },
    {
      path: "/dashboard",
      component: DashboardPage,
      meta: {
        layout: 'default-layout',
        breadcrumb: [
          {
            text: 'Home',
            link: '/'
          },
          {
            text: 'MDM',
          }
        ]
      }
    },
    {
      path: "/vee",
      component: VeePage,
      meta: {
        layout: 'vee-layout',
        breadcrumb: [
          {
            text: 'Home',
            link: '/'
          },
          {
            text: 'vee',
          }
        ]
      }
    },
  ],
});
export default router;
