<template>
    <footer class="leaderboard-footer">
        <p>Last updated: {{ lastUpdated }}</p>
    </footer>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const lastUpdated = ref(new Date().toLocaleString()); 
</script>

<style scoped>
    .leaderboard-footer {
        text-align: center;
        margin-top: 20px;
        color: #666;
    }
</style>
