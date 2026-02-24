<template>
    <div class="Leaderboard-summary">
        <h2>Leaderboard Summary</h2>
        <div v-if="leaderboardStore.loading">Loading...</div>
        <div v-else-if="leaderboardStore.error" class="error">{{ leaderboardStore.error }}</div>
        <table v-else>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(entry, index) in leaderboardStore.topThree" :key="index">
                    <td>{{ entry.name }}</td>
                    <td>{{ entry.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useLeaderboardStore } from '@/stores/leaderboard';

    const leaderboardStore = useLeaderboardStore();

    onMounted(() => {
        if (leaderboardStore.entries.length === 0) {
            leaderboardStore.fetchEntries();
        }
    });
</script>

<style scoped>
    .Leaderboard-summary{
        margin-top: 10px;
    }

    table {
        margin: 0 auto;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ccc;
    }

    .error {
        color: rebeccapurple;
    }
</style>
