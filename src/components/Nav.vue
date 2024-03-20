<script setup></script>

<template>
  <div class="flex justify-end gap-2">
    <router-link :to="{ name: 'TodoManager' }">Todo Manager |</router-link>
    <router-link :to="{ name: 'AboutUs' }">About Us</router-link>
  </div>
</template>
