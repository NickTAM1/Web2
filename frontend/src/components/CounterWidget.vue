<template>
    <section class="counter">
        <h2>Counter: </h2>
        <p>Count: {{ store.count }}</p>

        <button @click="store.increment">Increment</button>
    </section>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useCounterStore } from '../stores/counter';

    const store = useCounterStore();

    onMounted(() => {
        store.fetchCount();
    });
</script>

<style scoped>
	.counter{
		border: 1px solid #ccc;
		border-radius: 12px;
	}

    button{
        padding: 10px 10px;
       cursor: pointer;
    }
</style>