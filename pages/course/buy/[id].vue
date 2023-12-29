<template>
  <div class="grid grid-cols-2 gap-[96px] my-[96px] mx-[48px]">
    <div>
      <p class="text-[24px] font-medium mb-[16px]">Вы выбрали</p>
      <BuyProductCard :product="product" />

      <p class="text-[24px] font-medium mt-[48px] mb-[16px]">Выберите опцию</p>
      <SubscriptionOptions
        :product="product"
        :value="buyForm.subscription"
        @select="(el) => (buyForm.subscription = el)"
      />
    </div>

    <div>
      <h2 class="text-[48px] font-medium mb-[36px]">Заполните данные</h2>

      <GetChildData
        :child="buyForm.visitor"
        @update:visitor="(el) => (buyForm.visitor = el)"
      />

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">Выберите дни посещения</p>
      <p class="mt-[4px] mb-[12px]">До 3 дней максимум</p>
      <SelectTagsBlock
        :tags="
          product.schedule_slots.map((slot) => {
            return {
              label: `${slot.weekday.slice(0, 2)} ${slot.start.slice(
                0,
                5,
              )}-${slot.end.slice(0, 5)}`,
              value: slot.id,
            };
          })
        "
        :selected-tags="buyForm.schedule_slots as number[]"
        @update:selected-tags="(el) => (buyForm.schedule_slots = el)"
      />

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium mb-[16px]">
        Выберите дату первого посещения
      </p>

      <n-space>
        <n-radio
          :checked="buyForm.when === 'now'"
          value="now"
          name="when"
          @change="buyForm.when = 'now'"
        >
          Сразу
        </n-radio>

        <n-radio
          :checked="buyForm.when === 'later'"
          value="later"
          name="when"
          @change="buyForm.when = 'later'"
        >
          Позже
        </n-radio>
      </n-space>

      <AppInput
        v-if="buyForm.when === 'later'"
        v-model="buyForm.later"
        placeholder="ДД.ММ.ГГГГ"
        class="mt-[16px]"
      />

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">
        Итого:
        <span class="text-green-700 mr-[8px]">
          {{
            +(
              product.purchase_options?.find(
                (purchaseOption: any) => purchaseOption.type === scheduleType,
              )?.base_price || "0"
            )
          }}
          €
        </span>
      </p>

      <AppButton class="w-full mt-[24px]" @click="addCourse">
        Добавить в корзину
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NRadio, NSpace } from "naive-ui"
import { computed, ref } from "vue"

import AppButton from "../../../components/AppButton.vue"
import AppDivider from "../../../components/AppDivider.vue"
import AppInput from "../../../components/AppInput.vue"
import BuyProductCard from "../../../components/buy/BuyProductCard.vue"
import GetChildData from "../../../components/buy/GetChildData.vue"
import SelectTagsBlock from "../../../components/misc/SelectTagsBlock.vue"
import SubscriptionOptions from "../../../components/products/SubscriptionOptions.vue"
import { useCartStore } from "../../../store/cart"
import type { OrderItem } from "../../../types"

const route = useRoute()

const cart = useCartStore()

const buyForm = ref({
  academy_number_of_weeks: 1,
  schedule_type: "Course (1 / week)",
  first: false,
  second: false,
  product: route.params.id,
  when: "now",
  schedule_slots: [],
  later: "",
  subscription: "subscription",
  visitor: 0,
} as Partial<OrderItem> & {
  when: string;
  later: string;
  subscription?: "subscription" | "card";
})

const { data: product } = await useFetch(
  `https://api.clavis.the-o.co/api/v1/products/${route.params.id}`,
)

const scheduleType = computed(() => {
  if (buyForm.value.subscription === "subscription") {
    return `Course (${buyForm.value.schedule_slots?.length} / week)` as "Course (1 / week)"
  }
  return "TERMINKARTEN"
})

const addCourse = async () => {
  if (buyForm.value.subscription === "subscription") {
    buyForm.value.schedule_type =
      `Course (${buyForm.value.schedule_slots?.length} / week)` as "Course (1 / week)"
  } else {
    buyForm.value.schedule_type = "TERMINKARTEN"
  }
  await cart.addOrderItem({
    academy_number_of_weeks: 1,
    product: route.params.id,
    purchase_option:
      product.value.purchase_options.find(
        (option: { type: string | undefined }) =>
          buyForm.value.schedule_type === option.type,
      ).id || 0,
    visitor: buyForm.value.visitor,
    schedule_slots: buyForm.value.schedule_slots,
  })
  navigateTo("/cart")
}
</script>
