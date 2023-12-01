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
        :child="buyForm.child"
        @update:child="(el) => (buyForm.child = el)"
      />

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">Выберите дни посещения</p>
      <p class="text-[16px] mt-[4px] mb-[12px]">До 3 дней максимум</p>
      <SelectTagsBlock
        :tags="
          product.schedule_slots.map(
            (slot) => `${slot.weekday.slice(0, 2)} ${slot.start.slice(0, 5)}-${slot.end.slice(0, 5)}`,
          )
        "
        :selected-tags="buyForm.selectedTags"
        @update:selected-tags="(el: string[]) => (buyForm.selectedTags = el)"
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
        <span class="text-green-700 mr-[8px]"> 168,00 € </span>
      </p>

      <AppButton class="w-full mt-[24px]" @click="navigateTo('/')">
        Добавить в корзину
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NRadio, NSpace } from "naive-ui"
import { ref } from "vue"

import AppButton from "../../../components/AppButton.vue"
import AppDivider from "../../../components/AppDivider.vue"
import AppInput from "../../../components/AppInput.vue"
import BuyProductCard from "../../../components/buy/BuyProductCard.vue"
import GetChildData from "../../../components/buy/GetChildData.vue"
import SelectTagsBlock from "../../../components/misc/SelectTagsBlock.vue"
import SubscriptionOptions from "../../../components/products/SubscriptionOptions.vue"

const route = useRoute()

const { data: product } = await useFetch(`https://api.clavis.the-o.co/api/v1/products/${route.params.id}`, {deep: true})

const buyForm = ref({
  subscription: undefined as "subscription" | "card" | undefined,
  child: {
    name: "",
    surname: "",
    birthdate: "",
  },
  selectedTags: [] as string[],
  when: "now" as "now" | "later",
  later: "",
})
</script>
