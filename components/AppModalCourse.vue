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
            @submit.prevent="signUp"
            v-if="!userStore.isLoggedIn"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
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

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
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

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
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

            <AppButton
              class="w-full mt-10"
              type="submit"
              :disabled="!form?.checkValidity() ?? false"
            >
              Оформить
            </AppButton>
          </form>

          <AppButton
              v-else
              class="w-full mt-10"
              type="submit"
              @click="$emit('close')"
            >
              Оформить
            </AppButton>
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
import { useUserStore } from '@/store/user'
import { getApiAddress } from '@/utils/getApiAddress'

import AppInput from './AppInput.vue'

// Init component
defineEmits(['close'])

// Init hooks
const route = useRoute()

// Store
const userStore = useUserStore()

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
}

// Form
const checkValidity = (event: { target: { reportValidity: () => void } }) => {
  event.target.reportValidity()
}

const form = ref<VNodeRef | undefined>(undefined)
</script>
