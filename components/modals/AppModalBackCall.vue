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

        <div class="flex flex-col gap-10 m-10">
          <div>
            <h1 class="font-medium text-4xl mb-10">
              {{ $t('common.modals.requestCallback') }}
            </h1>

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

              <AppTextarea
                v-model="registrationForm.message"
                :placeholder="$t('common.modals.additionalInfo')"
                type="text"
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
import { ref, type VNodeRef } from 'vue'

import AppInput from '@/components/AppInput.vue'
import AppTextarea from '@/components/AppTextarea.vue'

defineProps<{
  isOpen: boolean
}>()
// Init component
const emit = defineEmits(['close'])

// State
const checkbox = ref(false)

// Registration
const registrationForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
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
  event.relatedTarget.focus()
}

const form = ref<VNodeRef | undefined>(undefined)
</script>
