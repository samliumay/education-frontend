<template>
  <AppSignIn :is-open="isOpenSignIn" @close="isOpenSignIn = false" />
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
      <div class="md:col-span-2 flex flex-col gap-[24px] currentLocaleClass">
        <ErrorBoundaryBlock :class="currentLocale === 'ru' ? 'order-2' : 'order-1'">
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
            <RecommendationBlock
              :block-data="
                courseProducts
                  .map(product => product.product_page.recommendations)
                  .flat()
              "
            />
            <div
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex flex-col md:flex-row justify-center md:justify-between items-center cursor-pointer relative overflow-hidden"
              @click="navigateTo('/courses')"
            >
              <div class="relative flex flex-col text-left">
                <p>
                  {{ $t('cart.choosingNextCourse') }}
                  <br class="hidden md:block" />
                  {{ $t('cart.chooseDifferentCourse') }}
                </p>
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

        <ErrorBoundaryBlock :class="currentLocale === 'ru' ? 'order-1' : 'order-2'">
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
            <RecommendationBlock
              :block-data="
                academyProducts
                  .map(product => product.product_page.recommendations)
                  .flat()
              "
            />
            <div
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex flex-col md:flex-row justify-center md:justify-between items-center cursor-pointer relative overflow-hidden"
              @click="navigateTo('/academies')"
            >
              <div class="text-left flex flex-col relative">
                <p>
                  {{ $t('cart.choosingNextAcademy') }}
                  <br class="hidden md:block" />
                  {{ $t('cart.chooseDifferentAcademy') }}
                </p>
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

        <ErrorBoundaryBlock class="order-3">
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
            <RecommendationBlock
              :block-data="
                workshopProducts
                  .map(product => product.product_page.recommendations)
                  .flat()
              "
            />
            <div
              class="bg-brand-light-gray rounded-xl text-brand-red p-[16px] mt-[24px] flex flex-col md:flex-row justify-center md:justify-between items-center cursor-pointer relative overflow-hidden"
            >
              <div class="text-left relative flex flex-col">
                <p>
                  {{ $t('cart.choosingNextWorkshop') }}
                  <br class="hidden md:block" />
                  {{ $t('cart.chooseDifferentWorkshop') }}
                </p>
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
      </div>

      <ErrorBoundaryBlock>
        <div>
          <div class="flex flex-col bg-white rounded-[12px] p-[24px]">
            <h2 class="font-medium text-2xl mb-4">
              {{ $t('cart.order.title') }}
            </h2>
            <div :class="currentLocale === 'ru' ? 'order-2' : 'order-1'">
              <template v-for="(item, idx) in cart.order.items.filter(i => i.product_page.product_type === 'Course')" :key="item.id">
                <div class="flex justify-between gap-[24px] mb-2">
                  <span class="font-medium">
                    {{ item.product_page?.name }}
                  </span>
                  <span>
                    {{
                      `${
                        Math.floor(Number(item.calculated_price)) !==
                        Number(item.calculated_price)
                          ? Number(item.calculated_price ?? 0).toFixed(2)
                          : item.calculated_price
                      } €`
                    }}
                  </span>
                </div>

                <AppDivider
                  v-if="idx + 1 !== cart.order.items.length"
                  class="my-[24px]"
                />
              </template>
            </div>
            <div :class="currentLocale === 'ru' ? 'order-1' : 'order-2'">
              <template v-for="(item, idx) in cart.order.items.filter(i => i.product_page.product_type === 'Academy')" :key="item.id">
                <div class="flex justify-between gap-[24px] mb-2">
                  <span class="font-medium">
                    {{ item.product_page?.name }}
                  </span>
                  <span>
                    {{
                      `${
                        Math.floor(Number(item.calculated_price)) !==
                        Number(item.calculated_price)
                          ? Number(item.calculated_price ?? 0).toFixed(2)
                          : item.calculated_price
                      } €`
                    }}
                  </span>
                </div>

                <AppDivider
                  v-if="idx + 1 !== cart.order.items.length"
                  class="my-[24px]"
                />
              </template>
            </div>
            <div class="order-3">
              <template v-for="(item, idx) in cart.order.items.filter(i => i.product_page.product_type === 'Workshop')" :key="item.id">
                <div class="flex justify-between gap-[24px] mb-2">
                  <span class="font-medium">
                    {{ item.product_page?.name }}
                  </span>
                  <span>
                    {{
                      `${
                        Math.floor(Number(item.calculated_price)) !==
                        Number(item.calculated_price)
                          ? Number(item.calculated_price ?? 0).toFixed(2)
                          : item.calculated_price
                      } €`
                    }}
                  </span>
                </div>

                <AppDivider
                  v-if="idx + 1 !== cart.order.items.length"
                  class="my-[24px]"
                />
              </template>
            </div>
            <div class="order-4">
              <p
                v-show="
                  cart?.order?.items?.length && !hasOnlySubscriptionsProduct
                "
                class="flex justify-between font-medium text-[20px] mt-[24px] mb-[12px]"
              >
                <span>{{ $t('cart.totalCheckout') }}</span>
                <span>{{ cart?.order?.total_checkout_price }} €</span>
              </p>

              <p
                v-show="cart?.order?.items?.length"
                class="flex justify-between font-medium text-[20px] mt-[24px] mb-[12px]"
              >
                <span>{{ $t('cart.totalRecurrent') }}</span>
                <span>{{ cart?.order?.total_recurrent_price }} €</span>
              </p>

              <p
                v-show="cart?.order?.items?.length"
                class="flex justify-between font-medium text-[20px] mt-[24px] mb-[12px]"
              >
                <span>{{ $t('cart.order.discountAmount') }}</span>
                <span class="text-brand-green">{{
                  `-${(cart?.order?.items || []).reduce((acc, item) => {
                    const newAcc =
                      Number(acc ?? 0) + Number(item.discount_amount ?? 0)
                    return Number(newAcc ?? 0).toFixed(
                      Number(newAcc ?? 0) !== Math.floor(Number(newAcc ?? 0))
                        ? 2
                        : 0,
                    )
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
                    return Number(newAcc ?? 0).toFixed(
                      Number(newAcc ?? 0) !== Math.floor(Number(newAcc ?? 0))
                        ? 2
                        : 0,
                    )
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
                  class="w-full rounded-[4px] py-[2px]"
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
        </div>
      </ErrorBoundaryBlock>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, type VNodeRef } from 'vue'
import { useI18n } from 'vue-i18n'

import RecommendationBlock from '@/components/RecommendationBlock.vue'

import AppButton from '../components/AppButton.vue'
import AppDivider from '../components/AppDivider.vue'
import AppInput from '../components/AppInput.vue'
import CartItem from '../components/cart/CartItem.vue'
import EmptyCart from '../components/cart/EmptyCart.vue'
import { useCartStore } from '../store/cart'
import { useUserStore } from '../store/user'
import { useLocaleStore } from '../store/locale';
import ErrorBoundaryBlock
  from '@/components/cms/blocks/misc/ErrorBoundaryBlock.vue'

const { t } = useI18n()

const userStore = useUserStore()
const cart = useCartStore()
await cart.getCurrentOrder()

const localeStore = useLocaleStore();
const currentLocale = ref(localeStore.currentLocale);

const isOpenSignIn = ref(false)

const promocode = ref('')
const promocodeStatus = ref('empty')
const setPromocode = async () => {
  await cart
    .setPromocode(promocode.value)
    .then(async () => {
      promocodeStatus.value = 'success'
      await cart.getCurrentOrder()
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
const hasOnlySubscriptionsProduct = computed(() => {
  const productPurchases: boolean[] = []

  const hasNotOnlyCourse = cart?.order?.items?.some(
    item =>
      item.product_page.product_type === 'Academy' ||
      item.product_page.product_type === 'Workshop' ||
      item.product_page.product_type === 'Event',
  )

  if (hasNotOnlyCourse) return false

  cart?.order?.items?.forEach(item => {
    const purchaseOption = item.purchase_option
    let isSubscriptionOption = false

    item.product_page.purchase_options.forEach(option => {
      if (
        option.id === purchaseOption &&
        option.schedule_type.includes('Abonnement')
      ) {
        isSubscriptionOption = true
      }
    })

    productPurchases.push(isSubscriptionOption)
  })

  return productPurchases.every(item => item)
})

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

const form = ref<VNodeRef | undefined>(undefined)

const infoText = computed(() => {
  if (userStore.isLoggedIn) {
    return t('cart.order.fillOutPaymentDetails')
  }

  return t('cart.order.pleaseRegister')
})

// eslint-disable-next-line consistent-return
const fullfillOrder = async () => {
  if (!userStore.isLoggedIn) {
    isOpenSignIn.value = true
    return
  }

  const urlObject = await cart.fulfillOrder(
    'stripe',
    `${String(window.location).replace('cart', '')}profile?tab=sales-success`,
    `${String(window.location).replace('cart', '')}profile?tab=sales-fail`,
  )
  await cart.resetCart()
  localStorage.removeItem('notifyWasShown')
  window.location.href = urlObject.url
}
onMounted(() => {
  usePaypalButton({
    createOrder() {
      localStorage.removeItem('notifyWasShown')
      return cart.paypalFulfillOrder().then((data: any) => {
        cart.resetCart()
        return data.id
      })
    },
    onApprove(data: any) {
      // eslint-disable-next-line no-console
      return cart.captureOrder(data.orderID, data).then(() => {
        setTimeout(() => cart.getCurrentOrder(), 200)
        navigateTo('/profile?tab=sales-success')
      })
    },
    onCancel() {
      cart.getCurrentOrder()
      navigateTo('/profile?tab=sales-fail')
    },
  })
})

watch(
  () => localeStore.currentLocale,
  (newLocale) => {
    currentLocale.value = newLocale;
  }
);
</script>
