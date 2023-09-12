<template>
  <div v-if="course">
    <n-breadcrumb>
      <n-breadcrumb-item href="/">
        {{ $t('common.catalog') }}
      </n-breadcrumb-item>
      <n-breadcrumb-item>{{ course.name }}</n-breadcrumb-item>
    </n-breadcrumb>
    <n-h1>{{ course.name }}</n-h1>
    <router-link :to="`/buy/${course.id}`">
      <n-button
        class="text-green-500"
        size="large"
        type="primary"
      >
        Buy
      </n-button>
    </router-link>
    <p>{{ course?.description }}</p>
  </div>
  <div v-else> Course with the given Id is not found </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NButton, NH1 } from 'naive-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useListsStore } from '@/store/lists'

const listsStore = useListsStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => listsStore.getProductById(courseId.value))
</script>
