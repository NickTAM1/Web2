import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    async fetchCount() {
      try {
        const res = await fetch("/api/counter");
        if (!res.ok) return;
        const data = await res.json();
        this.count = data.count ?? 0;
      } catch {
        // keep count at 0 if DB is unreachable
      }
    },
    async increment() {
      try {
        const res = await fetch("/api/counter/increment", { method: "POST" });
        if (!res.ok) return;
        const data = await res.json();
        this.count = data.count ?? this.count;
      } catch {
        // keep current count if DB is unreachable
      }
    },
  },
});
