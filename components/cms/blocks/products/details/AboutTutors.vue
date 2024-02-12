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
      class="text-3xl sm:text-4xl md:text-5xl uppercase font-medium mb-12 relative"
    >
      {{ $t('common.tutors') }}
    </h2>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] relative"
    >
      <TutorCard
        v-for="item in blockData"
        :key="item.id"
        :instructor="{ ...item.instructor, id: item?.id ?? 1 }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import TutorCard from '../../misc/TutorCard.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
