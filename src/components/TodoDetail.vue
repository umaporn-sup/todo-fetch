<script setup>
import { useRoute, useRouter } from 'vue-router'
const { params } = useRoute()
const router = useRouter()
console.log(params.todoId)
const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    {{ $route.params.todoId }}
    <img :src="`../../images/${$route.params.todoId}.jpg`" class="h-52 w-72" />
    <button @click="goBack">&lt;&lt;Back</button>
  </div>
</template>

<style scoped></style>
