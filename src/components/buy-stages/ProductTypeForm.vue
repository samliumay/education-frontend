<template>
  <n-h2>{{ $t('tariff.select_payment_strategy') }}</n-h2>
  <n-p>{{ $t('tariff.click_on_option') }}</n-p>
  <div class="grid grid-cols-2 gap-5">
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
        <n-h3>{{ $t('tariff.meeting_card.title') }}</n-h3>
        <dl>
          <div>
            <dt>{{ $t('tariff.meeting_card.number_of_meetings') }}</dt>
            <dd>{{ offer.meeting_card.number_of_meetings }}</dd>
          </div>

          <div>
            <dt>{{ $t('tariff.meeting_card.price') }}</dt>
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
        <n-h3>{{ $t('tariff.subscription.title') }}</n-h3>
        <dl>
          <div>
            <dt>{{ $t('tariff.subscription.number_of_meetings_per_week') }}</dt>
            <dd>{{ offer?.subscription?.number_of_meetings_per_week }}</dd>
          </div>

          <div>
            <dt>{{ $t('tariff.subscription.price') }}</dt>
            <dd>{{ offer?.subscription?.price }}</dd>
          </div>
        </dl>
      </label>
    </section>
  </div>
  <n-button
    :disabled="!tariff"
    keyboard
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
  @apply border-slate-300 border-2 rounded bg-green-200 hover:bg-green-300 p-3 shadow-inner hover:shadow-lg mb-3;
  &.active {
    @apply bg-green-400;
  }

  label {
    cursor: pointer;
  }
}

dl > div {
  dt {
    font-weight: 600;
    margin-right: 2rem;
    &::after {
      content: ':';
    }
  }
  dd,
  dt {
    display: inline;
  }
}
</style>
