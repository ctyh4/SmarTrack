import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue"
import Edit from "@/views/EditPage.vue";
import Login from "@/components/Login.vue";
import NotFound from "@/views/NotFoundPage.vue";
import CardsPage from "@/views/CardsPage.vue";


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
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/cards",
    name: "Cards",
    component: CardsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
