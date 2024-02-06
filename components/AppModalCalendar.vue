<template>
  <n-modal :show="isOpen" @mask-click="$emit('close')">
    <div
      class="fixed w-[70%] h-[70%] bg-white rounded-md top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 overflow-y-auto"
    >
      <div class="flex flex-col">
        <div
          class="flex justify-end items-center border-b-[1px] border-black py-[16px]"
        >
          <div
            class="flex gap-[20px] items-center mr-10"
            @click="$emit('close')"
          >
            Закрыть
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

        <div class="flex flex-col gap-10 m-10">
          <div>
            <h1 class="font-medium text-4xl mb-10">Календарь</h1>

            <form
              ref="form"
              class="flex flex-col gap-2 mt-10 relative"
              @submit.prevent="sendModalCourse"
            >
              <n-calendar
                v-model:value="value"
                #="{ year, month, date }"
                @update:value="handleUpdateValue"
              >
                {{ year }}-{{ month }}-{{ date }}
              </n-calendar>

              <AppButton
                class="w-full mt-10"
                type="submit"
                :disabled="!form?.checkValidity() ?? false"
              >
                Отправить
              </AppButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { NModal, NCalendar } from 'naive-ui'
import { ref, type VNodeRef } from 'vue'
import { useRoute } from 'vue-router'

// import { useCartStore } from '@/store/cart'
// import { useUserStore } from '@/store/user'
import { getApiAddress } from '@/utils/getApiAddress'

import AppInput from './AppInput.vue'
import AppTextarea from './AppTextarea.vue'

defineProps<{
  isOpen: boolean
}>()
// Init component
const emit = defineEmits(['close'])

// Init hooks
const route = useRoute()

// Store
// const userStore = useUserStore()
// const cartStore = useCartStore()

// State
// eslint-disable-next-line vue/require-typed-ref
const visitor = ref(null)
const value = ref(new Date())
const handleUpdateValue = (value: Date) => {
  console.log(value)
}

// Get data
const { data: product, pending: productPending } = await useFetch(
  getApiAddress(`/api/v2/wagtail/products/${route.params.id ?? 12}/?fields=*`),
  { deep: true },
)

// Registration
const registrationForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
  position: '',
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
const checkValidity = (event: { target: { reportValidity: () => void } }) => {
  event.target.reportValidity()
}

const form = ref<VNodeRef | undefined>(undefined)
</script>
