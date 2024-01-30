<template>
  <p class="text-[24px] font-medium">Введите данные ребенка</p>

  <div class="flex flex-col gap-[12px] mt-[16px]">
    <template v-if="step === GetChildStep.Select">
      <AppSelect
        placeholder="Выберите ребенка"
        :options="userStore.getVisitorOptions"
        :value="visitor"
        @update:value="el => $emit('update:visitor', el)"
      />
    </template>
    <form
      v-else-if="step === GetChildStep.Add"
      ref="form"
      @submit.prevent="addVisitor"
    >
      <AppInput
        v-model:model-value="newVisitor.first_name"
        placeholder="Имя ребенка"
        required
        pattern=".{2,}"
        title="The name must contain at least two characters"
        @blur="checkValidity"
      />
      <AppInput
        v-model:model-value="newVisitor.last_name"
        placeholder="Фамилия ребенка"
        required
        class="mt-[12px]"
        pattern=".{2,}"
        title="Last name must contain at least two characters"
        @blur="checkValidity"
      />
      <AppInput
        v-model:model-value="newVisitor.birth_date"
        placeholder="Дата рождения ребенка"
        type="date"
        required
        class="mt-[12px]"
        @blur="checkValidity"
      />
      <AppButton
        type="submit"
        class="mt-[36px] w-full"
        :disabled="!form?.checkValidity() ?? false"
      >
        Добавить ребенка
      </AppButton>
    </form>
    <div
      class="flex items-center gap-[8px] cursor-pointer"
      @click="
        step === GetChildStep.Add
          ? (step = GetChildStep.Select)
          : (step = GetChildStep.Add)
      "
    >
      <span>{{
        step === GetChildStep.Select
          ? 'Добавить нового ребенка'
          : 'Вернуться к выбору ребенка'
      }}</span>
      <ArrowIcon class="relative top-[4px]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type VNodeRef } from 'vue'

import ArrowIcon from '../../public/icons/arrow_short_right.svg'
import { useUserStore } from '../../store/user'
import { GetChildStep } from '../../types'
import AppButton from '../AppButton.vue'
import AppInput from '../AppInput.vue'
import AppSelect from '../AppSelect.vue'

// Init component
defineProps<{
  visitor?: number
}>()

const emit = defineEmits(['update:visitor'])

// Store
const userStore = useUserStore()
await userStore.getVisitors()

// State
const form = ref<VNodeRef | undefined>(undefined)
const step = ref(GetChildStep.Select)
const newVisitor = ref({
  first_name: '',
  last_name: '',
  birth_date: '',
})

// Actions
const checkValidity = (event: { target: { reportValidity: () => void } }) => {
  event.target.reportValidity()
}

const addVisitor = () => {
  userStore.postVisitor(newVisitor.value).then((res: any) => {
    emit('update:visitor', res.id)
    step.value = GetChildStep.Select
  })
}
</script>
