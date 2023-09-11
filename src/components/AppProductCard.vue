<template>
  <article class="flex flex-column">
    <div class="pb-2">{{ course.type }}</div>
    <h2>{{ course.name }}</h2>
    <div>{{ course.age_group }}</div>

    <p>{{ course.description }}</p>
  </article>
</template>
<script setup lang="ts">
import { Product } from '@/types'

defineProps<{
  course: Product
}>()
</script>
