<template>
  <n-modal :show="isOpen" @mask-click="$emit('close')">
    <div
      class="fixed w-[96%] h-[96%] bg-white rounded-md top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 overflow-y-auto"
    >
      <div class="flex flex-col">
        <div
          class="flex justify-end items-center border-b-[1px] border-brand-black py-[16px]"
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

              <div class="w-full mt-5 flex gap-4">
                <NCheckbox v-model:checked="checkbox" required class="pt-1" />
                <p>
                  {{ $t('common.modals.registerInService') }}
                  <NuxtLink
                    to="/legal"
                    class="underline underline-offset-8 cursor-pointer text-brand-black hover:text-brand-red"
                  >
                    {{ $t('common.modals.termsOfAgreement') }}
                  </NuxtLink>
                </p>
              </div>

              <AppButton
                class="w-full mt-10"
                type="submit"
                :disabled="!(form?.checkValidity() && checkbox)"
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
import { NCheckbox, NModal } from 'naive-ui'
import { computed, ref, type VNodeRef } from 'vue'
import { useRoute } from 'vue-router'

import AppInput from '@/components/AppInput.vue'
import BuyProductCard from '@/components/buy/BuyProductCard.vue'
import GetChildData from '@/components/buy/GetChildData.vue'
import { getApiAddress } from '@/utils/getApiAddress'

defineProps<{
  isOpen: boolean
}>()
// Init component
const emit = defineEmits(['close'])

// Init hooks
const route = useRoute()

// State
// eslint-disable-next-line vue/require-typed-ref
const visitor = ref(null)
const checkbox = ref(false)

const { locale } = useI18n({ useScope: 'global' })

const isSlug = computed(() => !/^\d+$/.test(route.params.id as string))

// Get data
const { data: product, pending: productPending } = await useAsyncData(
  'productsModal',
  () =>
    $fetch(
      getApiAddress(
        isSlug.value
          ? `/api/v2/wagtail/products/`
          : `/api/v2/wagtail/products/${route.params.id}/`,
      ),
      {
        params: {
          locale: locale.value,
          fields: '*',
          slug: isSlug.value ? route.params.id : undefined,
        },
      },
    ).then(data => (isSlug.value ? data?.items[0] : data)),
  { watch: [locale, isSlug], deep: true },
)

// Registration
const registrationForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

const sendModalCourse = () => {
  emit('close')
}

// Form
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget?.focus()
}

const form = ref<VNodeRef | undefined>(undefined)
</script>
