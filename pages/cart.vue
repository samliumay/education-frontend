<template>
  <div class="relative py-24 px-4 md:px-12 bg-brand-light-gray">
    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
    />
    <h1
      class="font-medium text-[32px] md:text-[56px] mb-12 uppercase relative text-brand-black"
    >
      {{ $t('cart.title') }}
    </h1>

    <form
      ref="form"
      class="grid grid-cols-1 lg:grid-cols-3 gap-[24px] relative"
      @submit.prevent="fullfillOrder"
    >
      <div class="md:col-span-2 flex flex-col gap-[24px]">
        <ErrorBoundaryBlock>
          <div class="bg-white rounded-xl p-6">
            <h2 class="font-medium text-[24px] mb-[24px]">
              {{ $t('cart.courses') }}
            </h2>

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
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex flex-col md:flex-row justify-center md:justify-between items-center cursor-pointer relative overflow-hidden"
              @click="navigateTo('/courses')"
            >
              <div class="relative flex flex-col text-center md:text-left">
                <p>{{ $t('cart.choosingNextCourse') }}</p>
                <p>{{ $t('cart.chooseDifferentCourse') }}</p>
              </div>

              <img
                src="/icons/products/boxes.svg"
                alt="book"
                class="block md:absolute md:translate-x-12 left-2/4 -top-8"
              />

              <div
                class="w-full md:w-auto justify-center relative border-brand-black rounded-lg text-brand-black bg-white border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
              >
                {{ $t('cart.goToCatalog') }}
              </div>
            </div>
          </div>
        </ErrorBoundaryBlock>

        <ErrorBoundaryBlock>
          <div class="bg-white rounded-xl p-6">
            <h2 class="font-medium text-[24px] mb-[24px]">
              {{ $t('cart.academies') }}
            </h2>
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
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex flex-col md:flex-row justify-center md:justify-between items-center cursor-pointer relative overflow-hidden"
              @click="navigateTo('/academies')"
            >
              <div class="text-center md:text-left flex flex-col relative">
                <p>{{ $t('cart.choosingNextAcademy') }}</p>
                <p>{{ $t('cart.chooseDifferentAcademy') }}</p>
              </div>

              <img
                src="/icons/products/star.svg"
                alt="star"
                class="block md:absolute md:-translate-x-10 left-2/4 -top-6"
              />

              <div
                class="w-full md:w-auto justify-center relative border-brand-black rounded-lg text-brand-black bg-white border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
              >
                {{ $t('cart.goToCatalog') }}
              </div>
            </div>
          </div>
        </ErrorBoundaryBlock>

        <ErrorBoundaryBlock>
          <div class="bg-white rounded-xl p-6">
            <h2 class="font-medium text-[24px] mb-[24px]">
              {{ $t('cart.workshops') }}
            </h2>
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
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex flex-col md:flex-row justify-center md:justify-between items-center cursor-pointer relative overflow-hidden"
            >
              <div class="text-center md:text-left relative flex flex-col">
                <p>{{ $t('cart.choosingNextWorkshop') }}</p>
                <p>{{ $t('cart.chooseDifferentWorkshop') }}</p>
              </div>

              <img
                src="/icons/products/mountain.svg"
                alt="mountain"
                class="block md:absolute md:translate-x-12 left-2/4 -bottom-5"
              />

              <div
                class="w-full md:w-auto justify-center relative border-brand-black rounded-lg text-brand-black bg-white border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
                @click="navigateTo('/workshops')"
              >
                {{ $t('cart.goToCatalog') }}
              </div>
            </div>
          </div>
        </ErrorBoundaryBlock>

        <div
          v-if="!userStore.isLoggedIn"
          class="bg-white rounded-[12px] p-[24px]"
        >
          <h2 class="font-medium text-[24px] mb-6">
            {{ $t('cart.registerDetails.title') }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.first_name"
              :placeholder="$t('cart.registerDetails.name')"
              required
              pattern=".{2,}"
              title="The name must contain at least two characters"
              autocomplete="off"
              @blur="checkValidity"
            />
            <AppInput
              v-model="registrationForm.last_name"
              :placeholder="$t('cart.registerDetails.surname')"
              required
              pattern=".{2,}"
              title="Last name must contain at least two characters"
              autocomplete="off"
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.email"
              placeholder="Email"
              type="email"
              required
              autocomplete="off"
              @blur="checkValidity"
            />
            <AppInput
              v-model="registrationForm.phone_number"
              :placeholder="$t('cart.registerDetails.phone')"
              maska="+49 ### ###-##-##"
              type="tel"
              required
              autocomplete="off"
              @blur="checkValidity"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput
              v-model="registrationForm.password1"
              :placeholder="$t('cart.registerDetails.password')"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              type="password"
              autocomplete="off"
              @blur="checkValidity"
            />
            <AppInput
              v-model="registrationForm.password2"
              :placeholder="$t('cart.registerDetails.repeatPassword')"
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              autocomplete="off"
              @blur="checkValidity"
            />
          </div>
        </div>
      </div>

      <ErrorBoundaryBlock>
        <div>
          <div class="bg-white rounded-[12px] p-[24px]">
            <h2 class="font-medium text-2xl mb-4">
              {{ $t('cart.order.title') }}
            </h2>

            <template v-for="(item, idx) in cart.order.items" :key="item.id">
              <div class="flex justify-between gap-[24px] mb-2">
                <span class="font-medium">
                  {{ item.product_page?.name }}
                </span>
                <span>
                  {{ `${Number(item.calculated_price ?? 0).toFixed(2)} €` }}
                </span>
              </div>

              <AppDivider
                v-if="idx + 1 !== cart.order.items.length"
                class="my-[24px]"
              />
            </template>

            <p
              v-show="cart?.order?.items?.length"
              class="flex justify-between font-medium text-[20px] mt-[24px] mb-[12px]"
            >
              <span>{{ $t('cart.order.discountAmount') }}</span>
              <span class="text-brand-green">{{
                `-${(cart?.order?.items || []).reduce((acc, item) => {
                  const newAcc =
                    Number(acc ?? 0) + Number(item.discount_amount ?? 0)
                  return Number(newAcc ?? 0).toFixed(2)
                }, 0)} €`
              }}</span>
            </p>

            <div v-if="cart?.order?.items?.length > 0">
              <AppInput
                v-model="promocode"
                :placeholder="$t('cart.promocode.input')"
                class="mt-[24px] w-full"
                :disabled="promocodeStatus === 'success'"
                @blur="setPromocode"
                @enter="setPromocode"
              />

              <p v-if="promocodeStatus === 'success'" class="text-brand-green">
                {{ $t('cart.promocode.success') }}
              </p>
              <p v-if="promocodeStatus === 'fail'" class="text-brand-red">
                {{ $t('cart.promocode.fail') }}
              </p>
            </div>

            <p
              v-show="cart?.order?.items?.length"
              class="flex justify-between font-medium text-[24px] mb-[24px]"
            >
              <span>{{ $t('cart.order.total') }}</span>
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
              class="mb-2 text-brand-red text-md"
            >
              {{ infoText }}
            </p>
            <div v-show="form?.checkValidity() && cart?.order?.items?.length">
              <AppButton
                class="w-full"
                type="submit"
                :disabled="!form?.checkValidity() ?? false"
              >
                {{
                  userStore.isLoggedIn
                    ? $t('cart.payment.stripe')
                    : $t('cart.button.registration')
                }}
              </AppButton>
              <div
                v-show="userStore.isLoggedIn"
                id="paypal-checkout"
                class="mt-4 rounded-[12px]"
              />
            </div>
          </div>
        </div>
      </ErrorBoundaryBlock>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, type VNodeRef } from 'vue'
import { useI18n } from 'vue-i18n'

import AppButton from '../components/AppButton.vue'
import AppDivider from '../components/AppDivider.vue'
import AppInput from '../components/AppInput.vue'
import CartItem from '../components/cart/CartItem.vue'
import EmptyCart from '../components/cart/EmptyCart.vue'
import { useCartStore } from '../store/cart'
import { useUserStore } from '../store/user'

const { t } = useI18n()

const userStore = useUserStore()
const cart = useCartStore()
await cart.getCurrentOrder()

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
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget?.focus()
}

const form = ref<VNodeRef | undefined>(undefined)

const infoText = computed(() => {
  if (userStore.isLoggedIn) {
    return t('cart.order.fillOutPaymentDetails')
  }

  return t('cart.order.pleaseRegister')
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
      registrationError.value = t('common.somethingWrong')
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

// eslint-disable-next-line consistent-return
const fullfillOrder = async () => {
  if (!userStore.isLoggedIn) {
    await signUp()
    return null
  }

  const urlObject = await cart.fulfillOrder(
    'stripe',
    `${String(window.location).replace(
      'cart',
      '',
    )}profile?tab=sales&payment=success`,
    `${String(window.location).replace(
      'cart',
      '',
    )}profile?tab=sales&payment=fail`,
  )
  await cart.resetCart()
  window.location.href = urlObject.url
}
onMounted(() => {
  usePaypalButton({
    createOrder() {
      return cart.paypalFulfillOrder().then((data: any) => {
        cart.resetCart()
        return data.id
      })
    },
    onApprove(data: any) {
      // eslint-disable-next-line no-console
      return cart.captureOrder(data.orderID, data).then(() => {
        setTimeout(() => cart.getCurrentOrder(), 200)
        navigateTo('/profile?tab=sales&payment=success')
      })
    },
    onCancel() {
      cart.getCurrentOrder()
      navigateTo('/profile?tab=sales&payment=fail')
    },
  })
})
</script>
