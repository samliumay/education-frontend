<template>
  <div class="relative px-3 py-4 sm:px-12 sm:py-24">
    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
    />

    <h1 class="relative text-[32px] sm:text-[48px] font-medium">
      {{ $t('common.tutors') }}
    </h1>

    <LoaderBlock v-if="pending" class="relative" />
    <div v-else class="flex relative w-full h-full overflow-hidden">
      <img class="absolute top-20" src="/icons/tutors-bg.svg" alt="tutors" />
      <div
        class="w-full h-full relative mt-4 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
      >
        <template
          v-for="(instructor, index) in instructors.items"
          :key="instructor.name"
        >
          <div
            v-if="(index - 2) % 9 === 0 || (index - 5) % 9 === 0"
            class="hidden lg:block"
          />
          <TutorCard :instructor="instructorConverter(instructor)" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getApiAddress } from '@/utils/getApiAddress'

import LoaderBlock from '../components/cms/blocks/misc/LoaderBlock.vue'
import TutorCard from '../components/cms/blocks/misc/TutorCard.vue'

// API
const { data: instructors, pending } = useFetch(
  getApiAddress(`/api/v2/wagtail/instructors/`),
  { deep: true },
)

const instructorConverter = wrongInstructor => {
  const name = wrongInstructor.name.split(' ')

  return {
    first_name: name[0],
    last_name: name[1],
    subject: wrongInstructor.speciality,
    profile_pic: wrongInstructor?.title_image?.id,
    id: wrongInstructor.id,
  }
}
</script>
