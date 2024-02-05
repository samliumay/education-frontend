<template>
  <AppSignIn :is-open="isOpenSignIn" @close="isOpenSignIn = false" />

  <header
    class="relative before:font-medium bg-white px-10 py-[18px] lg:py-[28px]"
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
      <div class="flex items-center gap-6">
        <NuxtLink to="/">
          <img src="/icons/logo_pink.svg" alt="Clavis logo" class="mr-4" />
        </NuxtLink>

        <!-- NORMAL NAV HEADER -->
        <template v-if="$route.name !== 'menu'">
          <AppButton
            is-inverted
            class="flex gap-2 items-center"
            @click="navigateTo('/menu')"
          >
            <img src="/icons/star.svg" alt="Stars" />
            <p>Меню</p>
          </AppButton>

          <nav class="flex gap-6">
            <NuxtLink
              v-for="route in routes"
              :key="route.value"
              :to="route.value"
              class="cursor-pointer"
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
            <p>Закрыть</p>
          </AppButton>
        </template>
      </div>

      <div class="flex items-center gap-8">
        <AppSelect
          v-model:value="currentLanguage"
          :options="languageOptions"
          variant="transparent"
        />

        <NuxtLink to="/cart" class="flex items-center cursor-pointer">
          <span> Корзина </span>
          <span
            class="border-black rounded-full border-[1px] p-[12px] ml-[6px] relative"
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
          class="bg-white rounded-full w-[50px] h-[50px] min-h-[50px] min-w-[50px] overflow-hidden border-black border-[1px]"
          @click="isOpenModalProfile = true"
        >
          <img
            src="/icons/profile.svg"
            alt="profile"
            class="w-[50px] h-[50px]"
          />
        </button>
        <AppButton v-else @click="isOpenSignIn = true"> Войти </AppButton>
      </div>
    </div>

    <!-- MOBILE HEADER -->
    <div class="relative w-full flex items-center justify-between gap-6 lg:hidden">
      <!-- OPEN MENU BUTTON HEADER -->
      <template v-if="$route.name !== 'menu'">
        <AppButton
          is-inverted
          class="flex gap-2 items-center"
          @click="navigateTo('/menu')"
        >
          <img src="/icons/star.svg" alt="Stars" />
          <p>Меню</p>
        </AppButton>
      </template>

      <!-- CLOSE MENU BUTTON HEADER -->
      <template v-else>
        <AppButton
          is-inverted
          class="flex gap-2 items-center"
          @click="$router.go(-1)"
        >
          <img src="/icons/cross.svg" alt="close" />
          <p>Закрыть</p>
        </AppButton>
      </template>

      <NuxtLink to="/">
        <img
          src="/icons/logo_pink.svg"
          alt="Clavis logo"
          class="w-[80px] sm:w-[120px]"
        />
      </NuxtLink>

      <div class="flex items-center gap-4">
        <NuxtLink to="/cart">
          <img src="/icons/cart.svg" alt="Cart" />
        </NuxtLink>

        <template v-if="user.isLoggedIn">
          <button
            class="bg-white rounded-full w-[30px] h-[30px] min-h-[30px] min-w-[30px] overflow-hidden border-black border-[1px]"
            @click="isOpenModalProfile = true"
          >
            <img
              src="/icons/profile.svg"
              alt="Profile"
              class="w-[30px] h-[30px]"
            />
          </button>
        </template>
        <button v-else @click="isOpenSignIn = true">
          <img src="/icons/exit.svg" alt="Login" />
        </button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { useCartStore } from '../../store/cart'
import { useUserStore } from '../../store/user'
import AppButton from '../AppButton.vue'
import AppSelect from '../AppSelect.vue'
import ProfileMenu from '../profile/ProfileMenu.vue'

const routes = [
  {
    label: 'Курсы',
    value: '/courses',
  },
  {
    label: 'Академии',
    value: '/academies',
  },
  {
    label: 'Воркшопы',
    value: '/workshops',
  },
]

// Stores
const user = useUserStore()
const cart = useCartStore()
cart.getCurrentOrder()

// Flags
const isOpenSignIn = ref(false)
const isOpenModalProfile = ref(false)

// Language Switcher
const currentLanguage = ref('ru')
const languageOptions = [
  {
    label: 'Ru',
    value: 'ru',
  },
  {
    label: 'En',
    value: 'en',
  },
  {
    label: 'De',
    value: 'de',
  },
]

// Actions
</script>
