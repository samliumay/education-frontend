<template>
  <div v-if="course">
    <div class="w-full bg-gray-200 rounded-xl min-h-[50vh] py-10">
      <div class="centered w-4/5 md:w-auto text-center m-auto">
        <n-h1 class="text-4xl md:text-7xl">
          {{ $t('common.successful') }}
        </n-h1>
        <p class="my-4">{{ $t('common.seeYou') }}</p>
        <n-h2 class="text-4xl md:text-4xl">{{ course.name }}</n-h2>
        <div>
          <span
            v-for="slot in course.schedule_slots"
            :key="slot.id"
            class="mr-2"
          >
            <span>
              <strong>{{ $t(`dates.weekdays.short.${slot.weekday}`) }}</strong>
              {{ slot.start.slice(0, -3) }} - {{ slot.end.slice(0, -3) }}
            </span>
          </span>
          <div class="my-1">
            {{ course.schedule_slots[0].instructor }}
          </div>
          <NuxtLink to="/" class="mx-auto text-center block w-3/5">
            <n-button class="text-green-500 w-full" size="large" type="primary">
              {{ $t('common.goHome') }}
            </n-button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div v-else>Course with the given Id is not found</div>
</template>
<script setup lang="ts">
import { NButton, NH1, NH2 } from 'naive-ui'
import { computed } from 'vue'

import { useListsStore } from '../../store/lists'

const listsStore = useListsStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => listsStore.getProductById(courseId.value))
</script>
