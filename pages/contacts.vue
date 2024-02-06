<template>
  <n-breadcrumb class="mt-6 mb-10 px-10">
    <n-breadcrumb-item сlass="text-brand-gray">
      <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item сlass="text-brand-gray"> {{ $t('common.info.contacts') }} </n-breadcrumb-item>
  </n-breadcrumb>

  <div class="pz-3 sm:px-10">
    <h1 class="uppercase text-[36px] sm:text-[56px] mb-4 sm:mb-12">
      {{ $t('common.contacts.contactUs') }}
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-6">
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
      >
        <span> {{ $t('common.contacts.tryout') }} </span>
        <img src="/icons/chevron_left.svg" alt="Arrow" />
      </div>
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
      >
        <span> {{ $t('common.contacts.meeting') }} </span>
        <img src="/icons/chevron_left.svg" alt="Arrow" />
      </div>
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
      >
        <span> {{ $t('common.contacts.call') }} </span>
        <img src="/icons/chevron_left.svg" alt="Arrow" />
      </div>
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
      >
        <span> {{ $t('common.contacts.workUs') }} </span>
        <img src="/icons/chevron_left.svg" alt="Arrow" />
      </div>
    </div>

    <AppDivider class="mt-8 mb-4 sm:mt-24 sm:mb-12" />

    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-6">
      <div>
        <h3 class="text-[28px] sm:text-[36px] font-medium mb-3 sm:mb-6">
          E-mail
        </h3>
        <p class="text-brand-red text-[20px] sm:text-[24px] font-medium">
          info@clavis-schule.de
        </p>
      </div>

      <div>
        <h3 class="text-[28px] sm:text-[36px] font-medium mb-3 sm:mb-6">
          {{ $t('common.contacts.main') }}
        </h3>
        <p class="text-brand-red text-[20px] sm:text-[24px] font-medium">
          +49 (0)30 71537477
        </p>
        <p
          class="text-brand-red text-[20px] sm:text-[24px] font-medium mb-3 sm:mb-4"
        >
          +49 (0)30 71537477
        </p>
      </div>

      <div>
        <h3 class="text-[28px] sm:text-[36px] font-medium mb-3 sm:mb-6">
          {{ $t('common.contacts.main') }}
        </h3>
        <p class="text-brand-red text-[20px] sm:text-[24px] font-medium">
          +49 (0)30 71537477
        </p>
      </div>

      <div>
        <h3 class="text-[28px] sm:text-[36px] font-medium mb-3 sm:mb-6">
          {{ $t('common.contacts.secretariat') }}
        </h3>
        <p class="text-brand-red text-[20px] sm:text-[24px] font-medium">
          +49 (0)30 71537477
        </p>
      </div>
    </div>

    <div class="flex gap-12 flex-col sm:flex-row">
      <div class="hidden sm:block">
        <h2 class="uppercase text-[36px] sm:text-[56px] mb-3 sm:mb-6">
          {{ $t('common.contacts.city') }}
        </h2>
        <p class="text-[28px] sm:text-[36px] font-medium text-gray-500">
          {{ $t('common.contacts.address') }}
        </p>
        <img src="/icons/logo_lion.svg" alt="Logo" class="mt-12" />
      </div>
      <div class="shrink-0 aspect-video">
        <img src="/icons/google_map.png" alt="Map" class="object-fit" />
      </div>
      <div class="flex flex-col sm:hidden">
        <h2 class="uppercase text-[36px] sm:text-[56px] mb-3 sm:mb-6">
          {{ $t('common.contacts.city') }}
        </h2>
        <p class="text-[28px] sm:text-[36px] font-medium text-gray-500">
          {{ $t('common.contacts.address') }}
        </p>
        <img src="/icons/logo_lion.svg" alt="Logo" class="mt-12 self-end" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

import AppDivider from '../components/AppDivider.vue'
</script>
