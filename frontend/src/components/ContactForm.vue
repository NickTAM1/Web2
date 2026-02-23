<template>
    <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" v-model="formData.message" rows="4" required></textarea>
        </div>
        <button type="submit">Submit</button>
        <p v-if="submitted" class="success">Thank you for your message!</p>
    </form>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const formData = ref({
        name: '',
        message: ''
    });

    const submitted = ref(false);

    // Handle form submission
    function handleSubmit() {
        console.log('Form submitted:', formData.value);
        submitted.value = true;
        // Reset form
        formData.value = { name: '', message: '' };
    }
</script>

<style scoped>
    .contact-form {
        max-width: 400px;
        margin: 0 auto;
        text-align: left;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input, textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 10px 20px;
        cursor: pointer;
    }

    .success {
        color: green;
        margin-top: 10px;
    }
</style>
