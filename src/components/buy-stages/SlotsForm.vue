<template>
  <n-form>
    <n-h1>{{ $t('slots.fillInfo') }}</n-h1>
    <n-p>{{ $t('slots.selectTimeSlots') }}</n-p>
    <n-p
      :class="{ 'text-rose-500 ': isAlert }"
      :role="isAlert ? 'alert' : ''"
    >
      {{ $t('slots.minSlots', { minSelected }) }}
    </n-p>
    <n-select
      v-model:value="selectedSlots"
      :options="slotsOptions"
      filterable
      multiple
    />
    <n-button
      class="mt-2"
      :disabled="isAlert"
      keyboard
      @click="checkSlots"
    >
      {{ $t('common.submit') }}
    </n-button>
  </n-form>
</template>
<script setup lang="ts">
import { NButton, NForm, NH1, NP, NSelect } from 'naive-ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { Slot } from '@/types'

const props = defineProps<{ slots: Slot[]; minSelected: number }>()

const emit = defineEmits<Emits>()

const { t } = useI18n()

interface Emits {
  (e: 'send', slots: number[]): void
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

const isAlert = computed(() => props.minSelected > selectedSlots.value.length)
const checkSlots = () => {
  if (isAlert.value) {
    return
  }
  emit('send', selectedSlots.value)
}
</script>
