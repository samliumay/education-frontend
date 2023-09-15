<template>
  <n-space vertical>
    <n-h1>{{ course?.name }}</n-h1>
    <n-steps
      :current="currentStage"
      :status="currentStatus"
      class="flex-col lg:flex-row"
    >
      <n-step
        v-for="(step, idx) in steps"
        :key="step.title"
        :class="{ pointer: currentStage >= idx }"
        :title="step.title"
        :description="step.description"
        @click="() => stepBack(idx)"
      />
    </n-steps>
    <div v-if="course">
      <SlotsForm
        v-if="currentStage === 1"
        :slots="course.schedule_slots || []"
        :min-selected="course.min_number_of_meeting_per_week"
        @send="makeOffer"
      />
      <ProductTypeForm
        v-else-if="currentStage === 2 && offer"
        :offer="offer"
        @send="setTariff"
      />
      <OfferForm
        v-else-if="currentStage === 3"
        @error="setErrorStatus"
        @send="getPaymentLink"
      />
      <!-- :offer="offer"
        @send="getPaymentLink" -->
    </div>
  </n-space>
</template>
<script setup lang="ts">
import { NH1, NSpace, NStep, NSteps, StepsProps } from 'naive-ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { HTTP } from '@/api/index'
import OfferForm from '@/components/buy-stages/OfferForm.vue'
import ProductTypeForm from '@/components/buy-stages/ProductTypeForm.vue'
import SlotsForm from '@/components/buy-stages/SlotsForm.vue'
import { useListsStore } from '@/store/lists'
import { FullUser, Offer, OfferUser, Tariff } from '@/types'

const listsStore = useListsStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => listsStore.getProductById(courseId.value))

const currentStage = ref<number>(1)
const currentStatus = ref<StepsProps['status']>('process')

const { t } = useI18n()
const steps = computed(() =>
  Array.from({ length: 4 })
    .map((_, idx) => idx)
    .map(idx => ({
      title: t(`steps[${idx}].title`),
      description: t(`steps[${idx}].description`),
    })),
)

const setErrorStatus = () => {
  currentStatus.value = 'error'
}

const stepBack = (targetStep: number) => {
  if (targetStep < currentStage.value) {
    currentStage.value = targetStep
  }
}

const slots = ref<number[]>([])
const offer = ref<Offer | undefined>()
const tariff = ref<Tariff | undefined>()

const makeOffer = async (data: number[]) => {
  slots.value = data
  currentStage.value++
  offer.value = await HTTP.post<Offer>(
    `/api/v1/products/${courseId.value}/check-offers/`,
    {
      selected_schedule_slots: data,
    },
  )
}

const setTariff = (newTariff: Tariff) => {
  tariff.value = newTariff
  currentStage.value++
}

const getPaymentLink = async (userData: FullUser) => {
  currentStage.value++
  const payload: OfferUser = {
    ...userData,
    selected_schedule_slots: slots.value,
    product: courseId.value,
    order_type: tariff.value,
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { payment_link } = await HTTP.post<{ payment_link: string }>(
    `/api/v1/orders/`,
    payload,
  )
  if (payment_link) {
    window.location.replace(payment_link)
  }
}

// const readyToPay = () => {
//   console.error('done')
// }
</script>
