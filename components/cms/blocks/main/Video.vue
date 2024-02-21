<template>
  <div
    class="block-padding lg:mx-[140px] flex flex-col gap-10"
    data-cms="main-video"
  >
    <div class="flex flex-col lg:flex-row justify-between gap-2 items-stretch">
      <h2 class="text-4xl font-medium text-brand-red sm:w-5/12">
        {{ blockData.value.title }}
      </h2>
      <div class="w-[1px] bg-brand-gray invisible sm:visible" />
      <p
        class="font-medium text-base xl:text-lg text-brand-black lg:self-center lg:w-5/12"
      >
        {{ blockData.value.description }}
      </p>
    </div>

    <div class="w-full h-[520px] rounded-lg overflow-hidden">
      <iframe
        :src="blockData.value.video_url"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="object-cover w-full h-full"
      />
    </div>

    <div class="flex flex-col lg:flex-row gap-4 justify-between">
      <div
        v-for="option in blockData.value.bullet_points"
        :key="option"
        class="flex gap-2 items-start"
      >
        <img src="/icons/star.svg" alt="Star" class="w-[20px] h-[20px]" />
        <p>{{ option }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
