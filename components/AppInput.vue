<template>
  <div v-if="type !== 'tel'" class="relative w-full">
    <input
      v-maska
      :class="[
        'w-full rounded-[12px] px-[24px] py-[16px] border-[1px] text-[16px]',
        isInvalid ? 'border-red-500' : 'border-gray-200',
        {
          'bg-brand-light-gray': isGray && modelValue,
          'bg-white disabled:bg-brand-light-gray': !isGray || !modelValue,
        }
      ]"
      :placeholder="placeholder"
      :type="type ? (type === 'password' && isOpen ? 'text' : type) : type"
      :value="modelValue"
      maxlength="64"
      minlength="1"
      :max="max"
      :min="min"
      :pattern="pattern"
      :data-maska="maska"
      @input.prevent.stop="
        $emit(
          'update:modelValue',
          ($event.target as unknown as IEventTarget).value,
        )
        "
      @blur="event => $emit('blur', event)"
    />
    <div
      v-if="type === 'password'"
      class="h-[24px] aspect-square absolute right-[16px] cursor-pointer top-1/2 -translate-y-1/2"
    >
      <img
        v-if="isOpen"
        src="/icons/eye-close.svg"
        alt="Eye"
        class="h-full"
        @click="isOpen = !isOpen"
      />
      <img
        v-else
        src="/icons/eye-open.svg"
        alt="Eye"
        class="h-full"
        @click="isOpen = !isOpen"
      />
    </div>
  </div>
  <div v-if="type === 'tel'" class="relative w-full">
    <VueTelInput
      class="w-full !rounded-[12px] !px-[24px] !py-[16px] !border-gray-200 !border-[1px] !text-[16px]"
      :class="{
        'bg-brand-light-gray': isGray && modelValue,
        'bg-white disabled:bg-brand-light-gray': !isGray || !modelValue,
      }"
      :placeholder="placeholder"
      :default-country="'us'"
      :preferred-countries="['us', 'gb', 'de', 'fr', 'in']"
      :input-options="{showDialCode: true}"
      v-model="localPhone"
      @keydown="checkKeydown"
      @blur="(event : any) => $emit('blur', event)"
    />
    
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, } from 'vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'

import type { IEventTarget } from '../types'

const props = defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  maska?: string
  isGray?: boolean
  pattern?: string
  max?: string
  min?: string
  isInvalid: boolean
}>()

const emit = defineEmits(['update:modelValue', 'blur'])

const isOpen = ref(false)
const localPhone = ref(props.modelValue)

watch(localPhone, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  localPhone.value = newValue
})


const checkKeydown = (event: any) => {
  if (props.type === 'tel') {
    if (
      !event.ctrlKey &&
      !event.metaKey &&
      event.key.length === 1 &&
      ((localPhone.value.length === 0 && event.key !== '+') ||
        (localPhone.value.length !== 0 && /\D/.test(event.key)))
    ) {
      event.preventDefault()
    }
  }
}
</script>
