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
    <h1 class="uppercase text-[36px] lg:text-[56px] mb-4 lg:mb-12">
      {{ $t('common.contacts.contactUs') }}
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-6">
      <div
        v-for="modal in modalsButtons"
        :key="modal.text"
        class="bg-brand-light-gray rounded-[12px] p-3 lg:p-6 text-brand-red flex justify-between"
        @click="modal.action"
      >
        <span class="text-xl lg:text-2xl font-medium"> {{ modal.text }} </span>
        <img
          src="/icons/chevron_left.svg"
          alt="Arrow"
          class="w-[14px] h-[14px] mt-2"
        />
      </div>
    </div>

    <AppDivider class="mt-8 mb-4 lg:mt-24 lg:mb-12" />

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-6">
      <div>
        <h3 class="text-[28px] lg:text-[36px] font-medium mb-3 lg:mb-6">
          E-mail
        </h3>
        <p class="text-brand-red text-[20px] lg:text-[24px] font-medium">
          info@clavis-schule.de
        </p>
      </div>

      <div>
        <h3 class="text-[28px] lg:text-[36px] font-medium mb-3 lg:mb-6">
          {{ $t('common.contacts.main') }}
        </h3>
        <p class="text-brand-red text-[20px] lg:text-[24px] font-medium">
          +49 (0)30 71537477
        </p>
        <p
          class="text-brand-red text-[20px] lg:text-[24px] font-medium mb-3 lg:mb-4"
        >
          +49 (0)30 71537477
        </p>
      </div>

      <div>
        <h3 class="text-[28px] lg:text-[36px] font-medium mb-3 lg:mb-6">
          {{ $t('common.contacts.main') }}
        </h3>
        <p class="text-brand-red text-[20px] lg:text-[24px] font-medium">
          +49 (0)30 71537477
        </p>
      </div>

      <div>
        <h3 class="text-[28px] lg:text-[36px] font-medium mb-3 lg:mb-6">
          {{ $t('common.contacts.secretariat') }}
        </h3>
        <p class="text-brand-red text-[20px] lg:text-[24px] font-medium">
          +49 (0)30 71537477
        </p>
      </div>
    </div>

    <div class="flex gap-12 flex-col lg:flex-row mt-12">
      <div class="hidden lg:block">
        <h2 class="uppercase text-[36px] lg:text-[56px] mb-3 lg:mb-6">
          {{ $t('common.contacts.city') }}
        </h2>
        <p
          class="text-[28px] lg:text-[36px] font-medium whitespace-nowrap text-brand-red"
        >
          {{ $t('common.contacts.address') }}
        </p>
        <p class="text-[28px] lg:text-[36px] font-medium text-gray-500">
          {{ $t('common.contacts.index') }}
        </p>
        <img src="/icons/logo_lion.svg" alt="Logo" class="mt-12" />
      </div>
      <div class="w-full h-[320px] mt-10 lg:mt-0 lg:h-auto">
        <GoogleMap
          api-key="AIzaSyCdhWBS1I_Qi5qs5wljaBYIYRGBc0yIBYE"
          style="width: 100%; height: 100%"
          :center="center"
          :zoom="15"
        >
          <Marker :options="{ position: center }" />
        </GoogleMap>
      </div>
      <div class="flex flex-col lg:hidden">
        <h2 class="uppercase text-[36px] lg:text-[56px] mb-3 lg:mb-6">
          {{ $t('common.contacts.city') }}
        </h2>
        <p
          class="text-[28px] lg:text-[36px] font-medium whitespace-nowrap text-brand-red"
        >
          {{ $t('common.contacts.address') }}
        </p>
        <p class="text-[28px] lg:text-[36px] font-medium text-gray-500">
          {{ $t('common.contacts.index') }}
        </p>
        <img src="/icons/logo_lion.svg" alt="Logo" class="mt-12 self-end" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed, ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

import AppDivider from '../components/AppDivider.vue'
import AppModalApplication from '../components/modals/AppModalApplication.vue'
import AppModalBackCall from '../components/modals/AppModalBackCall.vue'
import AppModalCalendar from '../components/modals/AppModalCalendar.vue'
import AppModalCourse from '../components/modals/AppModalCourse.vue'

const { t } = useI18n()

const isOpenModalCourse = ref(false)
const isOpenModalBackCall = ref(false)
const isOpenModalApplication = ref(false)
const isOpenModalCalendar = ref(false)

// Modals
const modalsButtons = computed(() => [
  {
    text: t('common.contacts.tryout'),
    action: () => (isOpenModalCourse.value = true),
  },
  {
    text: t('common.contacts.meeting'),
    action: () => (isOpenModalCalendar.value = true),
  },
  {
    text: t('common.contacts.call'),
    action: () => (isOpenModalBackCall.value = true),
  },
  {
    text: t('common.contacts.workUs'),
    action: () => (isOpenModalApplication.value = true),
  },
])

// Map
const center = { lat: 52.53300499134639, lng: 13.422762249077477 }
</script>
