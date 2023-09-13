<template>
  <n-form>
    <n-h1>Fill your info</n-h1>
    <n-p>Select the time slots, which will be comfortable for you</n-p>
    <n-p
      :class="{ 'text-rose-500 ': isAlert }"
      :role="isAlert ? 'alert' : ''"
    >
      You should select minimum {{ minSelected }} slots
    </n-p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-2"
    >
      <label
        v-for="timeSlot in slots"
        :key="timeSlot.id"
      >
        <AppSlotCard
          :selected="!!selectedSlots.includes(timeSlot.id)"
          :slot-value="timeSlot"
          @click="clickCourse(timeSlot.id)"
        />
        <input
          class="hidden"
          type="checkbox"
          :checked="!!selectedSlots.includes(timeSlot.id)"
        />
      </label>
    </div>
    <n-button
      :disabled="isAlert"
      keyboard
      @click="checkSlots"
    >
      {{ $t('common.submit') }}
    </n-button>
  </n-form>
</template>
<script setup lang="ts">
import { NButton, NForm, NH1, NP } from 'naive-ui'
import { computed, ref } from 'vue'

import { Slot } from '@/types'

import AppSlotCard from '../AppSlotCard.vue'

const props = defineProps<{ slots: Slot[]; minSelected: number }>()

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'send', slots: number[]): void
}

const selectedSlots = ref<number[]>([])
const clickCourse = (id: number) => {
  if (selectedSlots.value.includes(id)) {
    selectedSlots.value = selectedSlots.value.filter(slotId => slotId !== id)
  } else {
    selectedSlots.value.push(id)
  }
}

const isAlert = computed(() => props.minSelected > selectedSlots.value.length)
const checkSlots = () => {
  if (isAlert.value) {
    return
  }
  emit('send', selectedSlots.value)
}
</script>
