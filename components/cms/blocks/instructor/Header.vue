<template>
  <div class="m-10 grid grid-cols-1 lg:grid-cols-3 gap-30 px-3 lg:px-10">
    <div class="hidden lg:block col-span-1 mr-10">
      <ImageBlockById
        :id="blockData?.gallery_images[currentIndex].id"
        class="w-full h-[450px] object-cover rounded-md overflow-hidden aspect-square"
      />
      <n-carousel
        v-model:current-index="currentIndex"
        :space-between="10"
        :loop="false"
        slides-per-view="auto"
        show-arrow
        draggable
        centered-slides
        class="mt-6 pt-14"
      >
        <n-carousel-item
          v-for="item in blockData?.gallery_images || []"
          :key="item.id"
          class="w-[100%] lg:!w-[33%] max-h-[120px] rounded-xl aspect-square"
        >
          <ImageBlockById
            v-if="!!item?.id"
            :id="item.id"
            class="rounded-xl overflow-hidden"
          />
          <p class="mt-1">{{ item.name }}</p>
        </n-carousel-item>

        <template #arrow="{ prev, next }">
          <div
            class="w-[calc(100%)] h-[36px] absolute -top-0 flex justify-end z-50 gap-3"
          >
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
    </div>
    <div class="lg:col-span-2 lg:ml-16">
      <n-breadcrumb>
        <n-breadcrumb-item сlass="text-brand-gray">
          <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">
          <NuxtLink to="/instructors">{{ $t('common.tutors') }}</NuxtLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">
          {{ `${blockData?.name}` }}
        </n-breadcrumb-item>
      </n-breadcrumb>

      <h1
        class="text-[32px] lg:[text-56px] text-brand-red mt-4 lg:mt-12 font-medium"
      >
        {{ `${blockData?.name}` }}
      </h1>
      <h2 class="text-[18px] lg:text-[20px] font-medium mt-3">
        {{ blockData?.speciality }}
      </h2>
      <AppDivider class="my-4 lg:my-9" />
      <p>
        <RichText :html="blockData?.description" without-block-padding />
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NCarousel,
  NCarouselItem,
} from 'naive-ui'
import { ref } from 'vue'

import type { Instructor } from '../../../../types/index'
import AppDivider from '../../../AppDivider.vue'
import ImageBlockById from '../misc/ImageBlockByID.vue'
import RichText from '../misc/RichText.vue'

defineProps<{
  blockData: Instructor
}>()

const currentIndex = ref(0)
</script>
