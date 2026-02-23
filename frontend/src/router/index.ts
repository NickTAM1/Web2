import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LandingPage from "../views/LandingPage.vue";
import AboutPage from "../views/AboutPage.vue";
import LeaderboardPage from "../views/LeaderboardPage.vue";
import LoginPage from "../views/LoginPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Landing", component: LandingPage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/contact", name: "Contact", component: () => import("../views/ContactPage.vue") },
  { path: "/leaderboard", name: "Leaderboard", component: LeaderboardPage },
  { path: "/login", name: "Login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
