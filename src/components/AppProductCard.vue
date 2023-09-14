<template>
  <router-link :to="`/course/${course.id}`">
    <article
      class="rounded-xl h-full hover:bg-red-200 transition p-3 hover:shadow-lg flex flex-col justify-between min-h-[240px] bg-gray-200"
    >
      <div class="text-gray-500">
        <div class="pb-1 flex justify-between">
          <span class="capitalize">{{ course.type }}</span>
          <span class="uppercase">{{ course.language }}</span>
        </div>
      </div>
      <div>
        <div>
          <span class="mr-4">{{ course.category }}</span>
          <span>{{ course.age_group }}</span>
        </div>
        <n-h2 class="mb-1 mt-1">{{ course.name }}</n-h2>
      </div>
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
