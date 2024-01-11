<template>
  <div class="mx-[48px]">
    <h2 class="text-[48px] font-medium mb-[48px]">
      Für verschiedene <br />
      Altersgruppen
    </h2>

    <div
      v-for="(item, idx) in items"
      :key="item.id"
      class="grid grid-cols-4 ml-[96px] border-y-[1px] border-black"
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

      <div class="flex-inline gap-[12px]">
        <a
          v-for="option in item.options"
          :key="option.id"
          class="rounded-[48px] py-[8px] px-[12px] font-medium text-gray-400"
          :href="option.title_url"
        >
          {{ option.title }}
        </a>
      </div>

      <div class="flex justify-center items-center">
        <img
          :src="item.title_img.meta.download_url"
          :alt="item.title_img.title"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type PageBlock } from "../../../types"

defineProps<{
  items: PageBlock[];
}>()
</script>
