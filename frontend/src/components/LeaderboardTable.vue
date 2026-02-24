<template>
    <div>
        <div v-if="leaderboardStore.loading">Loading...</div>
        <div v-else-if="leaderboardStore.error">Error: {{ leaderboardStore.error }}</div>
        <table v-else>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(entry, index) in leaderboardStore.entries" :key="entry.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ entry.name }}</td>
                    <td>{{ entry.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLeaderboardStore } from "@/stores/leaderboard";

const leaderboardStore = useLeaderboardStore();

onMounted(() => {
    leaderboardStore.fetchEntries();
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f4f4f4;
    text-align: left;
}
</style>
