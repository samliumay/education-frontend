<template>
  <header class="before:font-medium bg-white px-[18px] py-[18px] lg:px-[40px] lg:py-[28px]">
    <!-- DESKTOP HEADER -->
    <div class="w-full justify-between gap-[48px] hidden lg:flex">
      <div class="flex items-center gap-6">
        <img
          src="../assets/icons/logo_pink.svg"
          alt="Clavis logo"
          class="mr-4"
        />
        <AppButton is-inverted class="flex gap-2 items-center">
          <img src="../assets/icons/star.svg" alt="Stars" />
          <p>Меню</p>
        </AppButton>
        <nav class="flex gap-6">
          <NuxtLink
            v-for="route in routes"
            :key="route.value"
            :to="route.value"
            class="cursor-pointer"
          >
            {{ route.label }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center gap-8">
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
    </div>

    <!-- MOBILE HEADER -->
    <div class="w-full flex items-center justify-between gap-6 lg:hidden">
      <AppButton is-inverted class="flex gap-2 items-center">
        <img src="../assets/icons/star.svg" alt="Stars" />
        <p>Меню</p>
      </AppButton>

      <img src="../assets/icons/logo_pink.svg" alt="Clavis logo" class="w-[80px] sm:w-[120px]" />

      <div class="flex items-center gap-4">
        <img src="../assets/icons/cart.svg" alt="Cart" />
        <img src="../assets/icons/exit.svg" alt="Exit" />
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useCartStore } from "../store/cart";
import { useUserStore } from "../store/user";
import AppButton from "./AppButton.vue";

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
];

const user = useUserStore();
const cart = useCartStore();

cart.getCurrentOrder();
</script>
