<template>
  <div class="flex gap-[36px]">
    <div class="aspect-video rounded-[12px] overflow-hidden h-[140px]">
      <img
        v-if="order.product.photo"
        :src="order.product.photo"
        :alt="`${order.product.name} photo`"
        class="h-full"
      />
      <div v-else class="h-full w-full bg-gray-300" />
    </div>

    <div class="flex flex-col gap-[16px]">
      <div class="flex justify-between">
        <h3 class="font-medium text-[20px]">
          {{ order.product.name }}
        </h3>
        <img
          src="/icons/close.svg"
          alt="Close icon"
          @click="$emit('close')"
        />
      </div>

      <div class="flex gap-[12px]">
        <div class="bg-gray-200 px-[16px] p-[8px] rounded-[10px]">
          Опция:
          {{
            order.schedule_type !== 'TERMINKARTEN'
              ? 'Абонемент'
              : 'Карта встреч'
          }}
        </div>
        <div class="bg-gray-200 px-[16px] p-[8px] rounded-[10px]">
          Ребенок: Иван Иванов
          <span class="text-blue-500 ml-[8px]"> Изменить </span>
        </div>
      </div>

      <p class="font-medium text-[24px]">
        {{ `${order.calculated_price} €` }}
        <span class="text-gray-400 ml-[8px]"> /мес </span>
      </p>

      <p class="flex gap-[8px] items-center font-medium cursor-pointer">
        Выбранные дни посещения
        <img src="/icons/chevron_down.svg" alt="Arrow down" />
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type OrderItem } from '../../types'

defineProps<{
  order: OrderItem
}>()

defineEmits(['close'])
</script>
