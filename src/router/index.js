import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import Edit from "@/components/Edit.vue";
import Login from "@/components/Login.vue";
import NotFound from "@/views/NotFoundPage.vue";
import IndvCard from "@/components/IndvCard.vue";
import Discovery from "@/views/DiscoveryView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/indvcard",
    name: "Indv Card",
    component: IndvCard,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/Discovery",
    name: "Discovery",
    component: Discovery,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
