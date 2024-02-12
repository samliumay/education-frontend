<template>
  <AppModalPayment
    v-if="isOpenPaymentModal"
    :is-open="isOpenPaymentModal"
    :order="order"
    @close="isOpenPaymentModal = false"
  />

  <div class="overflow-x-scroll">
    <div class="min-w-[900px] w-full pb-[12px]">
      <div
        class="grid px-[16px] font-medium gap-[12px] mb-[12px] min-w-[800px]"
        :class="{ 'grid-cols-9': withButton, 'grid-cols-8': !withButton }"
      >
        <p class="col-span-2">{{ $t('common.tableOptions.title') }}</p>
        <p>{{ $t('common.tableOptions.type') }}</p>
        <p>{{ $t('common.tableOptions.option') }}</p>
        <p class="col-span-2">{{ $t('common.tableOptions.schedule') }}</p>
        <p>{{ $t('common.tableOptions.date') }}</p>
        <p>{{ $t('common.tableOptions.status') }}</p>
      </div>

      <template v-if="orders?.length && orders?.length !== 0">
        <div class="flex flex-col gap-[12px]">
          <div
            v-for="order in orders"
            :key="order.id"
            class="grid px-[16px] bg-brand-light-gray gap-[12px] py-[20px] rounded-[12px] min-w-[800px]"
            :class="{ 'grid-cols-9': withButton, 'grid-cols-8': !withButton }"
          >
            <p class="col-span-2">
              {{ order.product_page.name }}
            </p>
            <p>
              {{ $t(`mappers.${order.product_page.product_type}`) }}
            </p>
            <p>
              {{
                order.product_page.purchase_options.includes('Academy')
                  ? $t(`mappers.${order.schedule_type}`)
                  : order.schedule_type === 'TERMINKARTEN'
                    ? $t('common.subscription.card')
                    : $t('common.subscription.abonement')
              }}
            </p>
            <p class="col-span-2">
              {{
                order.product_page.schedule_slots
                  .map((slot: Slot) => {
                    return `${slot.weekday.slice(0, 2)} ${slot.start.slice(
                      0,
                      5,
                    )}-${slot.end.slice(0, 5)}`
                  })
                  .join('; ')
              }}
            </p>
            <p>
              {{ new Date().toDateString() }}
            </p>
            <p class="text-brand-gray">Отменён</p>
            <button
              v-if="withButton"
              class="py-[8px] w-fit h-fit"
              @click="openPaymentModal"
            >
              <img src="/icons/edit.svg" class="w-[20px] h-[20px]" alt="edit" />
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="px-[16px] bg-brand-light-gray py-[20px] rounded-[12px]">
          {{ $t('common.tableOptions.noActiveCourses') }}
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import AppModalPayment from '@/components/modals/AppModalPayment.vue'

import { type OrderItem, type Slot } from '../../types'

defineProps<{
  orders: OrderItem[]
  withButton?: boolean
}>()

// State
const isOpenPaymentModal = ref(false)
const order = ref({})

// Actions
const openPaymentModal = item => {
  order.value = item
  isOpenPaymentModal.value = true
}
</script>
