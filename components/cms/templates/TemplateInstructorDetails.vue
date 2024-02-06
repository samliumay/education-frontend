<template>
  <div v-if="pending" class="my-20 flex justify-center">
    <AppLoader />
  </div>
  <main v-else class="flex flex-col gap-2 mb-10">
    <n-breadcrumb class="mt-6 mb-10 px-10">
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        <NuxtLink to="/instructors">{{ $t('common.tutors') }}</NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item сlass="text-brand-gray">
        {{ `${instructor?.first_name} ${instructor?.last_name}` }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <div class="flex flex-col gap-10">
      <ErrorBoundaryBlock v-for="(block, index) in blocksList" :key="index">
        <component
          :is="block.name"
          v-if="checkIsEmpty(block.blockData)"
          :block-data="block.blockData"
        />
      </ErrorBoundaryBlock>
    </div>
  </main>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { checkIsEmpty } from '../../../utils/checkIsEmpty'
import AppLoader from '../../AppLoader.vue'
import Courses from '../blocks/instructor/Courses.vue'
import Header from '../blocks/instructor/Header.vue'
import Video from '../blocks/instructor/Video.vue'
import ErrorBoundaryBlock from '../blocks/misc/ErrorBoundaryBlock.vue'
import StudentWorks from '../blocks/products/details/StudentWorks.vue'

// Init template
const props = defineProps<{
  head?: { title: string; description: string }
}>()

const head = computed(() => props.head)
useHead({
  title: head.value?.title || 'Clavis',
  meta: [
    {
      name: 'description',
      content: head.value?.description || 'Clavis website page',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})

// Store
const route = useRoute()

// API
const { data: instructor, pending } = await useFetch(
  `https://api.clavis.the-o.co/api/v2/wagtail/products/${route.params.id}/?fields=*`,
  { deep: true },
)

// Components for render
const blocksList = computed(() => [
  { name: Header, blockData: instructor.value },
  { name: Courses, blockData: instructor.value?.courses },
  { name: StudentWorks, blockData: instructor.value?.student_works },
  { name: Video, blockData: instructor.value?.video?.url },
])
</script>
