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
        title="Login/Register"
        description="The stage is skipped for those, who already logged in. Login, if you already have an account, select the password and login otherwise"
      />
      <n-step
        title="Fill user info and select tariff"
        description="Fill the info about yourself. You should also decide if you will pay for subscriptions or for specific number of classes"
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
      <BuyLoginForm
        v-else-if="currentStage === 2"
        @error="setErrorStatus"
        @next-stage="currentStage++"
      />
      <OfferForm
        v-else-if="currentStage === 3"
        :offer="offer"
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
import BuyLoginForm from '@/components/buy-stages/BuyLoginForm.vue'
import OfferForm from '@/components/buy-stages/OfferForm.vue'
import SlotsForm from '@/components/buy-stages/SlotsForm.vue'
import { useListsStore } from '@/store/lists'
import { useUserStore } from '@/store/user'
import { FullUser, Offer } from '@/types'

const listsStore = useListsStore()
const userStore = useUserStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => listsStore.getProductById(courseId.value))

const currentStage = ref<number>(1)
const currentStatus = ref<StepsProps['status']>('process')

const setErrorStatus = () => {
  currentStatus.value = 'error'
}

const offer = ref<Offer | undefined>()

const makeOffer = async (data: number[]) => {
  currentStage.value++
  offer.value = await HTTP.post<Offer>(
    `/api/v1/products/${courseId.value}/check-offers/`,
    {
      slots: data,
    },
  ).catch()
  offer.value = {
    meeting_card: {
      number_of_meetings: 100,
      price: '500',
    },
    subscription: {
      number_of_meetings_per_week: 2,
      price: '200',
    },
  }
  // skip login stage if user is already logged in
  if (userStore?.user?.id) currentStage.value++
}

const getPaymentLink = async (data: FullUser) => {
  currentStage.value++
  const { link } = await HTTP.post<{ link: string }>(
    `/api/v1/products/${courseId.value}/check-offers/`,
    {
      slots: data,
    },
  )
  if (link) {
    window.location.replace(link)
  }
}

// const readyToPay = () => {
//   console.error('done')
// }
</script>
