<template>
  <div class="px-10 bg-brand-light-gray py-16 relative overflow-hidden">
    <img src="/icons/tutors.svg" alt="Tutors" class="absolute top-20 left-0" />

    <h2 class="text-5xl uppercase font-medium mb-12 relative">Преподаватели</h2>

    <div class="grid grid-cols-3 gap-[24px] relative">
      <TutorCard v-for="item in blockData" :key="item.id" :tutor="item" />
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
