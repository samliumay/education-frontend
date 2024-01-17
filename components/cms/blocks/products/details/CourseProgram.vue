<template>
  <div class="py-[96px]">
    <h2 class="text-[48px] font-medium mb-[48px]">Программа</h2>

    <template v-for="(item, idx) in items" :key="item.id">
      <AppDivider class="mb-[40px]" :class="{ 'mt-[40px]': idx !== 0 }" />
      <div class="grid grid-cols-6 gap-[24px] mx-[48px]">
        <h3 class="text-[28px] font-medium">
          {{ item.title }}
        </h3>

        <img
          :src="item.title_img.meta.download_url"
          :alt="item.title_img.title"
        />

        <p class="text-gray-400">
          {{ item.description }}
        </p>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../../types/cms'
import AppDivider from '../../../../AppDivider.vue'

defineProps<{
  items: PageBlock[]
}>()
</script>
