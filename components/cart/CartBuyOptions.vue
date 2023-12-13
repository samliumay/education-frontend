<template>
  <div class="grid grid-cols-2 gap-[12px]">
    <div
      class="cursor-pointer rounded-[12px] bg-white py-[18px] px-[24px] flex items-center justify-between border-[1px]"
      :class="{
        'border-green-600': option === 'paypal',
        'border-gray-300': option !== 'paypal',
      }"
      @click="$emit('selectOption', 'paypal')"
    >
      <div class="flex items-center gap-[16px]">
        <div
          class="h-[20px] w-[20px] rounded-[1000px] border-[1px] relative flex items-center justify-center"
          :class="{
            'border-green-600': option === 'paypal',
            'border-gray-300': option !== 'paypal',
          }"
        >
          <div
            v-if="option === 'paypal'"
            class="h-[14px] w-[14px] rounded-[1000px] bg-green-600"
          />
        </div>
        <div class="flex items-center justify-center">
          Оплата через Paypal
        </div>
      </div>

      <img src="../../assets/icons/pay/paypal.svg" alt="Stripe icon">
    </div>

    <div
      class="cursor-pointer rounded-[12px] bg-white py-[18px] px-[24px] flex items-center justify-between border-[1px]"
      :class="{
        'border-green-600': option === 'stripe',
        'border-gray-300': option !== 'stripe',
      }"
      @click="$emit('selectOption', 'stripe')"
    >
      <div class="flex items-center gap-[16px]">
        <div
          class="h-[20px] w-[20px] rounded-[1000px] border-[1px] relative flex items-center justify-center"
          :class="{
            'border-green-600': option === 'stripe',
            'border-gray-300': option !== 'stripe',
          }"
        >
          <div
            v-if="option === 'stripe'"
            class="h-[14px] w-[14px] rounded-[1000px] bg-green-600"
          />
        </div>
        <div class="flex items-center justify-center">
          Оплата через Stripe
        </div>
      </div>

      <img src="../../assets/icons/pay/stripe.svg" alt="Stripe icon">
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  option: "paypal" | "stripe";
}>()

defineEmits(["selectOption"])
</script>
