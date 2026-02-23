<template>
    <div class="Leaderboard-summary">
        <h2>Leaderboard Summary</h2>
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
        <p v-if="errorMessage" class="error">{{ errorMessage }} </p>  
    </div>
</template>   

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    type LeaderboardItem = {
        player: string;
        score: number;
    }

    const LeaderboardData = ref<LeaderboardItem[]>([]);
    const errorMessage = ref("");

    // Fetch leaderboard data 
    async function fetchleaderboardData() {
        try{
            const res = await fetch('/api/loaderboard-summary');
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = (await res.json()) as LeaderboardItem[];
            LeaderboardData.value = data;
        } 
        catch (err: any) {
            errorMessage.value = err?.message ?? 'Unknown error occurred';
        }
    }

    onMounted(() => {
        fetchleaderboardData();
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