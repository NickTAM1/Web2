<template>
    <div class="leaderboard-table">
        <h2>Leaderboard Table</h2>
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in LeaderboardData" :key="index">
                    <td>{{ item.player }}</td>
                    <td>{{ item.score }}</td>
                </tr>
            </tbody>
        </table>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    type LeaderboardItem = {
        player: string;
        score: number;
    };

    const LeaderboardData = ref<LeaderboardItem[]>([]);
    const errorMessage = ref("");

    async function fetchLeaderboardData() {
        try {
            const res = await fetch('http://localhost:3000/api/leaderboard');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = (await res.json()) as LeaderboardItem[];
            LeaderboardData.value = data;
        } catch (err: any) {
            errorMessage.value = err?.message ?? 'Unknown error occurred';
        }
    }

    onMounted(() => {
        fetchLeaderboardData();
    });
</script>

<style scoped>
    .leaderboard-table {
        text-align: center;
        margin-top: 20px;
    }

    table {
        margin: 0 auto;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 8px 16px;
    }

    th {
        background-color: #f0f0f0;
    }

    .error {
        color: red;
    }
</style>
