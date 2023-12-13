<template>
  <h1 class="mt-[96px] text-[48px] font-medium">Преподаватели</h1>

  <div class="mt-[48px] grid grid-cols-3 gap-[24px]">
    <InstructorBlock
      v-for="instructor in instructors"
      :key="instructor.first_name + instructor.last_name"
      :instructor="instructor"
    />
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from "vue"

import InstructorBlock from "../components/misc/InstructorBlock.vue"
import type { Instructor } from "../types"

const instructors: Ref<Instructor[]> = ref([])
</script>
