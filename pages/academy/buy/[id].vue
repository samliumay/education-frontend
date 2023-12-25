<template>
  <div class="grid grid-cols-2 gap-[96px] my-[96px] mx-[48px]">
    <div>
      <p class="text-[24px] font-medium mb-[16px]">Вы выбрали</p>
      <BuyProductCard :product="product" />
    </div>

    <div>
      <h2 class="text-[48px] font-medium mb-[36px]">Заполните данные</h2>

      <GetChildData
        :visitor="buyForm.visitor"
        @update:visitor="(el) => (buyForm.visitor = el)"
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
        :checked="buyForm.schedule_type === 'Academy (1st half)'"
        value="first"
        name="when"
        @change="buyForm.schedule_type = 'Academy (1st half)'"
      >
        <div class="flex flex-col gap-[4px]">
          <p class="font-medium">1/2 дня утром</p>
          <p class="text-gray-400">Пн-Пт с 9:30 до 12:30</p>
        </div>
      </n-radio>
      <n-radio
        class="mt-[12px]"
        :checked="buyForm.schedule_type === 'Academy (2nd half)'"
        value="second"
        name="when"
        @change="buyForm.schedule_type = 'Academy (2nd half)'"
      >
        <div class="flex flex-col gap-[4px]">
          <p class="font-medium">1/2 дня во второй половине</p>
          <p class="text-gray-400">Пн-Пт с 9:30 до 12:30</p>
        </div>
      </n-radio>
      <n-radio
        class="mt-[12px]"
        :checked="buyForm.schedule_type === 'Academy (full day)'"
        value="full"
        name="when"
        @change="buyForm.schedule_type === 'Academy (full day)'"
      >
        <div class="flex flex-col gap-[4px]">
          <p class="font-medium">Полный день</p>
          <p class="text-gray-400">Пн-Пт с 9:30 до 12:30</p>
        </div>
      </n-radio>

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">
        Итого:
        <span class="text-green-700 mr-[8px]"> {{ +(product.purchase_options?.find((purchaseOption: any) => purchaseOption.type === buyForm.schedule_type)?.base_price || "0") }} € </span>
      </p>

      <AppButton @click="addAcademy"> Добавить в корзину </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NCheckbox, NRadio } from "naive-ui"
import { ref } from "vue"

import GetChildData from "../../../components/buy/GetChildData.vue"
import { useCartStore } from "../../../store/cart"
import type { OrderItem, Product } from "../../../types"

const route = useRoute()

const cart = useCartStore()

const buyForm = ref({
  academy_number_of_weeks: 0,
  schedule_type: "Academy (1st half)",
  first: false,
  second: false,
  product: route.params.id,
  schedule_slots: [],
} as Partial<OrderItem> & { first: boolean; second: boolean })

const { data: product } = (await useFetch(
  `https://api.clavis.the-o.co/api/v1/products/${route.params.id}`,
  { deep: true },
)) as { data: Product }

const addAcademy = async () => {
  let weeks = 0
  if (buyForm.value.first) weeks++
  if (buyForm.value.second) weeks++
  await cart.addOrderItem({
    academy_number_of_weeks: weeks,
    product: route.params.id,
    purchase_option:
      product.purchase_options.find(
        option => buyForm.value.schedule_type === option.type,
      )?.id || 0,
    visitor: buyForm.value.visitor,
    schedule_slots: [],
  })
  navigateTo("/cart")
}
</script>
