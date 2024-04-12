<!-- eslint-disable vue/no-static-inline-styles -->

<template>
  <div class="m-10 product" data-cms="main-product-carousel">
    <AppHeading>
      {{ blockData.value[0].title || blockData.value[0].name }}
    </AppHeading>
    <n-carousel
      v-if="blockData.value[0].cards.length > 0"
      :space-between="20"
      :loop="false"
      slides-per-view="auto"
      draggable
      show-arrow
    >
      <n-carousel-item
        v-for="item in blockData.value[0].cards"
        :key="item.id"
        class="w-[100%] lg:!w-[33%]"
      >
        <ProductCard
          class="h-full"
          :block-data="item"
          :is-green-text="blockData.value[0].catalog_link.includes('workshops')"
        />
      </n-carousel-item>

      <template #arrow="{ prev, next }">
        <div class="absolute right-0 -top-14 flex gap-4 product-carousel">
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
    <AppNotFound v-else />
  </div>
</template>
<script setup lang="ts">
import { NCarousel, NCarouselItem } from 'naive-ui'
import { onMounted, ref } from 'vue'

import AppHeading from '@/components/AppHeading.vue'

import type { PageBlock } from '../../../../types/cms'
import AppNotFound from '../../../AppNotFound.vue'
import ProductCard from '../products/ProductCard.vue'

defineProps<{
  blockData: PageBlock
}>()

const carouselHeight = ref<number | null>(null)

onMounted(() => {
  if (process.client) {
    setTimeout(() => {
      const carousel = document.querySelector('.product .product-carousel')
      if (carousel) {
        const rect = carousel.getBoundingClientRect()
        carouselHeight.value = Math.round(rect.height)
      }
    }, 1000)
  }
})
</script>
<style>
.product .n-carousel {
  overflow: visible;
}

.product__arrow-button:hover > img {
  filter: brightness(0.1);
}

.product .n-carousel .n-carousel__slides .n-carousel__slide {
  height: auto;
}
</style>
