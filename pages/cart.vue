<template>
  <div class="mt-[96px] mx-[48px]">
    <h1 class="font-medium text-[48px]">Корзина</h1>

    <div class="grid grid-cols-3 gap-[24px]">
      <div class="col-span-2 flex flex-col gap-[24px]">
        <div class="bg-white rounded-[12px] p-[24px]">
          <h2 class="font-medium text-[24px] mb-[24px]">Постоянные курсы</h2>
          <template
            v-for="(course, idx) in cart?.order?.items?.filter(
              (item) => item.product.type === 'Course',
            ) || []"
            :key="course.id"
          >
            <CartItem :order="course" />
            <AppDivider
              v-if="
                cart?.order?.items?.filter &&
                idx + 1 !==
                  cart.order.items.filter(
                    (item) => item.product.type === 'Course',
                  ).length
              "
              class="my-[24px]"
            />
          </template>
          <div
            class="bg-orange-200 rounded-[12px] p-[16px] mt-[24px] flex justify-between items-center cursor-pointer"
            @click="navigateTo('/')"
          >
            <div class="flex flex-col">
              <p>При выборе следующего курса цена ниже</p>
              <p>Можно выбирать разные курсы</p>
            </div>

            <div
              class="border-black border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
            >
              Перейти в каталог
              <img
                src="../assets/icons/arrow_short_right.svg"
                alt="Arrow Right icon"
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[12px] p-[24px]">
          <h2 class="font-medium text-[24px] mb-[24px]">Академии</h2>
          <template
            v-for="(course, idx) in cart?.order?.items?.filter(
              (item) => item.product.type === 'Academy',
            ) || []"
            :key="course.id"
          >
            <CartItem :order="course" />
            <AppDivider
              v-if="
                cart?.order?.items?.filter &&
                idx + 1 !==
                  cart.order.items.filter(
                    (item) => item.product.type === 'Academy',
                  ).length
              "
              class="my-[24px]"
            />
          </template>
          <div
            class="bg-green-200 rounded-[12px] p-[16px] mt-[24px] flex justify-between items-center cursor-pointer"
            @click="navigateTo('/academies')"
          >
            <div class="flex flex-col">
              <p>При выборе следующей академии цена ниже</p>
              <p>Можно выбирать разные академии</p>
            </div>

            <div
              class="border-black border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
            >
              Перейти в каталог
              <img
                src="../assets/icons/arrow_short_right.svg"
                alt="Arrow Right icon"
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[12px] p-[24px]">
          <h2 class="font-medium text-[24px] mb-[24px]">Воркшопы</h2>
          <template
            v-for="(course, idx) in cart?.order?.items?.filter(
              (item) => item.product.type === 'Workshop',
            ) || []"
            :key="course.id"
          >
            <CartItem :order="course" />
            <AppDivider
              v-if="
                cart?.order?.items?.filter &&
                idx + 1 !==
                  cart.order.items.filter(
                    (item) => item.product.type === 'Workshop',
                  ).length
              "
              class="my-[24px]"
            />
          </template>
          <div
            class="bg-blue-200 rounded-[12px] p-[16px] mt-[24px] flex justify-between items-center cursor-pointer"
          >
            <div class="flex flex-col">
              <p>При выборе следующего воркшопа цена ниже</p>
              <p>Можно выбирать разные воркшопы</p>
            </div>

            <div
              class="border-black border-[1px] py-[12px] px-[24px] flex gap-[8px] items-center"
              @click="navigateTo('/workshops')"
            >
              Перейти в каталог
              <img
                src="../assets/icons/arrow_short_right.svg"
                alt="Arrow Right icon"
              />
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-[12px] p-[24px] flex justify-between items-center"
        >
          <h2 class="font-medium text-[24px]">
            Вы вошли как
            {{
              cart.order.payer_first_name
                ? `${cart.order.payer_first_name} ${cart.order.payer_last_name}`
                : ""
            }}
          </h2>
          <AppButton> Изменить </AppButton>
        </div>

        <div class="bg-white rounded-[12px] p-[24px]">
          <h2 class="font-medium text-[24px]">Платежные реквизиты</h2>

          <div class="grid grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput v-model="additionalInfo.first_name" placeholder="Имя" />
            <AppInput
              v-model="additionalInfo.last_name"
              placeholder="Фамилия"
            />
          </div>

          <div class="grid grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput v-model="additionalInfo.country" placeholder="Страна" />
            <AppInput v-model="additionalInfo.city" placeholder="Город" />
          </div>

          <div class="grid grid-cols-2 gap-[12px] mb-[12px]">
            <AppInput v-model="additionalInfo.state" placeholder="Штат" />
            <AppInput v-model="additionalInfo.street" placeholder="Улица" />
          </div>

          <div class="grid grid-cols-2 gap-[12px]">
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

        <div class="bg-white rounded-[12px] p-[24px]">
          <h2 class="font-medium text-[24px]">Способ оплаты</h2>
          <CartBuyOptions
            class="mt-[24px]"
            :option="buyOption"
            @select-option="(option) => (buyOption = option)"
          />
        </div>
      </div>

      <div>
        <div class="bg-white rounded-[12px] p-[24px]">
          <h2 class="font-medium text-[24px]">Подробности заказа</h2>

          <template v-for="(item, idx) in cart.order.items" :key="item.id">
            <div class="flex justify-between gap-[24px]">
              <span>
                {{ item.product.name }}
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

          <AppInput
            v-model="promocode"
            placeholder="Введите промокод"
            class="mt-[24px] w-full"
            @blur="setPromocode"
            @enter="setPromocode"
          />

          <p class="flex justify-between font-medium text-[24px] mt-[24px]">
            <span>Итого</span>
            <span>{{
              `${(cart?.order?.items || []).reduce((acc, item) => {
                acc = acc + +item.calculated_price;
                return acc;
              }, 0)} €`
            }}</span>
          </p>

          <AppButton class="mt-[24px] w-full" @click="fullfillOrder">
            Перейти к оплате
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from "vue"

import AppButton from "../components/AppButton.vue"
import AppDivider from "../components/AppDivider.vue"
import AppInput from "../components/AppInput.vue"
import CartBuyOptions from "../components/cart/CartBuyOptions.vue"
import CartItem from "../components/cart/CartItem.vue"
import { useCartStore } from "../store/cart"
import type { AdditionalInfo } from "../types"

const additionalInfo: Ref<AdditionalInfo> = ref({} as AdditionalInfo)

const buyOption: Ref<"paypal" | "stripe"> = ref("paypal")

const promocode = ref("")

const cart = useCartStore()

await cart.getCurrentOrder()

const fullfillOrder = async () => {
  const urlObject = await cart.fulfillOrder(buyOption.value, String(window.location).replace('cart', ''))
  window.location.href = buyOption.value === 'paypal' ? urlObject.links[1] : urlObject.url
}

const setPromocode = async () => {
  await cart.setPromocode(promocode.value)
  promocode.value = ''
}
</script>
