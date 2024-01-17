<template>
  <div class="grid grid-cols-3 gap-[36px]">
    <div
      v-for="item in items"
      :key="item.id"
      class="flex items-center gap-[24px] border-gray-300 border-r-[1px] last:border-0"
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
