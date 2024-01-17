<template>
  <p class="text-[24px] font-medium">Введите данные ребенка</p>

  <div class="flex flex-col gap-[12px] mt-[16px]">
    <template v-if="step === GetChildStep.Select">
      <n-select
        placeholder="Выберите ребенка"
        :options="userStore.getVisitorOptions"
        :value="visitor"
        @update:value="el => $emit('update:visitor', el)"
      />
    </template>
    <template v-else-if="step === GetChildStep.Add">
      <AppInput
        v-model:model-value="newVisitor.first_name"
        placeholder="Имя ребенка"
      />
      <AppInput
        v-model:model-value="newVisitor.last_name"
        placeholder="Фамилия ребенка"
      />
      <AppInput
        v-model:model-value="newVisitor.birth_date"
        placeholder="Дата рождения ребенка"
      />
      <AppButton @click="addVisitor"> Добавить ребенка </AppButton>
    </template>
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
import { NSelect } from 'naive-ui'
import { ref } from 'vue'

import ArrowIcon from '../../public/icons/arrow_short_right.svg'
import { useUserStore } from '../../store/user'
import { GetChildStep } from '../../types'
import AppButton from '../AppButton.vue'
import AppInput from '../AppInput.vue'

defineProps<{
  visitor?: number
}>()

const emit = defineEmits(['update:visitor'])

const userStore = useUserStore()

await userStore.getVisitors()

const step = ref(GetChildStep.Select)
const newVisitor = ref({
  first_name: '',
  last_name: '',
  birth_date: '',
})

const addVisitor = () => {
  userStore.postVisitor(newVisitor.value).then((res: any) => {
    emit('update:visitor', res.id)
    step.value = GetChildStep.Select
  })
}
</script>
