<template>
  <div v-if="productPending" class="my-20 flex justify-center">
    <AppLoader />
  </div>

  <div v-else class="grid grid-col-1 sm:grid-cols-2 gap-[96px] my-[96px] mx-[16px] sm:mx-[48px]">
    <div>
      <p class="text-[24px] font-medium mb-[16px]">Вы выбрали</p>
      <BuyProductCard :product="product" />

      <template v-if="product.product_type === 'Course'">
        <p class="text-[24px] font-medium mt-[48px] mb-[16px]">Выберите опцию</p>
        <PaymentOptions
          :block-data="product.purchase_options"
          is-white-background
          without-title
          :cols="2"
          :select-option="buyForm.purchase_option"
          @select="el => (buyForm.purchase_option = el)"
        />
      </template>
    </div>

    <div>
      <template v-if="['Course', 'Academy'].includes(product.product_type)">
        <h2 class="text-[32px] sm:text-[48px] font-medium mb-[36px]">Заполните данные</h2>

        <GetChildData
          :visitor="buyForm.visitor"
          @update:visitor="el => (buyForm.visitor = el)"
        />

        <AppDivider class="my-[24px]" />
      </template>

      <template v-if="product.product_type === 'Course'">
        <p class="text-[24px] font-medium">Выберите дни посещения</p>
        <p class="mt-[4px] mb-[12px]">До 3 дней максимум</p>
        <SelectTagsBlock
          :tags="
            product.schedule_slots.map(slot => {
              return {
                label: `${slot.weekday.slice(0, 2)} ${slot.start.slice(
                  0,
                  5,
                )}-${slot.end.slice(0, 5)}`,
                value: slot.id,
              }
            })
          "
          :selected-tags="buyForm.schedule_slots as number[]"
          @update:selected-tags="el => (buyForm.schedule_slots = el)"
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
          type="date"
          placeholder="2012-12-21"
          class="mt-[16px]"
        />
      </template>

      <template v-if="product.product_type === 'Academy'">
        <p class="text-[24px] font-medium">Выберите неделю</p>
        <n-checkbox v-model:checked="buyForm.first" class="mt-[16px]">
          1 неделя программы (25.03-28.03)
        </n-checkbox>
        <n-checkbox v-model:checked="buyForm.second" class="mt-[12px]">
          2 неделя программы (02.04-05.04)
        </n-checkbox>

        <AppDivider class="my-[24px]" />

        <p class="text-[24px] font-medium">Выберите смену</p>

        <n-space vertical>
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
            @change="buyForm.schedule_type = 'Academy (full day)'"
          >
            <div class="flex flex-col gap-[4px]">
              <p class="font-medium">Полный день</p>
              <p class="text-gray-400">Пн-Пт с 9:30 до 12:30</p>
            </div>
          </n-radio>
        </n-space>
      </template>

      <template v-if="product.product_type === 'Workshop'">
        <p class="text-[24px] font-medium mb-4">Введите имя и фамилию детей, которые придут на мероприятие</p>
        <AppTextarea v-model:model-value="buyForm.comment" placeholder="Комментарий" />

        <p class="text-[24px] font-medium mt-3">Выберите тариф</p>

        <n-space vertical>
          <n-radio
            v-for="purchaseOption in product.purchase_options"
            :key="purchaseOption.id"
            class="mt-[16px]"
            :checked="buyForm.purchase_option === purchaseOption.id"
            name="purchaseOption"
            @change="buyForm.purchase_option = purchaseOption.id"
          >
            <div class="flex flex-col gap-[4px]">
              <p class="font-medium">{{ purchaseOption.title }}</p>
              <p v-for="point in purchaseOption.bullet_points" :key="point.value" class="text-gray-400">{{ point.value }}</p>
            </div>
          </n-radio>
        </n-space>

        <AppDivider class="my-[24px]" />

        <p class="text-[24px] font-medium mt-3 mb-4">Есть ли у вашего ребенка особенность и тд?</p>

        <n-space>
          <n-radio
            :checked="buyForm.feature === 'yes'"
            value="yes"
            name="feature"
            @change="buyForm.feature = 'yes'"
          >
            Да
          </n-radio>

          <n-radio
            class="ml-[12px]"
            :checked="buyForm.feature === 'no'"
            value="no"
            name="feature"
            @change="buyForm.feature = 'no'"
          >
            Нет
          </n-radio>
        </n-space>

        <AppDivider class="my-[24px]" />

        <p class="text-[24px] font-medium mt-3 mb-4">Даю согласие на фото моего ребенка</p>

        <n-space>
          <n-radio
            :checked="buyForm.photo === 'yes'"
            value="yes"
            name="photo"
            @change="buyForm.photo = 'yes'"
          >
            Да
          </n-radio>

          <n-radio
            class="ml-[12px]"
            :checked="buyForm.photo === 'no'"
            value="no"
            name="photo"
            @change="buyForm.photo = 'no'"
          >
            Нет
          </n-radio>
        </n-space>
      </template>

      <AppDivider class="my-[24px]" />

      <p class="text-[24px] font-medium">
        Итого:
        <span
          v-if="product?.purchase_options?.length > 0"
          class="text-green-700 mr-[8px]"
        >
          {{
            +(
              product?.purchase_options?.find(
                (purchaseOption: any) =>
                  purchaseOption?.id === buyForm?.purchase_option,
              )?.base_price || product.purchase_options[0]?.base_price
            )
          }}
          €
        </span>
        <span v-else class="text-brand-red mr-[8px]">0 €</span>
      </p>

      <AppButton class="mt-4 sm:mt-10 w-full sm:w-auto" @click="addAcademy">
        Добавить в корзину
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NCheckbox, NRadio, NSpace } from 'naive-ui'
import { ref } from 'vue'

import AppLoader from '../../../components/AppLoader.vue'
import AppTextarea from '../../../components/AppTextarea.vue'
import BuyProductCard from '../../../components/buy/BuyProductCard.vue'
import GetChildData from '../../../components/buy/GetChildData.vue'
import PaymentOptions from '../../../components/cms/blocks/products/details/PaymentOptions.vue'
import SelectTagsBlock from '../../../components/misc/SelectTagsBlock.vue'
import { useCartStore } from '../../../store/cart'
import type { OrderItem, Product } from '../../../types'

const route = useRoute()

const cart = useCartStore()

const buyForm = ref({
  academy_number_of_weeks: 1,
  schedule_type: 'Academy (1st half)',
  first: false,
  second: false,
  product: route.params.id,
  schedule_slots: [],
  when: 'now',
  comment: '',
  feature: 'yes',
  photo: 'yes',
} as Partial<OrderItem> & { first: boolean; second: boolean; comment: string; feature: string; photo: string; })

const { data: product, pending: productPending } = (await useFetch(
  `https://api.clavis.the-o.co/api/v2/wagtail/products/${route.params.id}/?fields=*`,
  { deep: true },
)) as { data: Product }

const addAcademy = async () => {
  let weeks = 0
  if (buyForm.value.first) weeks++
  if (buyForm.value.second) weeks++

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const schedule_slots =
    product?.value?.schedule_slots?.length > 0
      ? product?.value?.schedule_slots.map(item => item?.id)
      : [11]

  await cart.addOrderItem({
    academy_number_of_weeks: weeks || 1,
    product: route.params.id,
    // purchase_option:
    //   product.purchase_options.find(
    //     option => buyForm.value.schedule_type === option.type,
    //   )?.id || 0,
    purchase_option: product?.value?.purchase_options?.[0]?.id ?? 1,
    visitor: buyForm.value.visitor,
    schedule_slots,
    product_page: product?.value?.id,
    comment: buyForm.value.comment,
  })
  navigateTo('/cart')
}
</script>
