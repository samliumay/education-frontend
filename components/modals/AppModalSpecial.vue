<template>
  <n-modal :show="isOpen" @mask-click="$emit('close')">
    <div
      class="fixed w-[96%] h-[96%] bg-white rounded-md top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 overflow-y-auto"
    >
      <div class="flex flex-col">
        <div
          class="flex justify-end items-center border-b-[1px] border-black py-[16px]"
        >
          <div
            class="flex gap-[20px] items-center mr-10"
            @click="$emit('close')"
          >
            {{ $t('common.actions.close') }}
            <button
              class="bg-white border-[1px] border-brand-black w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-brand-light-gray transition ease-in delay-100 transform active:scale-[0.93]"
            >
              <img
                src="/icons/cross.svg"
                alt="close"
                class="w-[15px] h-[15px]"
              />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-[44px] m-10">
          <div v-if="!productPending">
            <p class="text-[24px] font-medium mb-[16px]">
              {{ $t('common.modals.youChoosed') }}
            </p>
            <BuyProductCard :product="product" />
          </div>

          <div>
            <h1 class="font-medium text-4xl mb-10">
              {{ $t('common.modals.fillApplication') }}
            </h1>

            <GetChildData
              :visitor="visitor"
              @update:visitor="el => (visitor = el)"
            />

            <form
              ref="form"
              class="flex flex-col gap-2 mt-10 relative"
              @submit.prevent="sendModalCourse"
            >
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-[12px]">
                <AppInput
                  v-model="registrationForm.first_name"
                  :placeholder="$t('cart.registerDetails.name')"
                  required
                  pattern=".{2,}"
                  title="The name must contain at least two characters"
                  @blur="checkValidity"
                />
                <AppInput
                  v-model="registrationForm.last_name"
                  :placeholder="$t('cart.registerDetails.surname')"
                  required
                  pattern=".{2,}"
                  title="Last name must contain at least two characters"
                  @blur="checkValidity"
                />
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-[12px]">
                <AppInput
                  v-model="registrationForm.email"
                  :placeholder="$t('cart.registerDetails.email')"
                  type="email"
                  required
                  @blur="checkValidity"
                />
                <AppInput
                  v-model="registrationForm.phone"
                  :placeholder="$t('cart.registerDetails.phone')"
                  maska="+49 ### ###-##-##"
                  type="tel"
                  required
                  @blur="checkValidity"
                />
              </div>

              <AppButton
                class="w-full mt-10"
                type="submit"
                :disabled="!form?.checkValidity() ?? false"
              >
                {{ $t('common.actions.send') }}
              </AppButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { NModal } from 'naive-ui'
import { computed, ref, type VNodeRef } from 'vue'

import AppInput from '@/components/AppInput.vue'
import BuyProductCard from '@/components/buy/BuyProductCard.vue'
import GetChildData from '@/components/buy/GetChildData.vue'
// import { useCartStore } from '@/store/cart'
// import { useUserStore } from '@/store/user'
import { getApiAddress } from '@/utils/getApiAddress'

const props = defineProps<{
  isOpen: boolean
  itemId?: number
}>()
// Init component
const emit = defineEmits(['close'])
// Init hooks

// Store
// const userStore = useUserStore()
// const cartStore = useCartStore()

// State
// eslint-disable-next-line vue/require-typed-ref
const visitor = ref(null)

const { locale } = useI18n({ useScope: 'global' })

// Get data
const itemId = computed(() => props.itemId)

const { data: product, pending: productPending } = await useAsyncData(
  'specialOffers',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/special-offers/${itemId.value}/`), {
      params: {
        locale: locale.value,
        fields: '*',
      },
    }),
  { watch: [locale], deep: true },
)

// Registration
const registrationForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

// eslint-disable-next-line require-await
const sendModalCourse = async () => {
  // await cartStore.sendVisitRequest({
  //   product_page: route.params.id,
  //   children: [userStore.visitors.find((el) => el.id === visitor.value)],
  //   adults: [registrationForm.value],
  // })
  emit('close')
}

// Form
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget.focus()
}

const form = ref<VNodeRef | undefined>(undefined)
</script>
