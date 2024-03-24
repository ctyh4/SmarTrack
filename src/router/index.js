import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Login from "@/views/LoginPage.vue";
import Logout from "@/views/LogoutPage.vue"
import Profile from "@/views/ProfilePage.vue"
import Edit from "@/views/EditPage.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
