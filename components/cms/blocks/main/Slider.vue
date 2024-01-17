<template>
  <n-carousel show-arrow autoplay>
    <img
      v-for="item in items"
      :key="item.id"
      class="w-full h-[540px] object-cover"
      :alt="item.title"
      :src="item.title_img.meta.download_url"
    />
    <template #arrow="{ prev, next }">
      <div class="absolute flex h-full w-full top-0 left-0 justify-between items-center z-10 px-4">
        <button type="button" class="cursor-pointer px-2 transform active:scale-95" @click="prev">
          <img src="/icons/chevron_left_white.svg" alt="Arrow" />
        </button>
        <button type="button" class="cursor-pointer px-2" @click="next">
          <img src="/icons/chevron_left_white.svg" alt="Arrow" class="transform rotate-180" />
        </button>
      </div>
    </template>
    <template #dots="{ total, currentIndex, to }">
      <ul
        class="custom-dots flex w-full justify-center m-0 p-0 absolute z-20 bottom-[20px]"
      >
        <li
          v-for="index of total"
          :key="index"
          class="inline-block w-2 h-2 mx-[3px]"
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

defineProps<{
  items: PageBlock[]
}>()
</script>
<style scoped>.custom-dots li {
  cursor: pointer;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition:
    width 0.3s,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-dots li.is-active {
  width: 50px;
  background: #fff;
}
</style>
