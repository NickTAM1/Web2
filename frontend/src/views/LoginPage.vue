<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStudentStore } from '@/stores/student';

const lastName = ref('');
const email = ref('');
const error = ref('');
const router = useRouter();
const studentStore = useStudentStore();

const handleLogin = async () => {
  error.value = '';
  try {
    const params = new URLSearchParams({ email: email.value, lastName: lastName.value });
    const response = await fetch(`/api/login?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed. Please try again.');
    }

    const data = await response.json();
    studentStore.setStudent(data);
    router.push('/leaderboard');
  } catch (e: any) {
    error.value = e.message;
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
