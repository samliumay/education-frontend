<template>
  <div class="bg-white rounded-[12px] p-4">
    <div class="aspect-square rounded-[12px] overflow-hidden h-[400px]">
      <img
        v-if="instructor.photo"
        :src="instructor.photo"
        :alt="`${`${instructor.first_name} ${instructor.last_name}`} photo`"
        class="h-full"
      />
      <div v-else class="h-full w-full bg-gray-300" />
    </div>

    <div class="flex flex-col items-center mt-6">
      <p
        class="text-center text-brand-red text-[20px] sm:text-[24px] font-medium"
      >
        {{ `${instructor.first_name} ${instructor.last_name}` }}
      </p>
      <p class="mt-4 font-medium">
        {{ instructor.job }}
      </p>
      <p class="text-brand-red text-medium underline">
        Подробнее
        <img src="/icons/arrow_right.svg" alt="Arrow" class="ml-1" />
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Instructor } from '../../types'

defineProps<{
  instructor: Instructor
}>()
</script>
