<template>
    <form @submit.prevent="submitForm" class="contact-form">
        <div v-if="loading" class="status">Submitting...</div>
        <div v-else>
            <div v-if="error" class="error">Error: {{ error }}</div>
            <div v-if="success" class="success">Message sent successfully!</div>

            <div class="field">
                <label for="first_name">First Name</label>
                <input id="first_name" v-model="form.first_name" required placeholder="First name" />
            </div>

            <div class="field">
                <label for="last_name">Last Name</label>
                <input id="last_name" v-model="form.last_name" required placeholder="Last name" />
            </div>

            <div class="field">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="form.email" required placeholder="your@email.com" />
            </div>

            <div class="field">
                <label for="message">Message</label>
                <textarea id="message" v-model="form.message" required placeholder="Write your message here..." rows="5"></textarea>
            </div>

            <button type="submit">Send</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStudentStore } from "@/stores/student";

const studentStore = useStudentStore();

const form = ref({
    first_name: studentStore.student?.name?.first ?? "",
    last_name: studentStore.student?.name?.last ?? "",
    email: studentStore.student?.email ?? "",
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                student_id: (studentStore.student as any)?._id,
                first_name: form.value.first_name,
                last_name: form.value.last_name,
                email: form.value.email,
                message: form.value.message,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to submit the form");
        }

        success.value = true;
        form.value.message = "";
    } catch (e: any) {
        error.value = e.message;
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.contact-form {
    display: flex;
    flex-direction: column;
    max-width: 480px;
    margin: 24px auto 0;
    gap: 4px;
}

.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    text-align: left;
}

label {
    margin-bottom: 4px;
    font-weight: 600;
}

input,
textarea {
    padding: 8px 10px;
    border: 1px solid #555;
    border-radius: 4px;
    background-color: #1e1e1e;
    color: inherit;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}

textarea {
    resize: vertical;
}

button {
    align-self: flex-end;
    padding: 8px 24px;
    border: none;
    border-radius: 4px;
    background-color: #4a90d9;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}

button:hover {
    background-color: #357abd;
}

.status {
    margin-bottom: 12px;
}

.error {
    color: #e05c5c;
    margin-bottom: 10px;
}

.success {
    color: #5cb85c;
    margin-bottom: 10px;
}
</style>
