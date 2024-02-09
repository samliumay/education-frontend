<template>
  <main
    class="relative flex flex-1 flex-col gap-10 px-10 py-6 bg-brand-light-gray lg:justify-between lg:items-start lg:flex-row h-full"
  >
    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
      :class="{ 'bg-white': $route.name === 'cart' }"
    />

    <nav class="relative flex flex-col gap-2">
      <NuxtLink
        v-for="path in pathGroup"
        :key="path.route"
        :to="path.route"
        class="uppercase text-2xl text-brand-red font-medium sm:text-5xl"
        :class="{
          '!text-brand-black':
            $router?.options?.history?.state?.back === path.route,
        }"
      >
        {{ path.label }}
      </NuxtLink>
    </nav>

    <div class="relative flex flex-col gap-8 h-fit sm:self-end">
      <div
        class="flex flex-col gap-8 flex-wrap lg:gap-16 md:flex-row sm:self-end"
      >
        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-1">
            <p class="font-bold">{{ $t('common.info.phone') }}</p>
            <div class="flex flex-col gap-1">
              <a href="tel:+493071537477" class="text-brand-gray font-medium"
                >+49 (0) 30 71537477</a
              >
              <a href="tel:+493071537477" class="text-brand-gray font-medium"
                >+49 (0) 30 71537477</a
              >
            </div>
          </div>

          <a class="font-bold text-brand-red underline underline-offset-8"
            >{{ $t('common.info.contacts') }} →</a
          >
        </div>

        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-1">
            <p class="font-bold">{{ $t('common.info.address') }}</p>
            <p class="text-brand-gray font-medium">
              {{ $t('common.info.actualAddress') }}
            </p>
          </div>

          <a class="font-bold text-brand-red underline underline-offset-8"
            >{{ $t('common.info.onMap') }} →</a
          >
        </div>

        <div class="flex flex-col gap-1">
          <p class="font-bold">{{ $t('common.info.mail') }}</p>
          <a
            class="text-brand-gray font-medium"
            href="mailto:info@clavis-schule.de"
            >info@clavis-schule.de</a
          >
        </div>
      </div>

      <div class="flex gap-2 w-full justify-between md:w-fit md:justify-start">
        <a
          v-for="social in socialsLinks"
          :key="social.alt"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit h-fit"
        >
          <img :src="social.icon" class="w-[64px] h-[58px]" :alt="social.alt" />
        </a>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { socialsLinks } from '../constants/socials'

useHead({
  title: 'Clavis - Menu',
  meta: [
    {
      name: 'description',
      content: "That's a menu at Clavis",
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})

const { t } = useI18n()

const pathGroup = computed(() => [
  {
    label: t('common.main'),
    route: '/',
  },
  {
    label: t('common.aboutUs'),
    route: '/about-us',
  },
  {
    label: t('common.types.courses'),
    route: '/courses',
  },
  {
    label: t('common.types.academies'),
    route: '/academies',
  },
  {
    label: t('common.types.workshops'),
    route: '/workshops',
  },
  {
    label: t('common.tutors'),
    route: '/instructors',
  },
  // {
  //   label: 'Расписание',
  //   route: '/',
  // },
  {
    label: t('common.info.contacts'),
    route: '/contacts',
  },
  {
    label: t('common.specialOffer'),
    route: '/special_offer',
  },
  {
    label: t('common.schoolOffer'),
    route: '/school_offer',
  },
  // {
  //   label: 'Цены',
  //   route: '/',
  // },
])
</script>
