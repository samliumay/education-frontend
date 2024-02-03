<template>
  <div class="py-24 px-4 sm:px-12 bg-brand-light-gray">
    <h1 class="font-medium text-5xl mb-12 uppercase">Корзина</h1>

    <form
      ref="form"
      class="grid grid-cols-1 lg:grid-cols-3 gap-[24px]"
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
              v-model="registrationForm.first_name"
              placeholder="Имя родителя"
              required
              pattern=".{2,}"
              title="The name must contain at least two characters"
              @blur="checkValidity"
            />
            <AppInput
              v-model="registrationForm.last_name"
              placeholder="Фамилия родителя"
              required
              pattern=".{2,}"
              title="Last name must contain at least two characters"
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.email"
              placeholder="Email"
              type="email"
              required
              @blur="checkValidity"
            />
            <AppInput
              v-model="registrationForm.phone_number"
              placeholder="Телефон"
              maska="+49 ### ###-##-##"
              type="tel"
              required
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.password1"
              placeholder="Пароль"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              type="password"
              @blur="checkValidity"
            />
            <AppInput
              v-model="registrationForm.password2"
              placeholder="Повторите пароль"
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              @blur="checkValidity"
            />
          </div>
        </div>

        <div
          v-if="cart?.order?.items?.length > 0 && userStore.isLoggedIn"
          class="bg-white rounded-[12px] p-[24px]"
        >
          <h2 class="font-medium text-[24px] mb-6">Платежные реквизиты</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="additionalInfo.first_name"
              placeholder="First Name"
              required
              pattern=".{2,}"
              title="The name must contain at least two characters"
              @blur="checkValidity"
            />
            <AppInput
              v-model="additionalInfo.last_name"
              placeholder="Last Name"
              pattern=".{2,}"
              title="Last name must contain at least two characters"
              required
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model.lazy="additionalInfo.street"
              placeholder="Street Name"
              pattern=".{2,}"
              title="Street name must contain at least two characters"
              required
              @blur="checkValidity"
            />
            <AppInput
              v-model="additionalInfo.state"
              required
              placeholder="Street Number"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <AppInput
              v-model.lazy="additionalInfo.post_code"
              placeholder="PLZ (Postal Code)"
              pattern=".{2,}"
              title="Postal code must contain at least two characters"
              required
              @blur="checkValidity"
            />
            <AppInput
              v-model.lazy="additionalInfo.city"
              pattern=".{2,}"
              title="City must contain at least two characters"
              required
              placeholder="City"
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
                  {{ `${Number(item.calculated_price ?? 0).toFixed(2)} €` }}
                </span>
              </div>
              <div class="flex justify-between gap-[24px]">
                <span class="font-medium"> Сумма скидки </span>
                <span>
                  {{ `${Number(item?.discount_amount ?? 0).toFixed(2)} €` }}
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

            <p
              v-show="cart?.order?.items?.length"
              class="flex justify-between font-medium text-[24px] mt-[24px] mb-[24px]"
            >
              <span>Итого</span>
              <span>{{
                `${(cart?.order?.items || []).reduce((acc, item) => {
                  const newAcc =
                    Number(acc ?? 0) + Number(item.calculated_price ?? 0)
                  return Number(newAcc ?? 0).toFixed(2)
                }, 0)} €`
              }}</span>
            </p>

            <p
              v-show="!form?.checkValidity() ?? false"
              class="mb-2 text-brand-red text-sm"
            >
              {{ infoText }}
            </p>
            <AppButton
              v-show="cart?.order?.items?.length"
              class="w-full"
              type="submit"
              :disabled="!form?.checkValidity() ?? false"
            >
              {{ userStore.isLoggedIn ? 'Оформить заказ' : 'Регистрация' }}
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

const buyOption: Ref<'paypal' | 'stripe'> = ref('paypal')

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

const infoText = computed(() => {
  if (userStore.isLoggedIn) {
    return 'Для оплаты, пожалуйста, заполните платёжные реквизиты ниже'
  }

  return 'Пожалуйста, зарегистрируйтесь или войдите в свой аккаунт для оплаты'
})

// Registration
const registrationForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password1: '',
  password2: '',
})

const registrationError = ref('')

const clearError = () => {
  registrationError.value = ''
}

const signUp = async () => {
  await userStore.register(registrationForm.value).catch(err => {
    if (Object.keys(err).length !== 0) {
      registrationError.value = 'Кажется, что-то пошло не так'
      setTimeout(clearError, 2000)
    } else {
      registrationError.value = ''

      registrationForm.value.email = ''
      registrationForm.value.password1 = ''
      registrationForm.value.password2 = ''
      registrationForm.value.first_name = ''
      registrationForm.value.last_name = ''
      registrationForm.value.phone_number = ''
    }
  })

  if (!registrationError.value) {
    if (process.client) {
      const visitors = JSON.parse(
        window.localStorage.getItem('visitors') || '[]',
      )
      console.debug(visitors)
      await userStore.postVisitor(visitors[0])

      // Update visitors for items in cart
      const ids = cart?.order?.items?.map(item => item.id)
      await Promise.all(
        ids.map(id => cart.updateOrderItem(id, { visitor: visitors[0].id })),
      )
      await cart.getCurrentOrder()
    }
  }
}

const fullfillOrder = async () => {
  if (!userStore.isLoggedIn) {
    await signUp()
    return null
  }

  const urlObject = await cart.fulfillOrder(
    buyOption.value,
    String(window.location).replace('cart', ''),
  )
  window.location.href =
    buyOption.value === 'paypal' ? urlObject.links[1] : urlObject.url
}
</script>
