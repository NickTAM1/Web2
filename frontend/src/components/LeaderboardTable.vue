<template>
    <div>
        <div v-if="leaderboardStore.loading">Loading...</div>
        <div v-else-if="leaderboardStore.error">Error: {{ leaderboardStore.error }}</div>
        <table v-else>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th @click="sortBy('name')" class="sortable">
                        Player <span>{{ sortIndicator('name') }}</span>
                    </th>
                    <th @click="sortBy('score')" class="sortable">
                        Score <span>{{ sortIndicator('score') }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(entry, index) in sortedEntries" :key="entry.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ entry.name }}</td>
                    <td>{{ entry.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useLeaderboardStore, type LeaderboardEntry } from "@/stores/leaderboard";

const leaderboardStore = useLeaderboardStore();

type SortKey = 'name' | 'score';
type SortDir = 'asc' | 'desc';

const sortKey = ref<SortKey>('score');
const sortDir = ref<SortDir>('desc');

function sortBy(key: SortKey) {
    if (sortKey.value === key) {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortDir.value = key === 'score' ? 'desc' : 'asc';
    }
}

function sortIndicator(key: SortKey): string {
    if (sortKey.value !== key) return '↕';
    return sortDir.value === 'asc' ? '↑' : '↓';
}

const sortedEntries = computed<LeaderboardEntry[]>(() => {
    return [...leaderboardStore.entries].sort((a, b) => {
        const valA = a[sortKey.value];
        const valB = b[sortKey.value];
        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortDir.value === 'asc' ? valA - valB : valB - valA;
        }
        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return sortDir.value === 'asc' ? -1 : 1;
        if (strA > strB) return sortDir.value === 'asc' ? 1 : -1;
        return 0;
    });
});

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

th.sortable {
    cursor: pointer;
    user-select: none;
}

th.sortable:hover {
    background-color: #e0e0e0;
}
</style>
