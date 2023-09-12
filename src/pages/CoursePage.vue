<template>
  <div v-if="course">
    <n-breadcrumb>
      <n-breadcrumb-item href="/">
        {{ $t('common.catalog') }}
      </n-breadcrumb-item>
      <n-breadcrumb-item>{{ course.name }}</n-breadcrumb-item>
    </n-breadcrumb>
    <n-h1>{{ course.name }}</n-h1>
    <n-button
      class="text-green-500"
      size="large"
      type="primary"
    >
      Buy
    </n-button>
    <p>{{ course?.description }}</p>
    <n-h2>{{ $t('slots.slots') }} ({{ course.schedule_slots.length }})</n-h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 grid-flow-col gap-4"
    >
      <AppSlotCard
        v-for="slot in course.schedule_slots"
        :key="slot.id"
        :slot-value="slot"
      />
    </div>
  </div>
  <div v-else> Course with the given Id is not found </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NButton, NH1, NH2 } from 'naive-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppSlotCard from '@/components/AppSlotCard.vue'
import { useListsStore } from '@/store/lists'

const listsStore = useListsStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => listsStore.getProductById(courseId.value))
</script>
