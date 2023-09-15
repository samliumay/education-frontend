<template>
  <n-form
    ref="slotsForm"
    :rules="rules"
  >
    <n-h2>{{ $t('slots.fillInfo') }}</n-h2>

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
    <n-p>
      {{ $t('slots.options') }}:
      <n-ul class="list-disc">
        <n-li>
          {{
            $t('slots.optionsMeetingCard', {
              n: course.meeting_card.number_of_meetings,
              price: course.meeting_card.price,
            })
          }}
        </n-li>
        <n-li
          v-for="subscription in course.subscriptions"
          :key="subscription.number_of_meetings_per_week"
        >
          {{
            $t('slots.optionsSubscriptions', {
              n: subscription.number_of_meetings_per_week,
              price: subscription.price,
            })
          }}
        </n-li>
      </n-ul>
    </n-p>
    <n-form-item
      path="slots"
      :label="$t('slots.selectTimeSlots')"
      :feedback="
        $t('slots.minSlots', {
          minSelected: course.min_number_of_meeting_per_week,
        })
      "
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
  NLi,
  NP,
  NSelect,
  NSpin,
  NUl,
} from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { HTTP } from '@/api/index'
import { Child, Offer, Product, Tariff } from '@/types'

import ProductTypeForm from './ProductTypeForm.vue'

const props = defineProps<{
  course: Product
}>()

defineEmits<Emits>()

const { t } = useI18n()

interface Emits {
  (e: 'send', fariff: Tariff, slots: number[], child: Child): void
}

const slotsOptions = computed(() =>
  props.course.schedule_slots.map(slot => ({
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
    validator: () =>
      selectedSlots.value.length >= props.course.min_number_of_meeting_per_week,
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
    `/api/v1/products/${props.course.id}/check-offers/`,
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
