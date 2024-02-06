<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <n-breadcrumb class="mt-6 mb-10 px-10">
    <n-breadcrumb-item сlass="text-brand-gray">
      <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item сlass="text-brand-gray">
      {{ $t('common.info.contacts') }}
    </n-breadcrumb-item>
  </n-breadcrumb>

  <!-- Modals -->
  <AppModalCourse
    v-if="isOpenModalCourse"
    :is-open="isOpenModalCourse"
    @close="isOpenModalCourse = false"
  />
  <AppModalCalendar
    v-if="isOpenModalCalendar"
    :is-open="isOpenModalCalendar"
    @close="isOpenModalCalendar = false"
  />
  <AppModalBackCall
    v-if="isOpenModalBackCall"
    :is-open="isOpenModalBackCall"
    @close="isOpenModalBackCall = false"
  />
  <AppModalApplication
    v-if="isOpenModalApplication"
    :is-open="isOpenModalApplication"
    @close="isOpenModalApplication = false"
  />

  <div class="pz-3 m-10 mb-20">
    <h1 class="uppercase text-[36px] sm:text-[56px] mb-4 sm:mb-12">
      {{ $t('common.contacts.contactUs') }}
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-6">
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
        @click="isOpenModalCourse = true"
      >
        <span> {{ $t('common.contacts.tryout') }} </span>
        <img src="/icons/chevron_left.svg" alt="Arrow" />
      </div>
      <div
      class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
        @click="isOpenModalCalendar = true"
      >
        <span> {{ $t('common.contacts.meeting') }} </span>
        <img src="/icons/chevron_left.svg" alt="Arrow" />
      </div>
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
        @click="isOpenModalBackCall = true"
      >
        <span> {{ $t('common.contacts.call') }} </span>
        <img src="/icons/chevron_left.svg" alt="Arrow" />
      </div>
      <div
        class="bg-brand-light-gray rounded-[12px] p-3 sm:p-6 text-brand-red flex justify-between"
        @click="isOpenModalApplication = true"
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
      <div class="w-full">
        <GoogleMap
          api-key="AIzaSyCdhWBS1I_Qi5qs5wljaBYIYRGBc0yIBYE"
          style="width: 100%; height: 100%"
          :center="center"
          :zoom="15"
        >
          <Marker :options="{ position: center }" />
        </GoogleMap>
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
import { ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

import AppDivider from '../components/AppDivider.vue'
import AppModalApplication from '../components/AppModalApplication.vue'
import AppModalBackCall from '../components/AppModalBackCall.vue'
import AppModalCalendar from '../components/AppModalCalendar.vue'
import AppModalCourse from '../components/AppModalCourse.vue'

const isOpenModalCourse = ref(false)
const isOpenModalBackCall = ref(false)
const isOpenModalApplication = ref(false)
const isOpenModalCalendar = ref(false)

// Map
const center = { lat: 52.53300499134639, lng: 13.422762249077477 }
</script>
