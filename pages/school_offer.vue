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
    class="px-3 lg:px-10 text-[48px] lg:text-[72px] text-brand-red font-semibold mb-6"
  >
    {{ $t('schoolOffer.title') }}
  </h1>

  <div class="flex flex-col mb-24 px-3 lg:px-10">
    <div class="pt-4">
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="order-2 flex flex-col gap-4 lg:order-1">
          <h2 class="text-[28px] lg:text-[36px] mb-3 lg:mb-6 font-medium">
            Lorem ipsum dolor sit amet
          </h2>
          <p class="font-medium">
            Lorem ipsum dolor sit amet consectetur. At iaculis egestas vitae
            ultrices velit. Pellentesque ac egestas dignissim diam. Volutpat
            ullamcorper feugiat sit pretium elementum. Risus mauris diam aliquam
            massa luctus rutrum. Maecenas neque auctor sit justo pharetra magna.
          </p>
          <button
            class="rounded-[12px] bg-brand-yellow py-3 px-6 w-full lg:w-auto mt-4"
            @click="isOpenModalBackCall = true"
          >
            {{ $t('schoolOffer.application') }}
          </button>
        </div>

        <img
          class="w-full h-[350px] lg:max-w-[48%] lg:h-full rounded-md order-1"
          src="/images/products/cover_1.jpg"
          alt="image example"
        />
      </div>
    </div>
  </div>

  <div class="px-3 lg:px-10">
    <h2
      class="font-semibold text-[48px] lg:text-[72px] uppercase text-center mb-4 lg:mb-12"
    >
      {{ $t('schoolOffer.ourOffer') }}
    </h2>
    <div
      class="bg-brand-light-gray rounded-[12px] p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-6"
    >
      <div class="flex items-center col-span-2">
        <h3 class="text-[30px] lg:text-[42px] text-brand-red font-semibold">
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

      <div class="flex items-start lg:justify-end lg:items-end">
        <img src="/icons/eyes_star.svg" alt="Star with eyes" class="mr-1" />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 mt-3 lg:mt-6 gap-6">
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 lg:p-6 relative overflow-hidden"
      >
        <img
          src="/icons/children.png"
          alt="Children"
          class="z-0 absolute right-0 top-1/2 -translate-y-1/2 max-h-[70%] mr-3 hidden sm:block"
        />
        <div class="relative w-full sm:w-3/5 z-10">
          <h3 class="text-[36px] lg:text-[48px] text-brand-red font-semibold">
            {{ $t('schoolOffer.courseSelect') }}
          </h3>
          <p class="font-medium mt-3 lg:mt-6">
            {{ $t('schoolOffer.seminarOffer') }}
          </p>
        </div>
      </div>

      <div
        class="bg-brand-light-gray rounded-[12px] p-3 lg:p-6 relative overflow-hidden"
      >
        <img
          src="/icons/yg_dots.png"
          alt="Dots"
          class="z-0 absolute right-0 top-1/2 -translate-y-1/2 max-h-[70%] mr-3 hidden sm:block"
        />
        <div class="relative w-full sm:w-3/5 z-10">
          <h3 class="text-[36px] lg:text-[48px] text-brand-red font-semibold">
            {{ $t('schoolOffer.program') }}
          </h3>
          <p class="font-medium mt-3 lg:mt-6">
            {{ $t('schoolOffer.programOffer') }}
          </p>
        </div>
      </div>
    </div>

    <ContactsBlock />
  </div>

  <!-- <AboutTutors :block-data="instructors" />

  <StudentWorks :block-data="studentWorks" /> -->
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { ref } from 'vue'

import ContactsBlock from '@/components/misc/ContactsBlock.vue'

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
