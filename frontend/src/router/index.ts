import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import AboutPage from "../views/AboutPage.vue";
import ContactPage from "../views/ContactPage.vue";
import LeaderboardPage from "../views/LeaderboardPage.vue";
import LoginPage from "../views/LoginPage.vue";

const routes = [
  { path: "/", name: "Landing", component: LandingPage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/contact", name: "Contact", component: ContactPage },
  { path: "/leaderboard", name: "Leaderboard", component: LeaderboardPage },
  { path: "/login", name: "Login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
