<template>
  <div>
    <h2 class="text-5xl sm:w-7/12 font-medium mb-12 mx-[28px] md:mx-[48px]">
      Für verschiedene
      Altersgruppen
    </h2>

    <div
      v-for="(item, idx) in items"
      :key="item.id"
      class="grid grid-cols-3 border-y-[1px] border-black px-[28px] md:px-[48px] py-4 gap-2"
      :class="{ 'relative -top-[1px]': idx !== 0 }"
    >
      <div class="flex flex-col">
        <p class="text-red-400 text-[36px] font-medium mb-[32px]">
          {{ item.title }}
        </p>

        <p class="text-gray-400">
          {{ item.description }}
        </p>
      </div>

      <div class="flex justify-center gap-4">
        <a
          v-for="link in item.options"
          :key="link.id"
          class="rounded-[48px] py-1 px-3 font-medium text-brand-gray border-[1px] border-brand-gray h-fit flex gap-2 items-center"
          :href="link.title_url"
        >
          <p>{{ link.title }}</p>
          <img class="transform -rotate-90" src="/icons/chevron_down.svg" alt="Arrow" />
        </a>
      </div>

      <div class="flex justify-center items-center">
        <img
          :src="item.title_img.meta.download_url"
          :alt="item.title_img.title"
          class="max-h-[160px]"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  items: PageBlock[]
}>()
</script>
