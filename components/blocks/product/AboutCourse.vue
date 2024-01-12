<template>
  <div class="mx-[48px]">
    <h2 class="text-[48px] font-medium mb-[48px]">КАК УСТРОЕН КУРС</h2>

    <div
      v-for="(item, idx) in items"
      :key="item.id"
      class="grid grid-col-2"
      :class="{ 'mb-[48px]': idx + 1 !== items.length }"
    >
      <template v-if="idx % 2 === 0">
        <div class="flex justify-center items-center">
          <img
            :src="item.title_img.meta.download_url"
            :alt="item.title_img.title"
            class="max-w-full"
          />
        </div>

        <div>
          <h3 class="text-[28px] text-red-400 font-medium mb-[24px]">
            {{ item.title }}
          </h3>
          <p class="text-gray-400">
            {{ item.description }}
          </p>
        </div>
      </template>

      <template v-else>
        <div>
          <h3 class="text-[28px] text-red-400 font-medium mb-[24px]">
            {{ item.title }}
          </h3>
          <p class="text-gray-400">
            {{ item.description }}
          </p>
        </div>

        <div class="flex justify-center items-center">
          <img
            :src="item.title_img.meta.download_url"
            :alt="item.title_img.title"
            class="max-w-full"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../types'

defineProps<{
  items: PageBlock[]
}>()
</script>
