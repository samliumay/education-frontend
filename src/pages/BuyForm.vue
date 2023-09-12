<template>
  <n-space vertical>
    <n-steps
      :current="currentStage"
      :status="currentStatus"
    >
      <n-step
        title="Select slots"
        description="Courses have different time slots. You have to select the comfortable one"
      />
      <n-step
        title="Fill info"
        description="Fill the info about your child. You should also decide if you will pay for subscriptions or for specific number of classes"
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
      <OfferForm
        v-else-if="currentStage === 2"
        @error="setErrorStatus"
        @send="getPaymentLink"
      />
    </div>
  </n-space>
</template>
<script setup lang="ts">
import { NSpace, NStep, NSteps, StepsProps } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { HTTP } from '@/api/index'
import OfferForm from '@/components/buy-stages/OfferForm.vue'
import SlotsForm from '@/components/buy-stages/SlotsForm.vue'
import { useListsStore } from '@/store/lists'
import { FullUser } from '@/types'

const listsStore = useListsStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => listsStore.getProductById(courseId.value))

const currentStage = ref<number>(1)
const currentStatus = ref<StepsProps['status']>('process')

const setErrorStatus = () => {
  currentStatus.value = 'error'
}

const makeOffer = async (data: number[]) => {
  currentStage.value++
  await HTTP.post(`/api/v1/products/${courseId.value}/check-offers/`, {
    slots: data,
  })
}

const getPaymentLink = async (data: FullUser) => {
  currentStage.value++
  const { link } = await HTTP.post(
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
