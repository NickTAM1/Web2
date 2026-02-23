import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { email: string; name: string },
  }),
  actions: {
    setUser(user: { email: string; name: string }) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});