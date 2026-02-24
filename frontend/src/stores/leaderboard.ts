import { defineStore } from "pinia";

export interface LeaderboardEntry {
  id?: number;
  name: string;
  score: number;
}

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => ({
    entries: [] as LeaderboardEntry[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchEntries() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch("/api/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch leaderboard data");
        this.entries = await response.json();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    setEntries(entries: LeaderboardEntry[]) {
      this.entries = entries;
    },
  },
});
