import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import Edit from "@/components/Edit.vue";
import Login from "@/components/Login.vue";
import NotFound from "@/views/NotFoundPage.vue";
import CardsPage from "@/views/CardsPage.vue";
import IndvCard from "@/views/IndvCardPage.vue";
import Discovery from "@/views/DiscoveryView.vue";
import CompareCard from "@/views/CompareCardsPage.vue";
import PaymentPage from "@/views/PaymentPage.vue";

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
    path: "/card/:cardId",
    name: "Indv Card",
    component: IndvCard,
  },
  {
    path: "/ompare",
    name: "Compare Card",
    component: CompareCard,
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
  {
    path: "/Payment",
    name: "Payment",
    component: PaymentPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
