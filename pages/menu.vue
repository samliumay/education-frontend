<template>
  <main
    class="flex flex-1 flex-col gap-10 px-8 py-5 bg-brand-light-gray lg:justify-between lg:items-start lg:flex-row h-full"
  >
    <nav class="flex flex-col gap-2">
      <NuxtLink
        v-for="path in pathGroup"
        :key="path.route"
        :to="path.route"
        class="text-3xl text-brand-red font-medium sm:text-5xl lg:text-7xl"
        :class="{
          '!text-black': $router?.options?.history?.state?.back === path.route,
        }"
      >
        {{ path.label }}
      </NuxtLink>
    </nav>

    <div class="flex flex-col gap-8 h-fit">
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
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit h-fit"
          ><img
            src="../assets/icons/socials/tiktok.svg"
            class="w-[64px] h-[58px]"
            alt="tiktok"
        /></a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit h-fit"
          ><img
            src="../assets/icons/socials/youtube.svg"
            class="w-[64px] h-[58px]"
            alt="youtube"
        /></a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit h-fit"
          ><img
            src="../assets/icons/socials/instagram.svg"
            class="w-[64px] h-[58px]"
            alt="instagram"
        /></a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit h-fit"
          ><img
            src="../assets/icons/socials/facebook.svg"
            class="w-[64px] h-[58px]"
            alt="facebook"
        /></a>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
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

const pathGroup = [
  {
    label: 'О нас',
    route: '/',
  },
  {
    label: 'Курсы',
    route: '/courses',
  },
  {
    label: 'Академии',
    route: '/academies',
  },
  {
    label: 'Воркшопы',
    route: '/workshops',
  },
  {
    label: 'Преподаватели',
    route: '/',
  },
  {
    label: 'Расписание',
    route: '/',
  },
  {
    label: 'Контакты',
    route: '/',
  },
  {
    label: 'Спец.предложения',
    route: '/',
  },
  {
    label: 'Цены',
    route: '/',
  },
]
</script>
