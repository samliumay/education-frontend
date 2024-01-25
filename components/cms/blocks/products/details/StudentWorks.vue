<template>
  <div class="mx-10">
    <h2 class="text-5xl uppercase font-medium mb-12">Работы учеников</h2>
    <n-carousel
      :space-between="10"
      :loop="false"
      slides-per-view="auto"
      draggable
      show-arrow
    >
      <n-carousel-item style="width: 30%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item style="width: 20%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item style="width: 30%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item style="width: 40%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item style="width: 30%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item style="width: 20%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item style="width: 30%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
      </n-carousel-item>
      <n-carousel-item style="width: 40%">
        <img
          alt="carousel"
          class="w-full object-cover h-[440px] rounded-xl"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </n-carousel-item>

      <template #arrow="{ prev, next }">
        <div
          class="w-full h-full absolute top-0 left-0 z-10 flex flex-col gap-2 justify-end items-center pb-14"
        >
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
        </div>
      </template>

      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
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

// import type { PageBlock } from '../../../../../types/cms'

// defineProps<{
//   items: PageBlock[]
// }>()
</script>
<style scoped>
.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition:
    width 0.3s,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
