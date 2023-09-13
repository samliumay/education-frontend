<template>
  <n-h2>Select Payment strategy</n-h2>
  <n-p>Click on option to select</n-p>
  <div class="flex gap-3 justify-center">
    <section
      v-if="!!offer?.meeting_card"
      :class="{ active: tariff === 'meeting_card' }"
    >
      <input
        id="meeting_card"
        class="hidden"
        type="radio"
        name="tariff"
        value="meeting_card"
        @change="() => (tariff = 'meeting_card')"
      />
      <label for="meeting_card">
        <n-h3> Meeting card </n-h3>
        <dl>
          <div>
            <dt>Number of meetings</dt>
            <dd>{{ offer.meeting_card.number_of_meetings }}</dd>
          </div>

          <div>
            <dt>Price</dt>
            <dd>{{ offer.meeting_card.price }}</dd>
          </div>
        </dl>
      </label>
    </section>

    <section
      v-if="!!offer?.subscription"
      :class="{ active: tariff === 'subscription' }"
    >
      <input
        id="subscription"
        class="hidden"
        type="radio"
        name="tariff"
        value="subscription"
        @change="() => (tariff = 'subscription')"
      />
      <label for="subscription">
        <n-h3>Subscription</n-h3>
        <dl>
          <div>
            <dt>Number of meetings per week</dt>
            <dd>{{ offer?.subscription?.number_of_meetings_per_week }}</dd>
          </div>

          <div>
            <dt>Price</dt>
            <dd>{{ offer?.subscription?.price }}</dd>
          </div>
        </dl>
      </label>
    </section>
  </div>
  <n-button
    :disabled="!tariff"
    @click="$emit('send', tariff)"
  >
    {{ $t('common.submit') }}
  </n-button>
</template>
<script setup lang="ts">
import { NButton, NH2, NH3, NP } from 'naive-ui'
import { ref } from 'vue'

import { Offer, Tariff } from '@/types'

defineProps<{ offer: Offer }>()

defineEmits<Emits>()

interface Emits {
  (e: 'send', value: Tariff): void
}

const tariff = ref<Tariff>()
</script>
<style scoped lang="scss">
section {
  @apply border-slate-300 border-2 rounded bg-green-200 hover:bg-green-300 p-3 shadow-inner hover:shadow-lg;
  &.active {
    @apply bg-green-400;
  }
}
</style>
