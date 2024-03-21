import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue"
import Profile from "@/views/Profile.vue"
import Edit from "@/views/Edit.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
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
