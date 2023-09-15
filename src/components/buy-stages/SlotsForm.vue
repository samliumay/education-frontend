<template>
  <n-form>
    <n-h2>{{ $t('slots.fillInfo') }}</n-h2>
    <n-p>{{ $t('slots.selectTimeSlots') }}</n-p>
    <n-p
      :class="{ 'text-rose-500 ': isAlert }"
      :role="isAlert ? 'alert' : ''"
    >
      {{ $t('slots.minSlots', { minSelected }) }}
    </n-p>
    <n-select
      :value="selectedSlots"
      :options="slotsOptions"
      filterable
      multiple
      @update:value="updateSlots"
    />
    <product-type-form
      v-if="!isOfferLoading && offer"
      :offer="offer"
      @send="tariff => $emit('send', tariff, selectedSlots)"
    />
    <div
      v-else-if="isOfferLoading"
      class="flex justify-center mt-3"
    >
      <n-spin size="large" />
    </div>
  </n-form>
</template>
<script setup lang="ts">
import { NForm, NH2, NP, NSelect, NSpin } from 'naive-ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { HTTP } from '@/api/index'
import { Offer, Slot, Tariff } from '@/types'

import ProductTypeForm from './ProductTypeForm.vue'

const props = defineProps<{
  courseId: number
  slots: Slot[]
  minSelected: number
}>()

defineEmits<Emits>()

const { t } = useI18n()

interface Emits {
  (e: 'send', fariff: Tariff, slots: number[]): void
}

const slotsOptions = computed(() =>
  props.slots.map(slot => ({
    value: slot.id,
    label: `${t(`dates.weekdays.short.${slot.weekday}`)} ${slot.start} - ${
      slot.end
    }`,
  })),
)

const selectedSlots = ref<number[]>([])
const offer = ref<Offer | undefined>()

const isAlert = computed(() => props.minSelected > selectedSlots.value.length)
const isOfferLoading = ref<boolean>(false)

const makeOffer = async () => {
  offer.value = await HTTP.post<Offer>(
    `/api/v1/products/${props.courseId}/check-offers/`,
    {
      selected_schedule_slots: selectedSlots.value,
    },
  )
}

const updateSlots = async (newSlots: number[]) => {
  selectedSlots.value = newSlots
  if (isAlert.value) {
    return
  }
  isOfferLoading.value = true
  await makeOffer()
  isOfferLoading.value = false
}
</script>
