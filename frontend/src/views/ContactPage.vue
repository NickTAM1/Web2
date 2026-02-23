<template>
    <div class="contact-page">
        <h1>Contact Us</h1>
        <p>Have feedback or questions? Send us a message!</p>
        <ContactForm />
    </div>
</template>

<script setup lang="ts">
    import ContactForm from '@/components/ContactForm.vue';
</script>

<style scoped>
    .contact-page {
        text-align: center;
        margin-top: 20px;
    }
</style>