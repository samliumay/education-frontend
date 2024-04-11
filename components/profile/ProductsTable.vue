<template>
  <AppModalPayment
    v-if="isOpenPaymentModal"
    :is-open="isOpenPaymentModal"
    :order="order"
    @close="isOpenPaymentModal = false"
    @status-cancel="handleCancel"
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
                $t(
                  `common.purchaseOption.${order.purchase_option.schedule_type}`,
                ) ===
                `common.purchaseOption.${order.purchase_option.schedule_type}`
                  ? $t(`common.purchaseOption.default`)
                  : $t(
                      `common.purchaseOption.${order.purchase_option.schedule_type}`,
                    )
              }}
            </p>
            <p class="col-span-2">
              {{
                order.schedule_slots
                  .map((slot: Slot) => {
                    return `${$t(
                      `common.weekdays.short.${slot.weekday.toLowerCase()}`,
                    )} ${slot.start.slice(0, 5)}-${slot.end.slice(0, 5)}`
                  })
                  .join('; ')
              }}
            </p>
            <p>
              {{ order.purchased_at || new Date().toDateString() }}
            </p>
            <p class="text-brand-gray">
              {{
                order.state
                  ? $t(`common.states.${order.state}`)
                  : $t(`common.canceled`)
              }}
            </p>
            <button
              v-if="withButton && order.state === 'active'"
              class="py-[8px] w-fit h-fit"
              @click="openPaymentModal(order)"
            >
              <img src="/icons/edit.svg" class="w-[20px] h-[20px]" alt="edit" />
            </button>
            <div v-else-if="withButton && order.state !== 'active'" />
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

const emit = defineEmits(['cancel'])

// State
const isOpenPaymentModal = ref(false)
const order = ref({})

const handleCancel = () => {
  emit('cancel', order.value.id)
  isOpenPaymentModal.value = false
}

// Actions
const openPaymentModal = item => {
  order.value = item
  isOpenPaymentModal.value = true
}
</script>
