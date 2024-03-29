<!-- eslint-disable vue/no-static-inline-styles -->

<template>
  <div class="mx-10 student-works" data-cms="products-details-student-works overflow-x-hidden overflow-y-auto">
    <h2
      class="text-3xl sm:text-4xl md:text-[56px] uppercase font-medium mb-20 lg:mb-14"
    >
      {{ $t('blocks.product.studentWorks') }}
    </h2>
    <n-carousel
      :space-between="10"
      slides-per-view="auto"
      show-arrow
      draggable
      class="w-full"
    >
      <n-carousel-item
        v-for="item in blockData"
        :key="item.id"
        class="w-[100%] lg:!w-[33%]"
      >
        <ImageBlock
          :image="item.icon"
          class="h-[300px] rounded-xl overflow-hidden"
        />
        <p class="mt-1">{{ item.name }}</p>
      </n-carousel-item>

      <template #arrow="{ next, prev }">
        <div class="absolute -top-14 right-0 flex gap-4">
          <button
            type="button"
            class="student-work__arrow-button cursor-pointer p-2 bg-brand-light-gray hover:bg-brand-yellow rounded-full transition ease-in delay-100 transform active:scale-[0.93]"
            @click="prev"
          >
            <img
              src="/icons/chevron_down.svg"
              alt="Arrow"
              class="transform rotate-90 transition ease-in delay-100 active:scale-[0.93]"
            />
          </button>
          <button
            type="button"
            class="student-work__arrow-button cursor-pointer p-2 bg-brand-light-gray hover:bg-brand-yellow rounded-full transition ease-in delay-100 transform active:scale-[0.93]"
            @click="next"
          >
            <img
              src="/icons/chevron_down.svg"
              alt="Arrow"
              class="transform -rotate-90 transition ease-in delay-100 active:scale-[0.93]"
            />
          </button>
        </div>
      </template>
    </n-carousel>
  </div>
</template>
<script setup lang="ts">
import { NCarousel, NCarouselItem } from 'naive-ui'

import type { PageBlock } from '../../../../../types/cms'
import ImageBlock from '../../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
<style>
.student-work__arrow-button:hover > img {
  filter: brightness(0.1);
}
</style>
