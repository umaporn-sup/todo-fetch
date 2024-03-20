<script setup></script>

<template>
  <div class="flex justify-end gap-2 p-1">
    <router-link to="/login">Login | </router-link>
    <router-link to="/todo-manager">Todo Manager | </router-link>
    <router-link :to="{ name: 'AboutUs' }">AboutUs</router-link>
  </div>
</template>

<style scoped></style>
