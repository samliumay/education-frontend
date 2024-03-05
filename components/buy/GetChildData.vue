<template>
  <p class="text-[24px] font-medium">{{ $t('common.children.enterData') }}</p>

  <div class="flex flex-col gap-[12px] mt-[16px]">
    <template v-if="step === GetChildStep.Select">
      <AppSelect
        :placeholder="$t('common.children.selectChild')"
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
        :placeholder="$t('common.children.name')"
        required
        pattern=".{2,}"
        :title="$t('user.nameRule')"
        @blur="checkValidity"
      />
      <AppInput
        v-model:model-value="newVisitor.last_name"
        :placeholder="$t('common.children.surname')"
        required
        class="mt-[12px]"
        pattern=".{2,}"
        :title="$t('user.lastNameRule')"
        @blur="checkValidity"
      />
      <AppInput
        v-model:model-value="newVisitor.birth_date"
        :placeholder="$t('common.children.birthdate')"
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
        {{ $t('common.children.addChild') }}
      </AppButton>
    </form>
    <div
      v-show="isShowAddChild"
      class="flex items-center gap-[8px] cursor-pointer"
      @click="
        step === GetChildStep.Add
          ? (step = GetChildStep.Select)
          : (step = GetChildStep.Add)
      "
    >
      <span>{{
        step === GetChildStep.Select
          ? $t('common.children.addNewChild')
          : $t('common.children.backToSelect')
      }}</span>
      <ArrowIcon class="relative top-[4px]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, type VNodeRef } from 'vue'

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
const step = ref(userStore.isLoggedIn ? GetChildStep.Select : GetChildStep.Add)
const newVisitor = ref({
  first_name: '',
  last_name: '',
  birth_date: '',
})

// Completed
const isShowAddChild = computed(() => {
  if (!userStore.isLoggedIn && userStore.getVisitorOptions.length >= 1) {
    return false
  }

  return true
})

// Actions
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget.focus()
}

const addVisitor = () => {
  userStore.postVisitor(newVisitor.value).then((res: any) => {
    emit('update:visitor', res.id)
    step.value = GetChildStep.Select
  })
}
</script>
