<template>
  <div
    class="px-10 bg-brand-light-gray py-16 relative"
    data-cms="products-details-about-tutors"
  >
    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
    />

    <img src="/icons/tutors.svg" alt="Tutors" class="absolute top-20 left-0" />

    <h2
      class="text-3xl sm:text-4xl md:text-[56px] uppercase font-medium mb-12 relative"
    >
      {{ $t('common.tutors') }}
    </h2>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] relative"
    >
      <template v-for="(item, index) in blockData" :key="item.id">
        <div
          v-if="
            (index - 2) % 9 === 0 ||
            ((index - 5) % 9 === 0 && (index !== 5 || !withAllInstructors))
          "
          class="hidden lg:block"
        />
        <div
          v-if="index - 2 === 9 && hasButton"
          class="hidden lg:flex flex-col rounded-[100%] bg-brand-yellow justify-center items-center"
        >
          <p class="text-4xl font-medium text-center">
            {{ $t('common.allTeachers') }}
          </p>
          <p
            class="text-xl font-medium text-center underline"
            @click="navigateTo('/instructors')"
          >
            {{ $t('common.go') }}
          </p>
        </div>
        <TutorCard
          :instructor="{ ...item.instructor, ...item, id: item?.id ?? 1 }"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import TutorCard from '../../misc/TutorCard.vue'

defineProps<{
  blockData: PageBlock[]
  withAllInstructors: boolean
  hasButton?: boolean
}>()
</script>
