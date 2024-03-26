import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Profile from "@/views/ProfilePage.vue"
import Edit from "@/views/EditPage.vue";
import Login from "@/components/Login.vue";
import NotFound from "@/views/NotFoundPage.vue";


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
    name: "Profile",
    component: Profile,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
