<template>
  <div class="md:flex gap-12 h-100">
    <div
      v-if="course"
      class="md:w-1/2"
    >
      <div>
        <n-h1>{{ course?.name }}</n-h1>

        <img
          v-if="course.photo"
          :src="course.photo"
          :alt="course.name"
          aria-hidden
          class="w-full object-cover rounded-xl"
        />

        <div class="my-4">
          <div>
            <span
              v-for="slot in course.schedule_slots"
              :key="slot.id"
              class="mr-2"
            >
              <span>
                <strong>{{
                  $t(`dates.weekdays.short.${slot.weekday}`)
                }}</strong>
                {{ slot.start.slice(0, -3) }} - {{ slot.end.slice(0, -3) }}
              </span>
            </span>
          </div>

          <div class="my-1">
            {{ course.schedule_slots[0].instructor }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="course"
      class="md:w-1/2"
    >
      <SlotsForm
        v-if="currentStage === 1"
        :course="course"
        @send="setTariff"
      />
      <OfferForm
        v-else-if="currentStage === 2"
        @error="setErrorStatus"
        @send="getPaymentLink"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { NH1, type StepsProps } from 'naive-ui'
import { computed, ref } from 'vue'

import { HTTP } from '../../api/index'
import OfferForm from '../../components/buy-stages/OfferForm.vue'
import SlotsForm from '../../components/buy-stages/SlotsForm.vue'
import { useListsStore } from '../../store/lists'
import { type Child, type FullUser, type OfferUser, type Tariff } from '../../types'

const listsStore = useListsStore()

const route = useRoute()
const courseId = computed(() => Number(route?.params?.id))
const course = computed(() => {
  const result = listsStore.getProductById(courseId.value)
  return result
})

const currentStage = ref<number>(1)
const currentStatus = ref<StepsProps['status']>('process')

const setErrorStatus = () => {
  currentStatus.value = 'error'
}

const slots = ref<number[]>([])
const tariff = ref<Tariff | undefined>()
const child = ref<Child | undefined>()

const setTariff = (newTariff: Tariff, newSlots: number[], newChild: Child) => {
  slots.value = newSlots
  tariff.value = newTariff
  child.value = newChild
  currentStage.value++
}

const getPaymentLink = async (userData: FullUser) => {
  currentStage.value++
  // @ts-ignore
  const payload: OfferUser = {
    ...userData,
    ...child.value,
    selected_schedule_slots: slots.value,
    product: courseId.value,
    order_type: tariff.value,
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { payment_link } = await HTTP.post<{ payment_link: string }>(
    `/api/v1/orders/`,
    payload,
  )
  // eslint-disable-next-line camelcase
  if (payment_link) {
    window.location.replace(payment_link)
  }
}
</script>
