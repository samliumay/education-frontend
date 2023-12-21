<template>
  <div
    class="flex items-center gap-[32px] font-medium bg-white border-black border-b-[1px] px-[48px] py-[28px]"
  >
    <img src="../assets/icons/logo_header.svg" alt="Clavis logo" />
    <div
      class="border-black rounded-[12px] border-[1px] px-[24px] py-[12px] cursor-pointer"
    >
      Меню
    </div>
    <NuxtLink
      v-for="route in routes"
      :key="route.value"
      :to="route.value"
      class="cursor-pointer"
    >
      {{ route.label }}
    </NuxtLink>
    <div class="grow" />
    <NuxtLink to="/cart" class="flex items-center cursor-pointer">
      <span> Корзина </span>
      <span
        class="border-black rounded-[1000px] border-[1px] p-[12px] ml-[6px] relative"
      >
        <span
          class="absolute w-full h-full flex items-center justify-center top-0 left-0"
        >
          {{ cart?.order?.items?.length || 0 }}
        </span>
      </span>
    </NuxtLink>
    <AppButton @click="navigateTo('/profile')">
      {{ user.isLoggedIn ? "Профиль" : "Войти" }}
    </AppButton>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from "../store/cart"
import { useUserStore } from "../store/user"
import AppButton from "./AppButton.vue"

const routes = [
  {
    label: "Курсы",
    value: "/",
  },
  {
    label: "Академии",
    value: "/academies",
  },
  {
    label: "Воркшопы",
    value: "/workshops",
  },
]

const user = useUserStore()
const cart = useCartStore()

cart.getCurrentOrder()
</script>
