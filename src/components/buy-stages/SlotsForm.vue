<template>
  <n-form
    ref="slotsForm"
    :rules="rules"
  >
    <n-h2>{{ $t('slots.fillInfo') }}</n-h2>
    <n-p>{{ $t('slots.childName') }}</n-p>

    <div class="grid grid-cols-2 gap-5">
      <n-form-item
        :label="$t('offerForm.child_first_name')"
        path="child_first_name"
        required
      >
        <n-input v-model:value="child.child_first_name" />
      </n-form-item>
      <n-form-item
        :label="$t('offerForm.child_last_name')"
        path="child_last_name"
        required
      >
        <n-input v-model:value="child.child_last_name" />
      </n-form-item>
    </div>
    <n-p>{{ $t('slots.selectTimeSlots') }}</n-p>
    <n-form-item
      path="slots"
      :label="$t('slots.selectTimeSlots')"
      :feedback="$t('slots.minSlots', { minSelected })"
    >
      <n-select
        v-model:value="selectedSlots"
        :options="slotsOptions"
        filterable
        multiple
      />
    </n-form-item>
    <product-type-form
      v-if="!isOfferLoading && offer"
      :offer="offer"
      @send="tariff => $emit('send', tariff, selectedSlots, child)"
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
import {
  FormInst,
  FormValidationError,
  NForm,
  NFormItem,
  NH2,
  NInput,
  NP,
  NSelect,
  NSpin,
} from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { HTTP } from '@/api/index'
import { Child, Offer, Slot, Tariff } from '@/types'

import ProductTypeForm from './ProductTypeForm.vue'

const props = defineProps<{
  courseId: number
  slots: Slot[]
  minSelected: number
}>()

defineEmits<Emits>()

const { t } = useI18n()

interface Emits {
  (e: 'send', fariff: Tariff, slots: number[], child: Child): void
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
const child = ref<Child>({
  child_first_name: '',
  child_last_name: '',
})

const isOfferLoading = ref<boolean>(false)

const rules = {
  slots: {
    required: true,
    validator: () => selectedSlots.value.length >= props.minSelected,
    trigger: ['input', 'blur'],
  },
  child_first_name: {
    validator: () => !!child.value.child_first_name,
    message: t('validation.required'),
    trigger: ['input', 'blur'],
  },
  child_last_name: {
    validator: () => !!child.value.child_last_name,
    message: t('validation.required'),
    trigger: ['input', 'blur'],
  },
}

const slotsForm = ref<FormInst | undefined>()

const validate = async () => {
  let isValid = true
  await slotsForm.value?.validate(
    (validationErrors: Array<FormValidationError> | undefined) => {
      if (validationErrors !== undefined) {
        isValid = false
      }
    },
  )
  return isValid
}

const makeOffer = async () => {
  const isValid = await validate()
  if (!isValid) {
    return
  }
  isOfferLoading.value = true
  offer.value = await HTTP.post<Offer>(
    `/api/v1/products/${props.courseId}/check-offers/`,
    {
      selected_schedule_slots: selectedSlots.value,
    },
  )
  isOfferLoading.value = false
}

watch(
  selectedSlots,
  async () => {
    await makeOffer()
  },
  { deep: true },
)

watch(
  child,
  async () => {
    await makeOffer()
  },
  { deep: true },
)
</script>
