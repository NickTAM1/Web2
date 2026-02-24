import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as { name: { first: string; last: string }; email: string } | null,
  }),
  actions: {
    setUser(user: { name: { first: string; last: string }; email: string }) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});