<template>
  <div class="mx-[48px] my-[96px]">
    <h2 class="text-[48px] mb-[48px] font-medium">Преподаватели</h2>

    <div class="grid grid-cols-3 gap-[24px]">
      <TutorCard v-for="item in items" :key="item.id" :tutor="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import TutorCard from '../../misc/TutorCard.vue'

defineProps<{
  items: PageBlock[]
}>()
</script>
