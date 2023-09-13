<template>
  <n-space vertical>
    <n-h1>{{ course?.name }}</n-h1>
    <n-steps
      :current="currentStage"
      :status="currentStatus"
    >
      <n-step
        title="Select slots"
        description="Courses have different time slots. You have to select the comfortable one"
      />
      <n-step
        title="Select tariff"
        description="Decide if you will pay for subscriptions or for specific number of classes"
      />
      <!-- <n-step
        title="Login/Register"
        description="The stage is skipped for those, who already logged in. Login, if you already have an account, select the password and login otherwise"
      /> -->
      <n-step
        title="User info"
        description="Fill the info about your child"
      />
      <n-step title="Pay" />
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
        @send="
          tariff => {
            tariff = tariff
            currentStage++
          }
        "
      />
      <!-- <BuyLoginForm
        v-else-if="currentStage === 3"
        @error="setErrorStatus"
        @next-stage="currentStage++"
      /> -->
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

const setErrorStatus = () => {
  currentStatus.value = 'error'
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
  // skip login stage if user is already logged in
  //   if (userStore?.user?.id) currentStage.value++
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
    `/api/v1/products/${courseId.value}/check-offers/`,
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
