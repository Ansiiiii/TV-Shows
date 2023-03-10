import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import('@/views/HomeView.vue'),
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
