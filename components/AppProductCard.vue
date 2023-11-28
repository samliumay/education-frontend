<template>
  <NuxtLink :to="`/course/${course.id}`">
    <article
      class="rounded-xl border h-full hover:bg-red-200 transition p-3 hover:shadow-lg flex flex-col justify-between min-h-[240px] text-white"
      :class="`bg-${[course?.age_group]}`"
    >
      <div class="text-gray-100">
        <div class="pb-1 flex justify-between">
          <span class="mr-4">{{ course.category }}</span>
          <span class="uppercase">{{ course.language }}</span>
        </div>
      </div>

      <div class="flex-1 overflow-hidden py-1">
        <img
          v-if="course?.photo"
          :src="course.photo"
          :alt="course.name"
          aria-hidden
          class="w-full h-full object-cover"
        />
      </div>

      <div class="mt-4">
        <n-h2 class="mb-1 mt-1 text-white">{{ course.name }}</n-h2>
        <div class="w-full">
          <span
            v-for="slot in course.schedule_slots"
            :key="slot.id"
            class="mr-4"
          >
            <span>
              <strong>{{ $t(`dates.weekdays.short.${slot.weekday}`) }}</strong>
              {{ slot.start.slice(0, -3) }}
            </span>
          </span>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
<script setup lang="ts">
import { NH2 } from "naive-ui"

import { type Product } from "../types"

defineProps<{
  course: Product;
}>()
</script>
