<template>
  <p class="text-[24px] font-medium">{{ $t('common.children.enterData') }}</p>

  <div class="flex flex-col gap-[12px] mt-[16px]">
    <template v-if="step === GetChildStep.Select">
      <AppSelect
        :placeholder="$t('common.children.selectChild')"
        :options="filterVisitorOptions(props.product.age_group)"
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
        :max="new Date().toISOString().substring(0, 10)"
        class="mt-[12px]"
        @blur="checkValidity"
      />
      <AppButton
        type="submit"
        class="mt-[36px] w-full"
        :disabled="
          (!form?.checkValidity() ||
            !newVisitor.first_name ||
            !newVisitor.last_name ||
            !newVisitor.birth_date) ??
          false
        "
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
import type { Product } from '../../types'


// Init component
const props = defineProps<{
  visitor?: number
  product: Product
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
  if (!userStore.isLoggedIn && userStore.getVisitorOptions.length < 1) {
    return false
  }

  return true
})

// Actions
const calculateAge = (birth_date: string) => {
  const [month, day, year] = birth_date.split('/').map(Number); // Convert mm/dd/yyyy to numbers
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--; // If the birthday hasn't happened yet this year, subtract one from age
  }
  return age;
};

const filterVisitorOptions = (age_group: any) => {

  let min_age: number, max_age: number | null;
  if (age_group.includes('-')) {
    // Handle "min_age-max_age" format
    [min_age, max_age] = age_group.split('-').map(Number);
  } else if (age_group.includes('+')) {
    // Handle "min_age+" format
    min_age = Number(age_group.replace('+', ''));
    max_age = null; // No upper limit
  } else {
    throw new Error('Invalid age group format');
  }


  const returnOptions = userStore.visitors
    .filter(visitor => {
      const visitorAge = calculateAge(visitor.birth_date); // Calculate the visitor's age

      if (max_age !== null) {
        // If max_age exists, check if the visitor's age is within the range
        return visitorAge >= min_age && visitorAge <= max_age;
      } else {
        // If there's no max_age, check if the visitor's age is greater than or equal to min_age
        return visitorAge >= min_age;
      }
    })
    .map(visitor => ({
      value: visitor.id,
      label: `${visitor.first_name} ${visitor.last_name}`,
    }));

  return returnOptions
}

const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget?.focus()
}

const addVisitor = () => {
  userStore.postVisitor(newVisitor.value).then((res: any) => {
    emit('update:visitor', res.id)
    step.value = GetChildStep.Select
  })
}
</script>
