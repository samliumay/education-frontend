<!-- eslint-disable vue/no-static-inline-styles -->

<template>
  <div class="mx-10 student-works" data-cms="products-details-student-works">
    <h2
      class="text-3xl sm:text-4xl md:text-5xl uppercase font-medium mb-20 lg:mb-14"
    >
      {{ $t('blocks.product.studentWorks') }}
    </h2>
    <n-carousel
      :space-between="10"
      :current-index="currentIndex"
      :loop="false"
      slides-per-view="auto"
      show-arrow
    >
      <n-carousel-item
        v-for="item in blockData"
        :key="item.id"
        style="width: fit-content"
      >
        <ImageBlock
          :image="item.icon"
          class="h-[300px] rounded-xl overflow-hidden"
        />
        <p class="mt-1">{{ item.name }}</p>
      </n-carousel-item>

      <template #arrow>
        <div class="absolute -top-14 right-0 flex gap-4">
          <button
            type="button"
            class="student-work__arrow-button cursor-pointer p-2 bg-brand-light-gray hover:bg-brand-yellow rounded-full transition ease-in delay-100 transform active:scale-[0.93]"
            @click="next"
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
            @click="prev"
          >
            <img
              src="/icons/chevron_down.svg"
              alt="Arrow"
              class="transform -rotate-90 transition ease-in delay-100 active:scale-[0.93]"
            />
          </button>
        </div>
      </template>

      <template #dots="{ total, currentIndex, to }">
        <ul class="hidden">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>
<script setup lang="ts">
import { NCarousel, NCarouselItem } from 'naive-ui'
import { ref } from 'vue'

import type { PageBlock } from '../../../../../types/cms'
import ImageBlock from '../../misc/ImageBlock.vue'

const props = defineProps<{
  blockData: PageBlock[]
}>()

const currentIndex = ref(0)

const next = () => {
  if (props.blockData.length - currentIndex.value < props.blockData.length) {
    currentIndex.value++
  }
}

const prev = () => {
  if (currentIndex.value > -props.blockData.length + 1) {
    currentIndex.value--
  }
}
</script>
<style>
.student-work__arrow-button:hover > img {
  filter: brightness(0.1);
}
</style>
