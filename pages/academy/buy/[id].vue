<template>
  <div class="grid grid-cols-2 gap-[96px] my-[96px] mx-[48px]">
    <div>
      <p class="text-[24px] font-medium mb-[16px]">Вы выбрали</p>
      <BuyProductCard :product="product" />
    </div>

    <div>
      <h2 class="text-[48px] font-medium mb-[36px]">Заполните данные</h2>

      <GetChildData
        :child="buyForm.child"
        @update:child="(el) => (buyForm.child = el)"
      />

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">Выберите неделю</p>
      <n-checkbox v-model:checked="buyForm.first" class="mt-[16px]">
        1 неделя программы (25.03-28.03)
      </n-checkbox>
      <n-checkbox v-model:checked="buyForm.second" class="mt-[12px]">
        2 неделя программы (02.04-05.04)
      </n-checkbox>

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">Выберите смену</p>

      <n-radio
        class="mt-[16px]"
        :checked="buyForm.when === 'first'"
        value="first"
        name="when"
        @change="buyForm.when = 'first'"
      >
        <div class="flex flex-col gap-[4px] text-[16px]">
          <p class="font-medium">1/2 дня утром</p>
          <p class="text-gray-400">Пн-Пт с 9:30 до 12:30</p>
        </div>
      </n-radio>
      <n-radio
        class="mt-[12px]"
        :checked="buyForm.when === 'second'"
        value="second"
        name="when"
        @change="buyForm.when = 'second'"
      >
        <div class="flex flex-col gap-[4px] text-[16px]">
          <p class="font-medium">1/2 дня во второй половине</p>
          <p class="text-gray-400">Пн-Пт с 9:30 до 12:30</p>
        </div>
      </n-radio>
      <n-radio
        class="mt-[12px]"
        :checked="buyForm.when === 'full'"
        value="full"
        name="when"
        @change="buyForm.when = 'full'"
      >
        <div class="flex flex-col gap-[4px] text-[16px]">
          <p class="font-medium">Полный день</p>
          <p class="text-gray-400">Пн-Пт с 9:30 до 12:30</p>
        </div>
      </n-radio>

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">
        Итого:
        <span class="text-green-700 mr-[8px]"> 168,00 € </span>
      </p>

      <AppButton @click="navigateTo('/academies')">
        Добавить в корзину
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NCheckbox, NRadio } from "naive-ui"
import { ref } from "vue"

import GetChildData from "../../../components/buy/GetChildData.vue"
import type { Product } from "../../../types"

const product = ref({} as Product)
const buyForm = ref({
  child: {
    name: "",
    surname: "",
    birthdate: "",
  },
  first: false,
  second: false,
  when: "first" as "first" | "second" | "full",
})
</script>
