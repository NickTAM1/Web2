import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as { name: { first: string; last: string }; email: string } | null,
  }),
  getters: {
    isLoggedIn: (state): boolean => state.user !== null,
    fullName: (state): string =>
      state.user ? `${state.user.name.first} ${state.user.name.last}` : "",
  },
  actions: {
    setUser(user: { name: { first: string; last: string }; email: string }) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});