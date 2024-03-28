<template>
  <div v-if="productPending" class="my-20 flex justify-center">
    <AppLoader />
  </div>

  <div
    v-else
    class="grid grid-col-1 lg:grid-cols-2 gap-[96px] my-[96px] mx-[16px] lg:mx-[48px]"
  >
    <div>
      <p class="text-[20px] font-medium mb-[16px]">
        {{ $t('common.modals.youChoosed') }}
      </p>
      <BuyProductCard :product="product" />

      <template v-if="product.product_type === 'Course'">
        <p class="text-[20px] font-medium mt-[48px] mb-[16px]">
          {{ $t('common.modals.chooseOption') }}
        </p>
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
        <h2 class="text-[32px] lg:text-[48px] font-medium mb-[36px]">
          {{ $t('buy.enterData') }}
        </h2>

        <GetChildData
          :visitor="buyForm.visitor"
          @update:visitor="el => (buyForm.visitor = el)"
        />

        <AppDivider class="my-[24px]" />
      </template>

      <template v-if="product.product_type === 'Course'">
        <p class="text-[20px] font-medium">{{ $t('buy.chooseDays') }}</p>
        <p class="mt-[4px] mb-[12px]">{{ $t('buy.chooseDays') }}</p>
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

        <p class="text-[20px] font-medium mb-[16px]">
          {{ $t('buy.firstLesson') }}
        </p>

        <n-space>
          <n-radio
            :checked="buyForm.when === 'now'"
            value="now"
            name="when"
            @change="buyForm.when = 'now'"
          >
            {{ $t('buy.now') }}
          </n-radio>

          <n-radio
            :checked="buyForm.when === 'later'"
            value="later"
            name="when"
            @change="buyForm.when = 'later'"
          >
            {{ $t('buy.later') }}
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
        <p class="text-[20px] font-medium">{{ $t('buy.chooseWeek') }}</p>
        <n-checkbox v-model:checked="buyForm.first" class="mt-[16px]">
          {{ $t('buy.firstWeek') }}
        </n-checkbox>
        <n-checkbox v-model:checked="buyForm.second" class="mt-[12px]">
          {{ $t('buy.secondWeek') }}
        </n-checkbox>

        <AppDivider class="my-[24px]" />

        <p class="text-[20px] font-medium">{{ $t('buy.chooseShift') }}</p>

        <n-space vertical>
          <n-radio
            v-if="
              product.purchase_options?.find(
                option => option.schedule_type === 'Academy (1st half)',
              )
            "
            class="mt-[16px]"
            :checked="buyForm.schedule_type === 'Academy (1st half)'"
            value="first"
            name="when"
            @change="buyForm.schedule_type = 'Academy (1st half)'"
          >
            <div class="flex flex-col gap-[4px]">
              <p class="font-medium">{{ $t('buy.morning') }}</p>
              <p class="text-gray-400">{{ $t('buy.morningTime') }}</p>
            </div>
          </n-radio>
          <n-radio
            v-if="
              product.purchase_options?.find(
                option => option.schedule_type === 'Academy (2nd half)',
              )
            "
            class="mt-[12px]"
            :checked="buyForm.schedule_type === 'Academy (2nd half)'"
            value="second"
            name="when"
            @change="buyForm.schedule_type = 'Academy (2nd half)'"
          >
            <div class="flex flex-col gap-[4px]">
              <p class="font-medium">{{ $t('buy.evening') }}</p>
              <p class="text-gray-400">{{ $t('buy.eveningTime') }}</p>
            </div>
          </n-radio>
          <n-radio
            v-if="
              product.purchase_options?.find(
                option => option.schedule_type === 'Academy (full day)',
              )
            "
            class="mt-[12px]"
            :checked="buyForm.schedule_type === 'Academy (full day)'"
            value="full"
            name="when"
            @change="buyForm.schedule_type = 'Academy (full day)'"
          >
            <div class="flex flex-col gap-[4px]">
              <p class="font-medium">{{ $t('buy.fullday') }}</p>
              <p class="text-gray-400">{{ $t('buy.fulldayTime') }}</p>
            </div>
          </n-radio>
        </n-space>
      </template>

      <template v-if="product.product_type === 'Workshop'">
        <p class="text-[20px] font-medium mb-4">
          {{ $t('buy.enterFio') }}
        </p>
        <AppTextarea
          v-model:model-value="buyForm.comment"
          placeholder="Комментарий"
        />

        <p class="text-[20px] font-medium mt-3">{{ $t('buy.chooseTariff') }}</p>

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
              <p
                v-for="point in purchaseOption.bullet_points"
                :key="point.value"
                class="text-gray-400"
              >
                {{ point.value }}
              </p>
            </div>
          </n-radio>
        </n-space>

        <AppDivider class="my-[24px]" />
      </template>

      <p class="text-[20px] font-medium mt-3 mb-4">
        {{ $t('buy.photo') }}
      </p>

      <n-space>
        <n-radio
          :checked="buyForm.photo === 'yes'"
          value="yes"
          name="photo"
          @change="buyForm.photo = 'yes'"
        >
          {{ $t('buy.yes') }}
        </n-radio>

        <n-radio
          class="ml-[12px]"
          :checked="buyForm.photo === 'no'"
          value="no"
          name="photo"
          @change="buyForm.photo = 'no'"
        >
          {{ $t('buy.no') }}
        </n-radio>
      </n-space>

      <AppDivider class="my-[24px]" />

      <p class="text-[20px] font-medium mt-3 mb-4">
        {{ $t('buy.alone') }}
      </p>

      <n-space>
        <n-radio
          :checked="buyForm.alone === 'yes'"
          value="yes"
          name="photo"
          @change="buyForm.alone = 'yes'"
        >
          {{ $t('buy.yes') }}
        </n-radio>

        <n-radio
          class="ml-[12px]"
          :checked="buyForm.alone === 'no'"
          value="no"
          name="photo"
          @change="buyForm.alone = 'no'"
        >
          {{ $t('buy.no') }}
        </n-radio>
      </n-space>

      <AppDivider class="my-[24px]" />

      <p class="text-[20px] font-medium mt-3 mb-4">
        {{ $t('buy.feature') }}
      </p>

      <n-space>
        <n-radio
          :checked="buyForm.feature === 'yes'"
          value="yes"
          name="feature"
          @change="buyForm.feature = 'yes'"
        >
          {{ $t('buy.yes') }}
        </n-radio>

        <n-radio
          class="ml-[12px]"
          :checked="buyForm.feature === 'no'"
          value="no"
          name="feature"
          @change="buyForm.feature = 'no'"
        >
          {{ $t('buy.no') }}
        </n-radio>
      </n-space>

      <AppTextarea
        v-if="buyForm.feature === 'yes'"
        v-model:model-value="buyForm.comment"
        class="mt-3"
      />

      <AppDivider class="my-[24px]" />

      <p class="text-[20px] font-medium">
        {{ $t('buy.total') }}
        <span
          v-if="product?.purchase_options?.length > 0"
          class="text-green-700 mr-[8px]"
        >
          {{
            +(
              product?.purchase_options?.find(
                (purchaseOption: any) =>
                  purchaseOption?.id === buyForm?.purchase_option ||
                  purchaseOption.schedule_type === buyForm.schedule_type,
              )?.base_price || product.purchase_options[0]?.base_price
            )
          }}
          €
        </span>
        <span v-else class="text-brand-red mr-[8px]">0 €</span>
      </p>

      <AppButton
        :disabled="!isButtonActive"
        class="mt-4 lg:mt-10 w-full lg:w-auto flex justify-center items-center text-lg gap-3"
        @click="addAcademy"
      >
        {{ $t('buy.addCart') }}
        <img alt="Plus" src="/icons/plus.svg" />
      </AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NCheckbox, NRadio, NSpace } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppLoader from '../../../components/AppLoader.vue'
import AppTextarea from '../../../components/AppTextarea.vue'
import BuyProductCard from '../../../components/buy/BuyProductCard.vue'
import GetChildData from '../../../components/buy/GetChildData.vue'
import PaymentOptions from '../../../components/cms/blocks/products/details/PaymentOptions.vue'
import SelectTagsBlock from '../../../components/misc/SelectTagsBlock.vue'
import { useCartStore } from '../../../store/cart'
import { useUserStore } from '../../../store/user'
import type { OrderItem } from '../../../types'
import { getApiAddress } from '../../../utils/getApiAddress'

const route = useRoute()

const cart = useCartStore()
const user = useUserStore()

const { locale } = useI18n({ useScope: 'global' })

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
  alone: 'no',
  visitor: null,
} as unknown as Partial<OrderItem> & {
  first: boolean
  second: boolean
  comment: string
  feature: string
  photo: string
  alone: string
})

const { data: product, pending: productPending } = await useAsyncData(
  'products',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/products/${route.params.id}/`), {
      params: {
        locale: locale.value,
        fields: '*',
      },
    }),
  { watch: [locale], deep: true },
)

const addAcademy = async () => {
  let weeks = 0
  if (buyForm.value.first) weeks++
  if (buyForm.value.second) weeks++

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const schedule_slots =
    product?.value?.schedule_slots?.length > 0
      ? product?.value?.schedule_slots.map(item => item?.id)
      : [11]

  const productOrder = {
    academy_number_of_weeks: weeks || 1,
    product: route.params.id,
    // purchase_option:
    //   product.purchase_options.find(
    //     option => buyForm.value.schedule_type === option.type,
    //   )?.id || 0,
    purchase_option: product?.value?.purchase_options?.[0]?.id ?? 1,
    visitor: user.isLoggedIn ? buyForm.value.visitor : null,
    schedule_slots,
    product_page: product?.value?.id,
    comment: buyForm.value.comment,
  }

  await cart.addOrderItem(productOrder)
  navigateTo('/cart')
}

const isButtonActive = computed(
  () =>
    (buyForm.value.visitor !== null &&
      buyForm.value.visitor !== undefined &&
      ((product.value.product_type === 'Course' &&
        !!buyForm.value.purchase_option &&
        !!buyForm.value.schedule_slots?.length) ||
        (product.value.product_type === 'Academy' &&
          !!buyForm.value.academy_number_of_weeks))) ||
    (product.value.product_type === 'Workshop' && !!buyForm.value.comment),
)
</script>
