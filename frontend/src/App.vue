<script setup lang="ts">
import { useStudentStore } from '@/stores/student';
import { useRouter } from 'vue-router';

const studentStore = useStudentStore();
const router = useRouter();

function logout() {
  studentStore.clearStudent();
  router.push('/login');
}
</script>

<template>
 <div id="app">
	<header>
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
			<router-link to="/contact">Contact</router-link>
			<router-link to="/leaderboard">Leaderboard</router-link>
			<router-link v-if="!studentStore.student" to="/login">Login</router-link>
			<span v-else class="user-info">
				Welcome, {{ studentStore.student.name.first }} {{ studentStore.student.name.last }}
				<button @click="logout">Logout</button>
			</span>
		</nav>
	</header>
	<main>
		<router-view />
	</main>
 </div>
</template>

<style scoped>
.user-info {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}
</style>
