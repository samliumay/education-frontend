<!-- eslint-disable vuejs-accessibility/alt-text -->
<template>
  <div
    class="bg-brand-green px-3 md:px-10 relative overflow-hidden text-white pb-6 md:pb-[96px] overflow-hidden"
  >
    <img
      src="/icons/aboutus/header_arcs.svg"
      alt="Arcs"
      class="absolute bottom-0 left-1/2 -translate-x-1/2 md:-translate-x-full translate-y-1/4"
    />

    <div class="relative mt-6 mb-10">
      <n-breadcrumb>
        <n-breadcrumb-item сlass="text-brand-gray">
          <NuxtLink to="/">{{ $t('common.main') }} / </NuxtLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item сlass="text-brand-gray">
          {{ $t('common.aboutUs') }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>

    <!-- Header -->
    <h1 class="relative text-[48px] md:text-[72px] leading-tight">
      {{ $t('aboutUs.title') }}
    </h1>

    <div class="relative w-full mt-20 mb-14 md:mt-0 md:mb-0 md:pl-[50%]">
      <p>
        {{ $t('aboutUs.subtitle') }}
      </p>
    </div>
  </div>

  <!-- About us -->
  <h2
    class="flex items-center justify-center text-center text-brand-red font-medium text-[28px] md:text-[36px] mt-8 md:mt-36 px-3 md:px-10"
  >
    {{ $t('aboutUs.target') }}
  </h2>

  <!-- Offers -->
  <div class="px-3 md:px-10 mt-6 md:mt-24 mb-10">
    <h2 class="font-semibold text-[36px] md:text-[56px] mb-[48px]">
      {{ $t('aboutUs.offers.title') }}
    </h2>

    <div class="flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex justify-center items-center">
          <img src="/icons/aboutus/pen.svg" alt="Pen" />
        </div>
        <div>
          <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
            {{ $t('aboutUs.offers.first.title') }}
          </h3>
          <h4 class="text-gray-500 font-medium mb-1">
            {{ $t('aboutUs.offers.first.subtitle1') }}
          </h4>
          <p class="text-gray-400">
            {{ $t('aboutUs.offers.first.text1') }}
          </p>
          <h4 class="text-gray-500 font-medium mb-1">
            {{ $t('aboutUs.offers.first.subtitle2') }}
          </h4>
          <p class="text-gray-400">
            {{ $t('aboutUs.offers.first.text2') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex justify-center items-center md:order-2">
          <img src="/icons/aboutus/stars.svg" alt="Stars" />
        </div>
        <div>
          <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
            {{ $t('aboutUs.offers.second.title') }}
          </h3>
          <h4 class="text-gray-500 font-medium mb-1">
            {{ $t('aboutUs.offers.second.subtitle1') }}
          </h4>
          <p class="text-gray-400">
            {{ $t('aboutUs.offers.second.text1') }}
          </p>
          <h4 class="text-gray-500 font-medium mb-1">
            {{ $t('aboutUs.offers.second.subtitle2') }}
          </h4>
          <p class="text-gray-400">
            {{ $t('aboutUs.offers.second.text2') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex justify-center items-center">
          <img src="/icons/aboutus/book.svg" alt="Book" />
        </div>
        <div>
          <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
            {{ $t('aboutUs.offers.third.title') }}
          </h3>
          <h4 class="text-gray-500 font-medium mb-1">
            {{ $t('aboutUs.offers.third.subtitle1') }}
          </h4>
          <p class="text-gray-400">
            {{ $t('aboutUs.offers.third.text1') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex justify-center items-center md:order-2">
          <img src="/icons/aboutus/planet.svg" alt="Planet" />
        </div>
        <div>
          <h3 class="text-brand-red text-[28px] sm:text-[36px] mb-6">
            {{ $t('aboutUs.offers.fourth.title') }}
          </h3>
          <h4 class="text-gray-500 font-medium mb-1">
            {{ $t('aboutUs.offers.fourth.subtitle1') }}
          </h4>
          <p class="text-gray-400">
            {{ $t('aboutUs.offers.fourth.text1') }}
          </p>
          <h4 class="text-gray-500 font-medium mb-1">
            {{ $t('aboutUs.offers.fourth.subtitle2') }}
          </h4>
          <p class="text-gray-400">
            {{ $t('aboutUs.offers.fourth.text2') }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Principles -->
  <div
    class="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-2 mt-8 mb-10 mx-3 md:mx-10"
  >
    <div>
      <h2 class="font-semibold text-[36px] md:text-[56px] mb-[48px] md:ml-10">
        {{ $t('aboutUs.principles.title') }}
      </h2>
      <img class="block ml-2" src="/icons/aboutus/dots.svg" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:pr-2">
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/heart.svg" alt="Heart" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          {{ $t('aboutUs.principles.item1') }}
        </p>
      </div>
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/key.svg" alt="Key" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          {{ $t('aboutUs.principles.item2') }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:pl-10">
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/books.svg" alt="Books" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          {{ $t('aboutUs.principles.item3') }}
        </p>
      </div>
      <div class="rounded-[12px] bg-brand-light-gray p-4">
        <div class="flex items-center justify-center aspect-square">
          <img src="/icons/aboutus/star.svg" alt="Star" />
        </div>

        <AppDivider class="my-4 px-4" />

        <p class="font-semibold">
          {{ $t('aboutUs.principles.item4') }}
        </p>
      </div>
    </div>

    <div class="relative py-32 md:py-0">
      <img
        class="absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 z-0"
        alt="Border"
        src="/icons/aboutus/border.svg"
      />
      <div
        class="md:absolute top-1/2 left-1/2 w-full md:-translate-x-1/2 md:-translate-y-1/2 z-10 flex flex-col items-center justify-center gap-6"
      >
        <img src="/icons/aboutus/quotes.svg" alt="Quotes" />
        <p class="font-semibold text-[20px] md:text-[24px] w-3/5">
          {{ $t('aboutUs.principles.quote.text') }}
        </p>
        <p class="text-gray-400">{{ $t('aboutUs.principles.quote.author') }}</p>
      </div>
    </div>
  </div>

  <!-- Approach -->
  <div
    class="flex flex-col gap-6 lg:gap-0 lg:flex-row aspect-square mx-10 relative mt-3 lg:mt-10"
  >
    <h2
      class="lg:order-10 lg:text-[56px] lg:absolute lg:-translate-y-1/2 lg:-translate-x-1/2 font-semibold text-[36px] top-1/2 left-1/2"
    >
      {{ $t('aboutUs.approach.title') }}
    </h2>

    <div
      class="hidden lg:block border-[1px] border-brand-red rounded-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full border-dashed absolute z-0"
    />
    <div
      class="lg:-translate-y-1/4 lg:absolute z-10 top-1/4 rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] lg:text-[24px] ml-1">
          {{ $t('aboutUs.approach.item1.title') }}
        </span>
      </p>
      <p class="mt-4 text-[18px]">
        {{ $t('aboutUs.approach.item1.text') }}
      </p>
    </div>

    <div
      class="lg:absolute lg:-translate-y-1/4 z-10 top-1/4 right-0 rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] lg:text-[24px] ml-1">
          {{ $t('aboutUs.approach.item2.title') }}
        </span>
      </p>
      <p class="mt-4 text-[18px]">{{ $t('aboutUs.approach.item2.text') }}</p>
    </div>

    <div
      class="lg:translate-y-1/4 lg:absolute z-10 bottom-1/4 rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] lg:text-[24px] ml-1">
          {{ $t('aboutUs.approach.item3.title') }}
        </span>
      </p>
      <p class="mt-4 text-[18px]">
        {{ $t('aboutUs.approach.item3.text') }}
      </p>
    </div>

    <div
      class="lg:translate-y-1/4 lg:absolute z-10 bottom-1/4 right-0 rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] lg:text-[24px] ml-1">
          {{ $t('aboutUs.approach.item3.title') }}
        </span>
      </p>
      <p class="mt-4 text-[18px]">
        {{ $t('aboutUs.approach.item3.text') }}
      </p>
    </div>

    <div
      class="lg:-translate-x-1/2 lg:absolute lg:translate-y-1/2 z-10 bottom-0 left-1/2 rounded-[12px] bg-brand-light-gray p-6"
    >
      <p class="flex items-center">
        <img src="/icons/star.svg" alt="Star" />
        <span class="text-brand-red text-[20px] lg:text-[24px] ml-1">
          {{ $t('aboutUs.approach.item4.title') }}
        </span>
      </p>
      <p class="mt-4 text-[18px]">{{ $t('aboutUs.approach.item4.text') }}</p>
    </div>
  </div>

  <!-- Values -->
  <div class="mt-24 bg-brand-light-gray pt-12 pb-8">
    <h2
      class="font-semibold text-[36px] md:text-[56px] mb-[48px] px-3 md:px-10"
    >
      {{ $t('aboutUs.values.title') }}
    </h2>

    <AppDivider class="mb-12" />

    <div class="grid grid-cols-1 md:grid-cols-3 px-3 md:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] md:text-[36px]">
        {{ $t('aboutUs.values.item1.title') }}
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          {{ $t('aboutUs.values.item1.subtitle1') }}
        </h4>
        <p class="text-gray-400 mb-1">
          {{ $t('aboutUs.values.item1.text1') }}
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          {{ $t('aboutUs.values.item1.subtitle2') }}
        </h4>
        <p class="text-gray-400 mb-1">
          {{ $t('aboutUs.values.item1.text2') }}
        </p>
      </div>
    </div>

    <AppDivider class="mb-12 mt-12" />

    <div class="grid grid-cols-1 md:grid-cols-3 px-3 md:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] md:text-[36px]">
        {{ $t('aboutUs.values.item2.title') }}
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          {{ $t('aboutUs.values.item2.subtitle1') }}
        </h4>
        <p class="text-gray-400 mb-1">
          {{ $t('aboutUs.values.item2.text1') }}
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          {{ $t('aboutUs.values.item2.subtitle2') }}
        </h4>
        <p class="text-gray-400 mb-1">
          {{ $t('aboutUs.values.item2.text2') }}
        </p>
      </div>
    </div>

    <AppDivider class="mb-12 mt-12" />

    <div class="grid grid-cols-1 md:grid-cols-3 px-3 md:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] md:text-[36px]">
        {{ $t('aboutUs.values.item3.title') }}
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          {{ $t('aboutUs.values.item3.subtitle1') }}
        </h4>
        <p class="text-gray-400 mb-1">
          {{ $t('aboutUs.values.item3.text1') }}
        </p>
        <h4 class="text-gray-500 font-medium mb-1">
          {{ $t('aboutUs.values.item3.subtitle2') }}
        </h4>
        <p class="text-gray-400 mb-1">
          {{ $t('aboutUs.values.item3.text2') }}
        </p>
      </div>
    </div>

    <AppDivider class="mb-12 mt-12" />

    <div class="grid grid-cols-1 md:grid-cols-3 px-3 md:px-10 gap-6">
      <h3 class="text-brand-red text-[28px] md:text-[36px]">
        {{ $t('aboutUs.values.item4.title') }}
      </h3>
      <div class="col-span-2 mr-8">
        <h4 class="text-gray-500 font-medium mb-1">
          {{ $t('aboutUs.values.item4.subtitle1') }}
        </h4>
        <p class="text-gray-400 mb-1">
          {{ $t('aboutUs.values.item4.text1') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppDivider from '../components/AppDivider.vue'
</script>
