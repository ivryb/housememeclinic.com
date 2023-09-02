<script setup>
const title = 'Get diagnosed by House M. D. — Chat with House';
const description = `House Meme Clinic is a web app where users can chat with the character Dr. Gregory House for a humorous diagnosis experience. It's purely for entertainment and not for medical advice. Visit the clinic and chat with House for a lighthearted medical scenario.`;

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
});
</script>

<template>
  <div class="prose max-w-none pt-20">
    <div>
      <h1 class="text-7xl font-normal text-center">
        Get diagnosed<br />
        by House M. D.
      </h1>
    </div>
    <PatientForm />
  </div>
</template>
