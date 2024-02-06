<template>
  <footer
    class="w-full py-[28px] px-10 md:py-[48px] flex flex-col gap-10 bg-brand-light-gray"
    :class="{ 'bg-white': $route.name === 'cart' }"
  >
    <div class="flex justify-between gap-10 flex-col md:flex-row">
      <div class="flex flex-col gap-8 flex-wrap lg:gap-16 md:flex-row">
        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-1">
            <p class="font-bold">{{ $t('common.info.phone') }}</p>
            <div class="flex flex-col gap-1">
              <a
href="tel:+493071537477"
class="text-brand-gray font-medium"
>+49 (0) 30 71537477</a>
              <a
href="tel:+493071537477"
class="text-brand-gray font-medium"
>+49 (0) 30 71537477</a>
            </div>
          </div>

          <a class="font-bold text-brand-red underline underline-offset-8">{{ $t('common.info.contacts') }} →</a>
        </div>

        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-1">
            <p class="font-bold">{{ $t('common.info.address') }}</p>
            <p class="text-brand-gray font-medium">
              {{ $t('common.info.actualAddress') }}
            </p>
          </div>

          <a class="font-bold text-brand-red underline underline-offset-8">{{ $t('common.info.onMap') }} →</a>
        </div>

        <div class="flex flex-col gap-1">
          <p class="font-bold">{{ $t('common.info.mail') }}</p>
          <a
            class="text-brand-gray font-medium"
            href="mailto:info@clavis-schule.de"
            >info@clavis-schule.de</a>
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

    <img src="/icons/logo_pink.svg" class="w-full" alt="big logo" />

    <div class="flex justify-between w-full flex-col md:flex-row gap-6">
      <div class="flex gap-3 w-full justify-between md:w-fit md:justify-start">
        <NuxtLink
class="w-fit inline-block"
to="/legal/privacy"
>
<span>{{ $t('common.info.privacy') }}</span>
</NuxtLink>
        <NuxtLink
class="w-fit inline-block"
to="/legal"
>
<span>{{ $t('common.info.legal') }}</span>
</NuxtLink>
        <NuxtLink
class="w-fit inline-block"
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
import { socialsLinks } from '../../constants/socials'
</script>
