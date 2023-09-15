<template>
  <n-h2>{{ $t('tariff.select_payment_strategy') }}</n-h2>
  <n-p>{{ $t('tariff.click_on_option') }}</n-p>
  <div class="grid grid-cols-2 gap-5">
    <button
      v-if="!!offer?.meeting_card"
      type="button"
      @click="() => $emit('send', 'meeting_card')"
    >
      <section>
        <n-h3>{{ $t('tariff.meeting_card.title') }}</n-h3>
        <dl>
          <div>
            <dt>{{ $t('tariff.meeting_card.number_of_meetings') }}</dt>
            <dd>{{ offer.meeting_card.number_of_meetings }}</dd>
          </div>

          <div>
            <dt>{{ $t('tariff.meeting_card.price') }}</dt>
            <dd>{{ offer.meeting_card.price }} €</dd>
          </div>
        </dl>
      </section>
    </button>

    <button
      v-if="!!offer?.subscription"
      type="button"
      @click="() => $emit('send', 'subscription')"
    >
      <section>
        <n-h3>{{ $t('tariff.subscription.title') }}</n-h3>
        <dl>
          <div>
            <dt>{{ $t('tariff.subscription.number_of_meetings_per_week') }}</dt>
            <dd>{{ offer?.subscription?.number_of_meetings_per_week }}</dd>
          </div>

          <div>
            <dt>{{ $t('tariff.subscription.price') }}</dt>
            <dd>{{ offer?.subscription?.price }} €</dd>
          </div>
        </dl>
      </section>
    </button>
  </div>
</template>
<script setup lang="ts">
import { NH2, NH3, NP } from 'naive-ui'

import { Offer, Tariff } from '@/types'

defineProps<{ offer: Offer }>()

defineEmits<Emits>()

interface Emits {
  (e: 'send', value: Tariff): void
}
</script>
<style scoped lang="scss">
button {
  @apply rounded-xl h-full hover:bg-red-200 transition p-3 hover:shadow-lg  bg-gray-200;
}

dl > div {
  dt {
    font-weight: 600;
    margin-right: 1rem;
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
