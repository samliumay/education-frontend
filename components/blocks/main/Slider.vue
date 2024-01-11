<template>
  <div class="aspect-video">
    <img
      class="object-fit"
      :src="items[currentIndex].title_img.meta.download_url"
      :alt="items[currentIndex].title_img.title"
    />

    <div
      class="flex flex-col h-full w-full justify-end items-center text-white"
    >
      <p class="font-medium text-[20px]">{{ items[currentIndex].date }}</p>
      <p class="font-medium text-[48px] mt-[12px] mb-[24px]">
        {{ items[currentIndex].title }}
      </p>
      <div class="flex gap-[8px]">
        <div
          v-for="index in items.length"
          :key="index"
          class="w-[4px] bg-white rounded-[8px]"
          :class="{
            'w-[4px]': currentIndex !== index,
            'w-[64px]': currentIndex === index,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

import { PageBlock } from "../../../types"

defineProps<{
  items: PageBlock;
}>()

const currentIndex = ref(0)
</script>
