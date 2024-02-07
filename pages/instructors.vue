<template>
  <div class="px-3 py-4 sm:px-12 sm:py-24">
    <h1 class="text-[32px] sm:text-[48px] font-medium">{{ $t('common.tutors') }}</h1>

    <div class="mt-4 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
      <InstructorBlock
        v-for="instructor in instructors"
        :key="instructor.first_name + instructor.last_name"
        :instructor="instructor"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from 'vue'

import InstructorBlock from '../components/misc/InstructorBlock.vue'
import type { Instructor } from '../types'

const instructors: Ref<Instructor[]> = ref([])
</script>
