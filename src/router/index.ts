import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: '/showDetailsPage/:id',
      name: 'showDetailsPage',
      props: true,
      component: () => import('@/views/ShowDetailsPage.vue')
    }
  ],
});

export default router;
