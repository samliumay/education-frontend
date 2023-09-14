<template>
  <div v-if="course">
    <div class="w-full bg-gray-200 rounded-xl min-h-[50vh] relative">
      <div class="centered w-4/5 md:w-auto">
        <n-h1 class="text-4xl md:text-6xl text-center">{{ course.name }}</n-h1>

        <div class="my-4 text-center">
          <div>
            <span
              v-for="slot in course.schedule_slots"
              :key="slot.id"
              class="mr-2"
            >
              <span>
                <strong>{{
                  $t(`dates.weekdays.short.${slot.weekday}`)
                }}</strong>
                {{ slot.start.slice(0, -3) }} - {{ slot.end.slice(0, -3) }}
              </span>
            </span>
          </div>

          <div class="my-1">
            {{ course.schedule_slots[0].instructor }}
          </div>
        </div>

        <router-link
          :to="`/buy/${course.id}`"
          class="mx-auto text-center block"
        >
          <n-button
            class="text-green-500 w-full"
            size="large"
            type="primary"
          >
            {{ $t('common.buy') }}
          </n-button>
        </router-link>
      </div>
    </div>

    <p class="text-lg mt-10 my-4 md:w-2/3 mx-auto">{{ course?.description }}</p>
  </div>

  <div v-else> Course with the given Id is not found </div>
</template>
<script setup lang="ts">
import { NButton, NH1 } from 'naive-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useListsStore } from '@/store/lists'

const listsStore = useListsStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => listsStore.getProductById(courseId.value))
</script>
<style scoped lang="scss">
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
