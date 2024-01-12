<template>
  <div class="grid grid-cols-3 gap-[36px]">
    <div
      v-for="(item, idx) in items"
      :key="item.id"
      class="flex items-center gap-[24px]"
      :class="{ 'border-gray-300 border-r-[1px]': idx + (1 % 3) !== 0 }"
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
import { PageBlock } from '../../../types'

defineProps<{
  items: PageBlock[]
}>()
</script>
