<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-[36px]">
    <div
      v-for="item in items"
      :key="item.id"
      class="flex items-center gap-[24px] pb-[24px] sm:pb-0 border-gray-300 border-b-[1px] sm:border-b-0 sm:border-r-[1px] last:border-0"
    >
      <p class="text-[64px] font-semibold">
        {{ item.title }}
      </p>
      <p class="text-gray-400">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  items: PageBlock[]
}>()
</script>
