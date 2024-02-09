<template>
  <footer
    class="w-full py-[28px] md:py-[48px] flex flex-col gap-10 bg-brand-light-gray relative block-padding-x"
    :class="{ 'bg-white': $route.name === 'cart' }"
  >
    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
      :class="{
        'bg-white': isWhiteBackground,
      }"
    />
    <div class="relative flex justify-between gap-10 flex-col md:flex-row">
      <div class="flex flex-col gap-8 flex-wrap lg:gap-16 md:flex-row">
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

          <NuxtLink
            to="/contacts"
            class="font-bold text-brand-black hover:text-brand-red underline underline-offset-8"
          >
            {{ $t('common.info.contacts') }} →
          </NuxtLink>
        </div>

        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-1">
            <p class="font-bold">{{ $t('common.info.address') }}</p>
            <p class="text-brand-gray font-medium">
              {{ $t('common.info.actualAddress') }}
            </p>
          </div>

          <a
            href="https://www.google.de/maps/place/Immanuelkirchstra%C3%9Fe+4,+10405+Berlin,+Germany/@52.5328744,13.4202195,17z/data=!3m1!4b1!4m6!3m5!1s0x47a84e04f5f870f5:0x94001fd73aa5fe97!8m2!3d52.5328712!4d13.4227998!16s%2Fg%2F11c5f7h2pg?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            class="font-bold text-brand-black hover:text-brand-red underline underline-offset-8"
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
          <img
            :src="social.icon"
            class="w-[82px] h-[78px] md:w-[64px] md:h-[58px]"
            :alt="social.alt"
          />
        </a>
      </div>
    </div>

    <img src="/icons/logo_pink.svg" class="relative w-full" alt="big logo" />

    <div
      class="relative flex justify-between w-full flex-col md:flex-row gap-6"
    >
      <div class="flex gap-4 w-full justify-between md:w-fit md:justify-start">
        <NuxtLink
          class="w-fit inline-block text-brand-gray hover:text-brand-red"
          to="/legal/privacy"
        >
          <span>{{ $t('common.info.privacy') }}</span>
        </NuxtLink>
        <NuxtLink
          class="w-fit inline-block text-brand-gray hover:text-brand-red"
          to="/legal"
        >
          <span>{{ $t('common.info.legal') }}</span>
        </NuxtLink>
        <NuxtLink
          class="w-fit inline-block text-brand-gray hover:text-brand-red"
          to="/legal/terms"
        >
          <span>{{ $t('common.info.serviceTerms') }}</span>
        </NuxtLink>
      </div>

      <p>{{ $t('common.info.schoolCopyright') }}</p>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

import { socialsLinks } from '../../constants/socials'

const route = useRoute()

const routes = ['cart', 'profile', 'instructors']
const isWhiteBackground = routes.some(path => route.name === path)
</script>
