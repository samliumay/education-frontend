<template>
  <n-breadcrumb class="mt-6 mb-10 px-10">
    <n-breadcrumb-item сlass="text-brand-gray">
      <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item сlass="text-brand-gray">
      {{ $t('schoolOffer.title') }}
    </n-breadcrumb-item>
  </n-breadcrumb>

  <AppModalBackCall
    v-if="isOpenModalBackCall"
    :is-open="isOpenModalBackCall"
    @close="isOpenModalBackCall = false"
  />

  <h1
    class="px-3 sm:px-10 text-[48px] sm:text-[72px] text-brand-red font-semibold mb-6 sm:mb-24"
  >
    {{ $t('schoolOffer.title') }}
  </h1>

  <div class="px-3 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
    <div class="pt-4">
      <h2 class="text-[28px] sm:text-[36px] mb-3 sm:mb-6 font-medium">
        Lorem ipsum dolor sit amet
      </h2>
      <p class="font-medium">
        Lorem ipsum dolor sit amet consectetur. At iaculis egestas vitae
        ultrices velit. Pellentesque ac egestas dignissim diam. Volutpat
        ullamcorper feugiat sit pretium elementum. Risus mauris diam aliquam
        massa luctus rutrum. Maecenas neque auctor sit justo pharetra magna.
      </p>
      <button
        class="rounded-[12px] bg-brand-yellow py-3 px-6 w-full sm:w-auto mt-4"
        @click="isOpenModalBackCall = true"
      >
        {{ $t('schoolOffer.application') }}
      </button>
    </div>
  </div>

  <div class="px-3 sm:px-10">
    <h2
      class="font-semibold text-[48px] sm:text-[72px] uppercase text-center mb-4 sm:mb-12"
    >
      {{ $t('schoolOffer.ourOffer') }}
    </h2>
    <div
      class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 grid grid-cols-1 sm:grid-cols-6"
    >
      <div class="flex items-center col-span-2">
        <h3 class="text-[30px] sm:text-[42px] text-brand-red font-semibold">
          {{ $t('schoolOffer.courseSelect') }}
        </h3>
      </div>

      <div class="col-span-3">
        <div
          v-for="course in courseOptions"
          :key="course.label"
          class="border-[1px] border-black rounded-[48px] py-2 px-3 items-center inline-block mr-2 mb-2 cursor-pointer"
        >
          <div class="w-full h-full flex items-center">
            <img src="/icons/star.svg" alt="Star" class="mr-1" />
            {{ course.label }}
          </div>
        </div>
      </div>

      <div class="flex justify-end items-end">
        <img src="/icons/eyes_star.svg" alt="Star with eyes" class="mr-1" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 mt-3 sm:mt-6 gap-6">
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 relative overflow-hidden"
      >
        <div class="w-full sm:w-3/5 z-10">
          <h3 class="text-[36px] sm:text-[48px] text-brand-red font-semibold">
            {{ $t('schoolOffer.courseSelect') }}
          </h3>
          <p class="font-medium mt-3 sm:mt-6">
            {{ $t('schoolOffer.seminarOffer') }}
          </p>
        </div>
        <img
          src="/icons/children.png"
          alt="Children"
          class="z-0 absolute right-0 top-1/2 -translate-y-1/2"
        />
      </div>

      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 relative overflow-hidden"
      >
        <div class="w-full sm:w-3/5 z-10">
          <h3 class="text-[36px] sm:text-[48px] text-brand-red font-semibold">
            {{ $t('schoolOffer.program') }}
          </h3>
          <p class="font-medium mt-3 sm:mt-6">
            {{ $t('schoolOffer.programOffer') }}
          </p>
        </div>
        <img
          src="/icons/yg_dots.png"
          alt="Dots"
          class="z-0 absolute right-0 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>

    <div
      class="mb-6 sm:mb-24 mt-3 sm:mt-6 rounded-[12px] border-[1px] p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-6"
    >
      <p class="font-semibold text-[20px] col-span-2">
        {{ $t('schoolOffer.questions') }}
        <span class="text-brand-red">{{ $t('schoolOffer.workhours') }}</span>
      </p>
      <div>
        <p class="font-medium text-[20px]">{{ $t('common.info.phone') }}</p>
        <p class="text-[20px] mt-2 text-gray-400">+49 (0)30 71537477</p>
        <p class="text-[20px] mt-2 text-gray-400">+49 (0)30 71537477</p>
      </div>
      <div>
        <p class="font-medium text-[20px]">{{ $t('common.info.mail') }}</p>
        <p class="text-[20px] mt-2 text-gray-400">info@clavis-schule.de</p>
      </div>
    </div>
  </div>

  <!-- <AboutTutors :block-data="instructors" />

  <StudentWorks :block-data="studentWorks" /> -->
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { ref } from 'vue'

import AppModalBackCall from '../components/modals/AppModalBackCall.vue'

// import AboutTutors from '../components/cms/blocks/products/details/AboutTutors.vue'
// import StudentWorks from '../components/cms/blocks/products/details/StudentWorks.vue'

const courseOptions = [
  {
    label: 'Wissenschaftliche Kurse',
    url: '',
  },
  {
    label: 'Kunstdesign',
    url: '',
  },
  {
    label: 'Digital Art',
    url: '',
  },
  {
    label: 'Theater',
    url: '',
  },
  {
    label: 'Sprachkurse',
    url: '',
  },
]

// const instructors: any[] = []
// const studentWorks: any[] = []

const isOpenModalBackCall = ref(false)
</script>
