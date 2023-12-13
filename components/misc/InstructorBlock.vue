<template>
  <div class="bg-white rounded-[12px]">
    <div class="aspect-square rounded-[12px] overflow-hidden h-[400px]">
      <img
        v-if="instructor.photo"
        :src="instructor.photo"
        :alt="`${`${instructor.first_name} ${instructor.last_name}`} photo`"
        class="h-full"
      />
      <div v-else class="h-full w-full bg-gray-300" />
    </div>

    <div
      class="relative text-[24px] font-medium -rotate-[30deg] ml-[24px] bg-green-700 rounded-[60px] p-[8px] -top-[40px]"
    >
      <h2
        class="rounded-[60px] border-white border-[1px] px-[12px] py-[8px] flex items-center gap-[8px]"
      >
        <img src="../../assets/icons/instructors_star.svg" alt="Star icon" />
        {{ `${instructor.first_name} ${instructor.last_name}` }}
      </h2>
    </div>

    <div class="flex justify-center items-center" />
  </div>
</template>
<script setup lang="ts">
import { type Instructor } from "../../types"

defineProps<{
  instructor: Instructor;
}>()
</script>
