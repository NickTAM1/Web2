<template>
    <div class="leaderboard-page">
        <LeaderboardHeader />
        <LeaderboardTable />
        <LeaderboardFooter />
    </div>
</template>

<script setup lang="ts">
    import LeaderboardHeader from '@/components/LeaderboardHeader.vue';
    import LeaderboardTable from '@/components/LeaderboardTable.vue';
    import LeaderboardFooter from '@/components/LeaderboardFooter.vue';
</script>

<style scoped>
    .leaderboard-page {
        text-align: center;
        margin-top: 20px;
    }
</style>