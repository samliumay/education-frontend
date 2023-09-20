<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cold-3 gap-4 p-5"
  >
    <section
      v-for="instructor in instructors"
      :key="instructor.first_name + instructor.last_name"
      class="flex flex-col items-center text-center"
    >
      <img
        class="rounded-xl shadow-lg"
        :alt="`${instructor.first_name} ${instructor.last_name}`"
        :src="instructor.photo"
        width="1500"
        height="1694"
      />
      <p class="text-gray-500 mt-2 text-lg">{{ instructor.job }}</p>
      <n-h2 class="mt-2">
        {{ instructor.first_name }} {{ instructor.last_name }}
      </n-h2>
    </section>
  </div>
</template>
<script setup lang="ts">
import { NH2 } from 'naive-ui'
import { ref } from 'vue'

import { HTTP } from '@/api'
import { Instructor } from '@/types'

const instructors = ref<Instructor[]>(
  await HTTP.get<Instructor[]>('/api/v1/users/instructors/'),
)
</script>
