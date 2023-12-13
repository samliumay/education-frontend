<template>
  <div
    class="flex items-center gap-[32px] text-[16px] font-medium bg-white border-black border-b-[1px] px-[48px] py-[28px]"
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
      <span class="border-black rounded-[1000px] border-[1px] p-[6px] ml-[6px]">
        0
      </span>
    </NuxtLink>
    <AppButton> Войти </AppButton>
  </div>
</template>
<script setup lang="ts">
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
</script>
