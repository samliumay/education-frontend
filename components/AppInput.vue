<template>
  <div class="relative w-full">
    <input
      v-maska
      class="w-full rounded-[12px] px-[24px] py-[16px] border-gray-200 border-[1px] text-[16px] relative"
      :class="{
        'bg-brand-light-gray': isGray && modelValue,
        'bg-white disabled:bg-brand-light-gray': !isGray || !modelValue,
      }"
      :placeholder="placeholder"
      :type="type ? (type === 'password' && isOpen ? 'text' : type) : 'text'"
      :value="modelValue"
      maxlength="64"
      minlength="1"
      :pattern="pattern"
      :data-maska="maska"
      @input="
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
</template>
<script setup lang="ts">
import { ref } from 'vue'

import type { IEventTarget } from '../types'

defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  maska?: string
  isGray?: boolean
  pattern?: string
}>()

defineEmits(['update:modelValue', 'blur'])

const isOpen = ref(false)
</script>
