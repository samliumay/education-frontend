<template>
  <footer
    class="w-full p-[28px] md:p-[48px] flex flex-col gap-10 bg-brand-light-gray"
    :class="{ 'bg-white': $route.name === 'cart' }"
  >
    <div class="flex justify-between gap-10 flex-col md:flex-row">
      <div class="flex flex-col gap-8 flex-wrap lg:gap-16 md:flex-row">
        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-1">
            <p class="font-bold">Телефон</p>
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
            >Контакты →</a
          >
        </div>

        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col gap-1">
            <p class="font-bold">Адрес</p>
            <p class="text-brand-gray font-medium">
              Иммануэлькирхштрассе 4 <br />
              10405 Берлин
            </p>
          </div>

          <a class="font-bold text-brand-red underline underline-offset-8"
            >Смотреть на карте →</a
          >
        </div>

        <div class="flex flex-col gap-1">
          <p class="font-bold">Почта</p>
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

    <img src="/icons/logo_pink.svg" class="w-full" alt="big logo" />

    <div class="flex justify-between w-full flex-col md:flex-row gap-6">
      <div class="flex gap-3 w-full justify-between md:w-fit md:justify-start">
        <a>Privacy Policy</a>
        <a>Legal</a>
        <a>Terms of Service</a>
      </div>

      <p>Clavis School of Art and Science GmbH 2023 ©</p>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { socialsLinks } from '../../constants/socials'
</script>
