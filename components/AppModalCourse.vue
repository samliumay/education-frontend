<template>
  <Teleport to="body">
    <div
      class="top-0 left-0 w-screen h-screen bg-brand-light-gray bg-opacity-30 fixed"
      @click="$emit('close')"
    />
    <div
      class="fixed w-[95%] h-[95%] bg-white rounded-md top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
    >
      <div
        class="flex justify-end items-center border-b-[1px] border-black py-[16px]"
      >
        <div class="flex gap-[20px] items-center mr-10" @click="$emit('close')">
          Закрыть
          <button
            class="bg-white border-[1px] border-brand-black w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-brand-light-gray transition ease-in delay-100 transform active:scale-[0.93]"
            @click="close"
          >
            <img src="/icons/cross.svg" alt="close" class="w-[15px] h-[15px]" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-[44px] m-10">
        <div v-if="!productPending">
          <p class="text-[24px] font-medium mb-[16px]">Вы выбрали</p>
          <BuyProductCard :product="product" />
        </div>

        <div>
          <h1 class="font-medium text-4xl mb-10">Заполните заявку</h1>

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

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-[12px]">
              <AppInput
                v-model="registrationForm.email"
                placeholder="Email"
                type="email"
                required
                @blur="checkValidity"
              />
              <AppInput
                v-model="registrationForm.phone"
                placeholder="Телефон"
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
              Оформить
            </AppButton>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref, type VNodeRef } from 'vue'
import { useRoute } from 'vue-router'

import BuyProductCard from '@/components/buy/BuyProductCard.vue'
import GetChildData from '@/components/buy/GetChildData.vue'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { getApiAddress } from '@/utils/getApiAddress'

import AppInput from './AppInput.vue'

// Init component
const emit = defineEmits(['close'])

// Init hooks
const route = useRoute()

// Store
const userStore = useUserStore()
const cartStore = useCartStore()

// State
const visitor = ref(null)

// Get data
const { data: product, pending: productPending } = await useFetch(
  getApiAddress(`/api/v2/wagtail/products/${route.params.id}/?fields=*`),
  { deep: true },
)

// Registration
const registrationForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

const sendModalCourse = async () => {
  // await cartStore.sendVisitRequest({
  //   product_page: route.params.id,
  //   children: [userStore.visitors.find((el) => el.id === visitor.value)],
  //   adults: [registrationForm.value],
  // })
  emit('close')
}

// Form
const checkValidity = (event: { target: { reportValidity: () => void } }) => {
  event.target.reportValidity()
}

const form = ref<VNodeRef | undefined>(undefined)
</script>
