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
import { useUserStore } from '@/stores/user';

const lastName = ref('');
const email = ref('');
const error = ref('');
const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
  error.value = '';
  try {
    const params = new URLSearchParams({ email: email.value, lastName: lastName.value });
    const response = await fetch(`/api/login?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed. Please try again.');
    }

    const userData = await response.json();
    userStore.setUser(userData);
    router.push('/leaderboard');
  } catch (err: any) {
    error.value = err.message;
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
