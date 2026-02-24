<template>
    <form @submit.prevent="submitForm">
        <div v-if="loading">Submitting...</div>
        <div v-else>
            <div v-if="error" class="error">Error: {{ error }}</div>
            <div v-if="success" class="success">Message sent successfully!</div>

            <label for="first_name">First Name:</label>
            <input id="first_name" v-model="form.first_name" required />

            <label for="last_name">Last Name:</label>
            <input id="last_name" v-model="form.last_name" required />

            <label for="email">Email:</label>
            <input id="email" type="email" v-model="form.email" required />

            <label for="message">Message:</label>
            <textarea id="message" v-model="form.message" required></textarea>

            <button type="submit">Send</button>
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
});
const loading = ref(false);
const error = ref(null);
const success = ref(false);

const submitForm = async () => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.value),
        });

        if (!response.ok) {
            throw new Error("Failed to submit the form");
        }

        success.value = true;
        form.value = { first_name: "", last_name: "", email: "", message: "" };
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.error {
    color: red;
}

.success {
    color: green;
}
</style>
