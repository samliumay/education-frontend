<template>
  <router-link :to="`/course/${course.id}`">
    <article
      class="border-slate-300 border-2 rounded bg-green-200 hover:bg-green-300 p-3 shadow-inner hover:shadow-lg"
    >
      <div class="pb-1 flex justify-between">
        <span>{{ course.type }}</span>
        <span>{{ course.language }}</span>
      </div>
      <n-h2 class="mb-1 mt-2">{{ course.name }}</n-h2>
      <div>{{ course.age_group }}</div>
      <div>{{ course.category }}</div>
    </article>
  </router-link>
</template>
<script setup lang="ts">
import { NH2 } from 'naive-ui'

import { Product } from '@/types'

defineProps<{
  course: Product
}>()
</script>
