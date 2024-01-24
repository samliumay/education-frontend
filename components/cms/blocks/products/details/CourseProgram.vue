<template>
  <div class="py-[96px]">
    <h2 class="text-[48px] font-medium mb-[48px] px-10">Программа</h2>

    <template v-for="(item, idx) in items" :key="item.id">
      <AppDivider class="mb-[40px]" :class="{ 'mt-[40px]': idx !== 0 }" />
      <div class="grid  grid-cols-[1fr,160px,1fr] gap-10 px-10">
        <h3 class="text-[28px] font-medium">
          {{ item.title }}
        </h3>

        <img
          :src="item.title_img.meta.download_url"
          :alt="item.title_img.title"
          class="w-[160px]"
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
