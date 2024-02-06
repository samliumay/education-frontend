<template>
  <div class="overflow-x-auto pb-[12px]">
    <div
      class="grid px-[16px] font-medium gap-[12px] mb-[12px] min-w-[800px]"
      :class="{ 'grid-cols-8': withButton, 'grid-cols-7': !withButton }"
    >
      <p class="col-span-2">{{ $t('common.tableOptions.title') }}</p>
      <p>{{ $t('common.tableOptions.type') }}</p>
      <p>{{ $t('common.tableOptions.option') }}</p>
      <p class="col-span-2">{{ $t('common.tableOptions.schedule') }}</p>
      <p>{{ $t('common.tableOptions.date') }}</p>
    </div>

    <template v-if="orders?.length && orders?.length !== 0">
      <div class="flex flex-col gap-[12px]">
        <div
          v-for="order in orders"
          :key="order.id"
          class="grid px-[16px] bg-gray-200 gap-[12px] py-[20px] rounded-[12px] min-w-[800px]"
          :class="{ 'grid-cols-8': withButton, 'grid-cols-7': !withButton }"
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
          <button
            v-if="withButton && order.product_page.type === 'COurse'"
            class="w-full border-[1px] border-black rounded-[12px] py-[8px] font-medium text-center"
          >
            {{ $t('common.actions.cancel') }}
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="px-[16px] bg-gray-200 py-[20px] rounded-[12px]">
        {{ $t('common.tableOptions.noActiveCourses') }}
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { type OrderItem, type Slot } from '../../types'

defineProps<{
  orders: OrderItem[]
  withButton?: boolean
}>()
</script>
