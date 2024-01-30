<template>
  <div class="py-24 px-4 sm:px-12 bg-brand-light-gray">
    <h1 class="font-medium text-5xl mb-12 uppercase">Корзина</h1>

    <form
      ref="form"
      class="grid grid-cols-1 sm:grid-cols-3 gap-[24px]"
      @submit.prevent="fullfillOrder"
    >
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
                class="absolute translate-x-12 left-2/4 -top-8"
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
                src="/icons/products/star.svg"
                alt="star"
                class="absolute -translate-x-10 left-2/4 -top-6"
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
                alt="mountain"
                class="absolute translate-x-12 left-2/4 -bottom-5"
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
          v-if="!userStore.isLoggedIn"
          class="bg-white rounded-[12px] p-[24px]"
        >
          <h2 class="font-medium text-[24px] mb-6">Регистрация</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.name"
              placeholder="Имя родителя"
            />
            <AppInput
              v-model="registrationForm.surname"
              placeholder="Фамилия родителя"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.email"
              placeholder="Email"
              type="email"
            />
            <AppInput
              v-model="registrationForm.phone"
              placeholder="Телефон"
              maska="+49 ### ###-##-##"
              type="tel"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.password"
              placeholder="Пароль"
              type="password"
            />
            <AppInput
              v-model="registrationForm.repeatPassword"
              placeholder="Повторите пароль"
              type="password"
            />
          </div>
        </div>

        <div
          v-if="cart?.order?.items?.length"
          class="bg-white rounded-[12px] p-[24px]"
        >
          <h2 class="font-medium text-[24px] mb-6">Платежные реквизиты</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="additionalInfo.first_name"
              placeholder="Имя"
              required
              pattern=".{2,}"
              title="The name must contain at least two characters"
              @blur="checkValidity"
            />
            <AppInput
              v-model="additionalInfo.last_name"
              placeholder="Фамилия"
              pattern=".{2,}"
              title="Last name must contain at least two characters"
              required
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="additionalInfo.country"
              placeholder="Страна"
              pattern=".{2,}"
              title="Country must contain at least two characters"
              required
              @blur="checkValidity"
            />
            <AppInput
              v-model="additionalInfo.city"
              placeholder="Город"
              pattern=".{2,}"
              title="City must contain at least two characters"
              required
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput v-model="additionalInfo.state" placeholder="Штат" />
            <AppInput
              v-model="additionalInfo.street"
              placeholder="Улица"
              pattern=".{2,}"
              title="Street must contain at least two characters"
              required
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <AppInput
              v-model="additionalInfo.post_code"
              placeholder="Дом"
              required
              @blur="checkValidity"
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
            <h2 class="font-medium text-2xl mb-4">Подробности заказа</h2>

            <template v-for="(item, idx) in cart.order.items" :key="item.id">
              <div class="flex justify-between gap-[24px] mb-2">
                <span class="font-medium">
                  {{ item.product_page?.name }}
                </span>
                <span>
                  {{ `${item.calculated_price} €` }}
                </span>
              </div>
              <div class="flex justify-between gap-[24px]">
                <span class="font-medium"> Сумма скидки </span>
                <span>
                  {{ `${item?.discount_amount} €` }}
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

            <p v-show="cart?.order?.items?.length" class="flex justify-between font-medium text-[24px] mt-[24px] mb-[24px]">
              <span>Итого</span>
              <span>{{
                `${(cart?.order?.items || []).reduce((acc, item) => {
                  acc = acc + +item.calculated_price
                  return acc
                }, 0)} €`
              }}</span>
            </p>

            <p v-show="!form?.checkValidity() ?? false" class="mb-2 text-brand-gray text-sm">Для оплаты, пожалуйста, заполните платёжные реквизиты ниже</p>
            <AppButton
              v-show="cart?.order?.items?.length"
              class=" w-full"
              type="submit"
              :disabled="!form?.checkValidity() ?? false"
            >
              Перейти к оплате
            </AppButton>
          </div>
        </div>
      </ErrorBoundaryBlock>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, type Ref, ref, type VNodeRef } from 'vue'

import AppButton from '../components/AppButton.vue'
import AppDivider from '../components/AppDivider.vue'
import AppInput from '../components/AppInput.vue'
import CartBuyOptions from '../components/cart/CartBuyOptions.vue'
import CartItem from '../components/cart/CartItem.vue'
import EmptyCart from '../components/cart/EmptyCart.vue'
import { useCartStore } from '../store/cart'
import { useUserStore } from '../store/user'
import type { AdditionalInfo } from '../types'

const userStore = useUserStore()
const cart = useCartStore()
await cart.getCurrentOrder()

const additionalInfo: Ref<AdditionalInfo> = ref({
  first_name: userStore?.user?.first_name ?? '',
  last_name: userStore?.user?.last_name ?? '',
} as AdditionalInfo)

const registrationForm = ref({
  name: '',
  surname: '',
  email: '',
  phone: '',
  password: '',
  repeatPassword: '',
})

const buyOption: Ref<'paypal' | 'stripe'> = ref('paypal')

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

// Form
const checkValidity = (event: { target: { reportValidity: () => void } }) => {
  event.target.reportValidity()
}

const form = ref<VNodeRef | undefined>(undefined)
const isDisabledButton = computed(() => {
  const isHaveItems = !!cart?.order?.items?.length
  const isFilledForm = !form.value?.checkValidity() ?? false

  console.debug('isHaveItems', isHaveItems)
  console.debug('isFilledForm', isFilledForm)

  return isFilledForm
})
</script>
