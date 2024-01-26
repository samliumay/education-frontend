<template>
  <div class="py-24 px-4 sm:px-12 bg-brand-light-gray">
    <h1 class="font-medium text-5xl mb-12 uppercase">Корзина</h1>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-[24px]">
      <div class="sm:col-span-2 flex flex-col gap-[24px]">
        <ErrorBoundaryBlock>
          <div class="bg-white rounded-xl p-6">
            <h2 class="font-medium text-[24px] mb-[24px]">Постоянные курсы</h2>

            <template v-for="(course, idx) in courseProducts" :key="course.id">
              <CartItem :order="course" />
              <AppDivider
                v-if="
                  cart?.order?.items?.filter &&
                  idx + 1 !== courseProducts.length
                "
                class="my-[24px]"
              />
            </template>
            <EmptyCart v-if="!courseProducts.length" />

            <div
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex justify-between items-center cursor-pointer relative overflow-hidden"
              @click="navigateTo('/courses')"
            >
              <img
                src="/icons/products/boxes.svg"
                alt="book"
                class="absolute -translate-x-4 left-2/4 -top-10"
              />

              <div class="relative flex flex-col">
                <p>При выборе следующего курса цена ниже</p>
                <p>Можно выбирать разные курсы</p>
              </div>

              <div
                class="relative border-black rounded-lg text-black bg-white border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
              >
                Перейти в каталог
              </div>
            </div>
          </div>
        </ErrorBoundaryBlock>

        <ErrorBoundaryBlock>
          <div class="bg-white rounded-xl p-6">
            <h2 class="font-medium text-[24px] mb-[24px]">Академии</h2>
            <template v-for="(course, idx) in academyProducts" :key="course.id">
              <CartItem :order="course" />
              <AppDivider
                v-if="
                  cart?.order?.items?.filter &&
                  idx + 1 !== academyProducts.length
                "
                class="my-[24px]"
              />
            </template>
            <EmptyCart v-if="!academyProducts.length" />
            <div
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex justify-between items-center cursor-pointer relative overflow-hidden"
              @click="navigateTo('/academies')"
            >
              <img
                src="/icons/products/cap.svg"
                alt="cap"
                class="absolute translate-x-10 left-2/4 -top-5"
              />

              <div class="flex flex-col relative">
                <p>При выборе следующей академии цена ниже</p>
                <p>Можно выбирать разные академии</p>
              </div>

              <div
                class="relative border-black rounded-lg text-black bg-white border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
              >
                Перейти в каталог
              </div>
            </div>
          </div>
        </ErrorBoundaryBlock>

        <ErrorBoundaryBlock>
          <div class="bg-white rounded-xl p-6">
            <h2 class="font-medium text-[24px] mb-[24px]">Воркшопы</h2>
            <template
              v-for="(course, idx) in workshopProducts"
              :key="course.id"
            >
              <CartItem :order="course" />
              <AppDivider
                v-if="
                  cart?.order?.items?.filter &&
                  idx + 1 !== workshopProducts.length
                "
                class="my-[24px]"
              />
            </template>
            <EmptyCart v-if="!workshopProducts.length" />
            <div
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex justify-between items-center cursor-pointer relative overflow-hidden"
            >
              <img
                src="/icons/products/mountain.svg"
                alt="scroll"
                class="absolute -translate-x-4 left-2/4 -bottom-5"
              />

              <div class="relative flex flex-col">
                <p>При выборе следующего воркшопа цена ниже</p>
                <p>Можно выбирать разные воркшопы</p>
              </div>

              <div
                class="relative border-black rounded-lg text-black bg-white border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
                @click="navigateTo('/workshops')"
              >
                Перейти в каталог
              </div>
            </div>
          </div>
        </ErrorBoundaryBlock>

        <div
          v-if="cart?.order?.items?.length"
          class="bg-white rounded-[12px] p-[24px]"
        >
          <h2 class="font-medium text-[24px] mb-6">Платежные реквизиты</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput v-model="additionalInfo.first_name" placeholder="Имя" />
            <AppInput
              v-model="additionalInfo.last_name"
              placeholder="Фамилия"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput v-model="additionalInfo.country" placeholder="Страна" />
            <AppInput v-model="additionalInfo.city" placeholder="Город" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput v-model="additionalInfo.state" placeholder="Штат" />
            <AppInput v-model="additionalInfo.street" placeholder="Улица" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <AppInput
              v-model="additionalInfo.post_code"
              placeholder="Почтовый индекс"
            />
            <AppInput
              v-model="additionalInfo.company_name"
              placeholder="Название компании"
            />
          </div>
        </div>

        <div
          v-if="cart?.order?.items?.length"
          class="bg-white rounded-[12px] p-[24px]"
        >
          <h2 class="font-medium text-[24px] mb-6">Способ оплаты</h2>
          <CartBuyOptions
            :option="buyOption"
            @select-option="option => (buyOption = option)"
          />
        </div>
      </div>

      <ErrorBoundaryBlock>
        <div>
          <div class="bg-white rounded-[12px] p-[24px]">
            <h2 class="font-medium text-[24px] mb-4">Подробности заказа</h2>

            <template v-for="(item, idx) in cart.order.items" :key="item.id">
              <div class="flex justify-between gap-[24px]">
                <span>
                  {{ item.product_page?.name }}
                </span>
                <span>
                  {{ `${item.calculated_price} €` }}
                </span>
              </div>

              <AppDivider
                v-if="idx + 1 !== cart.order.items.length"
                class="my-[24px]"
              />
            </template>

            <div v-if="cart?.order?.items?.length > 0">
              <AppInput
                v-model="promocode"
                placeholder="Введите промокод"
                class="mt-[24px] w-full"
                :disabled="promocodeStatus === 'success'"
                @blur="setPromocode"
                @enter="setPromocode"
              />

              <p v-if="promocodeStatus === 'success'" class="text-brand-green">
                Промокод успешно добавлен
              </p>
              <p v-if="promocodeStatus === 'fail'" class="text-brand-red">
                Неверный промокод
              </p>
            </div>
            <p v-else class="text-brand-gray mt-2">
              Для оформления заказа, выберите в корзине товары, которые хотите
              купить
            </p>

            <p class="flex justify-between font-medium text-[24px] mt-[24px]">
              <span>Итого</span>
              <span>{{
                `${(cart?.order?.items || []).reduce((acc, item) => {
                  acc = acc + +item.calculated_price
                  return acc
                }, 0)} €`
              }}</span>
            </p>

            <AppButton
              class="mt-[24px] w-full"
              :disabled="!cart?.order?.items?.length"
              @click="fullfillOrder"
            >
              Перейти к оплате
            </AppButton>
          </div>
        </div>
      </ErrorBoundaryBlock>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from 'vue'

import AppButton from '../components/AppButton.vue'
import AppDivider from '../components/AppDivider.vue'
import AppInput from '../components/AppInput.vue'
import CartBuyOptions from '../components/cart/CartBuyOptions.vue'
import CartItem from '../components/cart/CartItem.vue'
import EmptyCart from '../components/cart/EmptyCart.vue'
import { useCartStore } from '../store/cart'
import type { AdditionalInfo } from '../types'

const additionalInfo: Ref<AdditionalInfo> = ref({} as AdditionalInfo)

const buyOption: Ref<'paypal' | 'stripe'> = ref('paypal')

const cart = useCartStore()
await cart.getCurrentOrder()

const fullfillOrder = async () => {
  const urlObject = await cart.fulfillOrder(
    buyOption.value,
    String(window.location).replace('cart', ''),
  )
  window.location.href =
    buyOption.value === 'paypal' ? urlObject.links[1] : urlObject.url
}

const promocode = ref('')
const promocodeStatus = ref('empty')
const setPromocode = async () => {
  await cart
    .setPromocode(promocode.value)
    .then(() => {
      promocodeStatus.value = 'success'
    })
    .catch(err => {
      promocodeStatus.value = 'fail'
      setTimeout(() => {
        promocodeStatus.value = 'empty'
      }, 2000)
      console.error('Error adding a promocode: ', err)
    })
}

// Products
const courseProducts = computed(
  () =>
    cart?.order?.items?.filter(
      item => item.product_page.product_type === 'Course',
    ) || [],
)
const academyProducts = computed(
  () =>
    cart?.order?.items?.filter(
      item => item.product_page.product_type === 'Academy',
    ) || [],
)
const workshopProducts = computed(
  () =>
    cart?.order?.items?.filter(
      item =>
        item.product_page.product_type === 'Workshop' ||
        item.product_page.product_type === 'Event',
    ) || [],
)
</script>
