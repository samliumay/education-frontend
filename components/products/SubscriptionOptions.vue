<template>
  <div class="grid grid-cols-2 gap-[24px]">
    <div
      class="bg-white rounded-[12px] border-gray-300 border-[1px] p-[32px]"
      :class="{ 'border-gray-600': value === 'subscription' }"
      @click="$emit('select', 'subscription')"
    >
      <div class="flex item-center gap-[12px]">
        <img
          src="../../assets/icons/products/abonement_sub.svg"
          alt="Subscription"
        />
        <dl class="flex flex-col gap-[6px]">
          <dt class="text-[24px] font-medium">Абонемент</dt>
          <dd class="font-medium text-gray-400">Можно отменить</dd>
        </dl>
      </div>

      <p class="text-[24px] font-medium mt-[16px]">
        от {{ product.subscriptions?.[0]?.price || "88" }} € / месяц
      </p>

      <p class="font-medium text-gray-400 mt-[24px]">
        Вы также можете приобрести два или три приема в неделю. Каждый следующий
        прием дешевле
      </p>
    </div>

    <div
      class="bg-white rounded-[12px] border-gray-300 border-[1px] p-[32px] cursor-pointer"
      :class="{ 'border-gray-600': value === 'card' }"
      @click="$emit('select', 'card')"
    >
      <div class="flex item-center gap-[12px]">
        <img
          src="../../assets/icons/products/abonement_sub.svg"
          alt="Subscription"
        />
        <dl class="flex flex-col gap-[6px]">
          <dt class="text-[24px] font-medium">Карта встреч</dt>
          <dd class="font-medium text-gray-400">
            Действительна в течение 6 месяцев
          </dd>
        </dl>
      </div>

      <p class="text-[24px] font-medium mt-[16px]">
        {{ product.meeting_card?.price || "168" }} € / единоразово
      </p>

      <p class="font-medium text-gray-400 mt-[24px]">
        Если вы не можете посещать регулярно, у вас есть возможность приобрести
        карту на 8 посещений
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from "../../types"

defineProps<{
  product: Product;
  value?: "subscription" | "card";
}>()

defineEmits(["select"])
</script>
