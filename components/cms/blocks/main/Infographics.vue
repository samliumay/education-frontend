<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-4 mb-10 block-padding-x"
    data-cms="main-infographics"
  >
    <div
      v-for="item in blockData.value"
      :key="item.id"
      class="flex items-center gap-[24px] pb-[24px] lg:pb-0 border-gray-300 border-b-[1px] lg:border-b-0 lg:border-r-[1px] last:border-0"
    >
      <p class="text-6xl xl:text-7xl font-bold">
        {{ item.big_text }}
      </p>
      <p class="text-brand-gray font-medium text-base xl:text-lg">
        {{ item.small_text }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
