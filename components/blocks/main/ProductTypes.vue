<template>
  <div class="mx-[48px]">
    <h2 class="w-full sm:w-1/2 text-[48px] font-medium mb-[48px]">
      Unsere Kursangebote für Kinder und Jugendliche
    </h2>

    <div class="grid grid-cols-3 gap-[24px]">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-gray-300 p-[24px] rounded-[12px]"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-[48px] text-red-400 font-medium">
            {{ item.title }}
          </h3>
          <img src="../../../assets/icons/chevron_left.svg" alt="Arrow" />
        </div>

        <div class="border-t-[1px] border-red-300 mt-[24px] mb-[16px]" />

        <p class="text-gray-400 mb-[16px]">
          {{ item.description }}
        </p>

        <img
          :src="item.title_img.meta.download_url"
          :alt="item.title_img.title"
          class="w-full rounded-[12px] aspect-square"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PageBlock } from '../../../types'

defineProps<{
  items: PageBlock[]
}>()
</script>
