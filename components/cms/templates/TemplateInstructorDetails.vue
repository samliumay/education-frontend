<template>
  <LoaderBlock v-if="pending" />
  <main v-else class="flex flex-col gap-2 mb-10">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { getApiAddress } from '@/utils/getApiAddress'

import { checkIsEmpty } from '../../../utils/checkIsEmpty'
import Courses from '../blocks/instructor/Courses.vue'
import Header from '../blocks/instructor/Header.vue'
import Video from '../blocks/instructor/Video.vue'
import ErrorBoundaryBlock from '../blocks/misc/ErrorBoundaryBlock.vue'
import LoaderBlock from '../blocks/misc/LoaderBlock.vue'
import StudentWorks from '../blocks/instructor/StudentWorks.vue'

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

// Init hooks
const { t } = useI18n()

// Store
const route = useRoute()

// API
const { data: instructor, pending } = await useFetch(
  getApiAddress(`/api/v2/wagtail/instructors/${route.params.id}/`),
  { deep: true },
)

const courses = computed(() => {
  if (!pending.value) {
    return instructor.value.body.find(block => block.type === 'teaches_in')
      .value
  }

  return {
    heading: t('blocks.tutorCourses'),
    cards: [],
  }
})

const studentWorks = computed(() => {
  if (!pending.value) {
    return instructor.value.body.find(block => block.type === 'art_block').value
  }

  return {
    heading: null,
    cards: [],
  }
})
console.debug('studentWorks:', studentWorks.value)

const video = computed(() => {
  if (!pending.value) {
    return instructor.value.body.find(block => block.type === 'video_block')
      .value
  }

  return {
    title: null,
    video_url: '',
  }
})

// Components for render
const blocksList = computed(() => [
  { name: Header, blockData: instructor.value },
  { name: Courses, blockData: courses.value },
  { name: StudentWorks, blockData: studentWorks.value },
  { name: Video, blockData: video.value },
])
</script>
