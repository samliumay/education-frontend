<template>
  <n-carousel show-arrow autoplay data-cms="main-carousel">
    <ImageBlock
      v-for="item in blockData?.value"
      :key="item.photo.id"
      class="w-full h-[560px] object-cover"
      :alt="item.text"
      :image="item.photo"
    />
    <template #arrow="{ prev, next, total, currentIndex }">
      <div
        class="w-full h-full gradient absolute top-0 left-0 z-10 flex flex-col gap-2 justify-end items-center pb-14"
      >
        <p class="text-white text-center">
          {{ currentIndex + 1 }} / {{ total }}
        </p>
        <h1
          class="text-white text-4xl uppercase w-[680px] max-w-full mx-[31px] text-center px-6"
        >
          {{ blockData?.value[currentIndex]?.text }}
        </h1>
      </div>

      <div
        class="absolute flex h-full w-full top-0 left-0 justify-between items-center z-30 px-4"
      >
        <button
          type="button"
          class="cursor-pointer px-2 transition ease-in delay-100 transform active:scale-[0.93]"
          @click="prev"
        >
          <img src="/icons/chevron_left_white.svg" alt="Arrow" />
        </button>
        <button
          type="button"
          class="cursor-pointer px-2 transition ease-in delay-100 transform active:scale-[0.93]"
          @click="next"
        >
          <img
            src="/icons/chevron_left_white.svg"
            alt="Arrow"
            class="transform rotate-180"
          />
        </button>
      </div>
    </template>
    <template #dots="{ total, currentIndex, to }">
      <ul
        class="custom-dots flex w-full justify-center m-0 p-0 absolute bottom-[20px] z-20"
      >
        <li
          v-for="index of total"
          :key="index"
          class="inline-block w-1 h-1 mx-[3px]"
          :class="{ ['is-active']: currentIndex === index - 1 }"
          @click="to(index - 1)"
        />
      </ul>
    </template>
  </n-carousel>
</template>
<script setup lang="ts">
import { NCarousel } from 'naive-ui'

import type { PageBlock } from '../../../../types/cms'
import ImageBlock from '../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock
}>()
</script>
<style scoped>
.custom-dots li {
  cursor: pointer;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition:
    width 0.3s,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-dots li.is-active {
  width: 30px;
  background: #fff;
}

.gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
}
</style>
