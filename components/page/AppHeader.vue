<template>
  <AppSignIn :is-open="isOpenSignIn" @close="isOpenSignIn = false" />

  <header
    class="w-[100vw] fixed top-0 z-100 before:font-medium bg-white py-[18px] lg:py-[28px] block-padding-x self-center"
    :class="{ '!bg-brand-light-gray': $route.name === 'menu' }"
  >
    <div
      v-show="$route.name === 'menu'"
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
      :class="{ 'bg-white': $route.name === 'cart' }"
    />

    <ProfileMenu
      :is-open="isOpenModalProfile"
      @close="isOpenModalProfile = false"
    />

    <!-- DESKTOP HEADER -->
    <div class="relative -full justify-between gap-[48px] hidden lg:flex">
      <div class="flex items-center gap-8">
        <NuxtLink to="/">
          <img src="/icons/logo_pink.svg" alt="Clavis logo" class="mr-2" />
        </NuxtLink>

        <!-- NORMAL NAV HEADER -->
        <template v-if="$route.name !== 'menu'">
          <AppButton
            is-inverted
            class="flex gap-2 items-center"
            @click="navigateTo('/menu')"
          >
            <img src="/icons/star.svg" alt="Stars" />
            <p class="text-base xl:text-lg font-medium text-brand-black">
              {{ $t('common.menu') }}
            </p>
          </AppButton>

          <nav class="flex gap-4">
            <NuxtLink
              v-for="route in routes"
              :key="route.value"
              :to="route.value"
              class="cursor-pointer hover:text-brand-red text-brand-black text-base xl:text-lg font-medium"
              :class="{ 'text-brand-red': $route.href === route.value }"
            >
              {{ route.label }}
            </NuxtLink>
          </nav>
        </template>

        <!-- MENU NAV HEADER -->
        <template v-else>
          <AppButton
            is-inverted
            class="flex gap-2 items-center"
            @click="$router.go(-1)"
          >
            <img src="/icons/cross.svg" alt="close" />
            <p>{{ $t('common.actions.close') }}</p>
          </AppButton>
        </template>
      </div>

      <div class="flex items-center gap-6">
        <AppSelect
          v-model:value="currentLanguage"
          :options="languageOptions"
          variant="transparent"
          class="w-[50px] font-medium"
        />

        <NuxtLink
          to="/cart"
          class="flex items-center cursor-pointer text-base xl:text-lg"
        >
          <span class="hover:text-brand-red font-medium text-brand-black">
            {{ $t('common.cart') }}
          </span>
          <span
            class="border-brand-black rounded-full border-[1px] p-[12px] ml-[6px] relative"
          >
            <span
              class="absolute w-full h-full flex items-center justify-center top-0 left-0"
            >
              {{ cart?.order?.items?.length || 0 }}
            </span>
          </span>
        </NuxtLink>

        <button
          v-if="user.isLoggedIn"
          class="bg-white rounded-full w-[50px] h-[50px] min-h-[50px] min-w-[50px] overflow-hidden border-brand-black border-[1px]"
          @click="isOpenModalProfile = true"
        >
          <img
            src="/icons/profile.svg"
            alt="profile"
            class="w-[50px] h-[50px]"
          />
        </button>
        <AppButton
          v-else
          class="min-w-[100px] text-xl"
          @click="isOpenSignIn = true"
        >
          {{ $t('common.actions.signIn') }}
        </AppButton>
      </div>
    </div>

    <!-- MOBILE HEADER -->
    <div
      class="relative w-full flex items-center justify-between gap-3 md:gap-6 lg:hidden"
    >
      <!-- OPEN MENU BUTTON HEADER -->
      <template v-if="$route.name !== 'menu'">
        <AppButton
          is-inverted
          class="flex gap-1 md:gap-2 items-center"
          @click="navigateTo('/menu')"
        >
          <img src="/icons/star.svg" alt="Stars" />
          <p>{{ $t('common.menu') }}</p>
        </AppButton>
      </template>

      <!-- CLOSE MENU BUTTON HEADER -->
      <template v-else>
        <AppButton
          is-inverted
          class="flex gap-1 md:gap-2 items-center"
          @click="$router.go(-1)"
        >
          <img src="/icons/cross.svg" alt="close" />
          <p>{{ $t('common.actions.close') }}</p>
        </AppButton>
      </template>

      <NuxtLink to="/">
        <img
          src="/icons/logo_pink.svg"
          alt="Clavis logo"
          class="w-[80px] sm:w-[120px]"
        />
      </NuxtLink>

      <div class="flex items-center gap-2 md:gap-4">
        <AppSelect
          v-model:value="currentLanguage"
          :options="languageOptions"
          variant="transparent"
          class="w-[60px]"
        />

        <NuxtLink to="/cart">
          <img
            src="/icons/cart.svg"
            alt="Cart"
            class="shrink-0 w-[24px] md:w-auto mr-2"
          />
        </NuxtLink>

        <template v-if="user.isLoggedIn">
          <button
            class="bg-white rounded-full w-[24px] h-[24px] min-h-[24px] min-w-[24px] overflow-hidden border-brand-black border-[1px]"
            @click="isOpenModalProfile = true"
          >
            <img
              src="/icons/profile.svg"
              alt="Profile"
              class="w-[24px] h-[24px]"
            />
          </button>
        </template>
        <button v-else @click="isOpenSignIn = true">
          <img
            src="/icons/exit.svg"
            alt="Login"
            class="shrink-0 w-[24px] md:w-auto"
          />
        </button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useCartStore } from '../../store/cart'
import { useUserStore } from '../../store/user'
import AppButton from '../AppButton.vue'
import AppSelect from '../AppSelect.vue'
import ProfileMenu from '../profile/ProfileMenu.vue'

const { t, locale } = useI18n({ useScope: 'global' })

const route = useRoute()

const routes = computed(() => [
  {
    label: t('common.types.courses'),
    value: '/courses',
  },
  {
    label: t('common.types.academies'),
    value: '/academies',
  },
  {
    label: t('common.types.workshops'),
    value: '/workshops',
  },
])

// Stores
const user = useUserStore()
const cart = useCartStore()
cart.getCurrentOrder()

// Flags
const isOpenSignIn = ref(false)
const isOpenModalProfile = ref(false)

onMounted(() => {
  if (route.query.uid && route.query.token) {
    isOpenSignIn.value = true
  } else if (route.query?.email === 'confirmed') {
    isOpenSignIn.value = true
  }
})

const browserLocale = ['ru', 'en', 'de'].includes(
  navigator.language.slice(0, 2),
)
  ? navigator.language.slice(0, 2)
  : undefined

// Language Switcher
const currentLanguage = ref(
  localStorage.getItem('locale') || browserLocale || 'ru',
)
const languageOptions = [
  {
    label: 'DE',
    value: 'de',
  },
  {
    label: 'EN',
    value: 'en',
  },
  {
    label: 'RU',
    value: 'ru',
  },
]

// Actions
const setLocale = () => {
  localStorage.setItem('locale', currentLanguage.value)
  locale.value = currentLanguage.value
}

watch(
  () => currentLanguage.value,
  () => {
    setLocale()
  },
)

onMounted(() => {
  locale.value = localStorage.getItem('locale') || browserLocale || 'ru'
})
</script>
