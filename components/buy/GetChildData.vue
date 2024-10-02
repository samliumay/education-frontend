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
        v-model="newVisitorData.first_name"
        :placeholder="$t('common.children.name')"
        required
        pattern=".{2,}"
        :title="$t('user.nameRule')"
        @blur="checkValidity"
      />
      <AppInput
        v-model="newVisitorData.last_name"
        :placeholder="$t('common.children.surname')"
        required
        class="mt-[12px]"
        pattern=".{2,}"
        :title="$t('user.lastNameRule')"
        @blur="checkValidity"
      />
      <AppInput
        v-model="newVisitorData.birth_date"
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
          !form?.checkValidity() ||
          !newVisitorData.first_name ||
          !newVisitorData.last_name ||
          !newVisitorData.birth_date
        "
      >
        {{ $t('common.children.addChild') }}
      </AppButton>
    </form>
    <div
      v-if="isInAgeRange"
      class="flex gap-[20px] border-brand-black border-[1px]"
      @click="closeMessage"
    >
      <p class="ml-5 mt-5 mb-5 text-brand-red">
        The child's data was successfully saved, but the child cannot be registered because he or she does not meet the product's age range.
      </p>
      <button
        class="mr-5 mt-5 mb-5 bg-white w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-brand-light-gray transition ease-in delay-100 transform active:scale-[0.93]"
      >
        <img src="/icons/cross.svg" alt="close" class="w-[15px] h-[15px]" />
      </button>
    </div>
    <div
      v-show="isShowAddChild"
      class="flex items-center gap-[8px] cursor-pointer"
      @click="
        step === GetChildStep.Add
          ? (step = GetChildStep.Select, clearVisitorData())
          : (step = GetChildStep.Add, isInAgeRange = false)
      "
    >
      <span>
        {{
          step === GetChildStep.Select
            ? $t('common.children.addNewChild')
            : $t('common.children.backToSelect')
        }}
      </span>
      <ArrowIcon class="relative top-[4px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type VNodeRef } from 'vue';

import ArrowIcon from '../../public/icons/arrow_short_right.svg';
import { useUserStore } from '../../store/user';
import { GetChildStep } from '../../types';
import AppButton from '../AppButton.vue';
import AppInput from '../AppInput.vue';
import AppSelect from '../AppSelect.vue';
import type { Product } from '../../types';

// Init component
const props = defineProps<{
  visitors?: any;
  product: Product;
  IsMultiple?: boolean;
  newVisitorData?: any;
}>();

const emit = defineEmits(['update:visitors']);

// Store
const userStore = useUserStore();
await userStore.getVisitors();

// State
const form = ref<VNodeRef | undefined>(undefined);
const step = ref(userStore.isLoggedIn ? GetChildStep.Select : GetChildStep.Add);

// Initialize `newVisitorData` if it's undefined or incomplete
const newVisitorData = ref({
  first_name: props.newVisitorData?.first_name || '',
  last_name: props.newVisitorData?.last_name || '',
  birth_date: props.newVisitorData?.birth_date || '',
});

watch(
  () => props.newVisitorData,
  (newVal) => {
    if (newVal) {
      newVisitorData.value.first_name = newVal.first_name || '';
      newVisitorData.value.last_name = newVal.last_name || '';
      newVisitorData.value.birth_date = newVal.birth_date || '';
    }
  },
  { immediate: true }
);

const isInAgeRange = ref(false);

// Completed
const isShowAddChild = computed(() => {
  return userStore.isLoggedIn || userStore.getVisitorOptions.length > 0;
});

// Actions
const calculateAge = (birth_date: string) => {
  const [year, month, day] = birth_date.split('-').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const filterVisitorOptions = (age_group) => {
  let min_age, max_age;
  if (age_group.includes('-')) {
    [min_age, max_age] = age_group.split('-').map(Number);
  } else if (age_group.includes('+')) {
    min_age = Number(age_group.replace('+', ''));
    max_age = null;
  } else {
    throw new Error('Invalid age group format');
  }

  return userStore.visitors
    .filter(visitor => {
      const visitorAge = calculateAge(visitor.birth_date);
      if (max_age !== null) {
        return visitorAge >= min_age && visitorAge <= max_age;
      } else {
        return visitorAge >= min_age;
      }
    })
    .map(visitor => ({
      value: visitor.id, // Ensure the value is the ID
      label: `${visitor.first_name} ${visitor.last_name}`, // Full name for display
    }));
};

const checkValidity = (event: {
  target: { reportValidity: () => void };
  relatedTarget: { focus: () => void };
}) => {
  event.target.reportValidity();
  event.relatedTarget?.focus();
};

const closeMessage = () => {
  isInAgeRange.value = false;
};

const clearVisitorData = () => {
  newVisitorData.value.first_name = '';
  newVisitorData.value.last_name = '';
  newVisitorData.value.birth_date = '';
};

const addVisitor = () => {
  // Log the raw data from the reactive object
  console.log('Adding Visitor:', { ...newVisitorData.value });

  userStore
    .postVisitor({ ...newVisitorData.value }) // Spread the value to get the raw data
    .then((res: any) => {
      console.log("res ", res)
      console.log("newVisitorData.value.first_name ", newVisitorData.value.first_name)
      console.log("newVisitorData.value.last_name ", newVisitorData.value.last_name)
      console.log("newVisitorData.value.birth_date ", newVisitorData.value.birth_date)
      // Emit updated visitor list including the new visitor data
      emit('update:visitors', {
        id: res.id,
        first_name: newVisitorData.value.first_name,
        last_name: newVisitorData.value.last_name,
        birth_date: newVisitorData.value.birth_date,
      });

      // Clear form after submission
      clearVisitorData();
      step.value = GetChildStep.Select;

      // Validate age range logic
      const newVisitorAge = calculateAge(newVisitorData.value.birth_date);
      let min_age, max_age;
      if (props.product.age_group.includes('-')) {
        [min_age, max_age] = props.product.age_group.split('-').map(Number);
      } else if (props.product.age_group.includes('+')) {
        min_age = Number(props.product.age_group.replace('+', ''));
        max_age = null;
      } else {
        throw new Error('Invalid age group format');
      }

      if (max_age !== null) {
        isInAgeRange.value = newVisitorAge < min_age || newVisitorAge > max_age;
      } else {
        isInAgeRange.value = newVisitorAge < min_age;
      }
    })
    .catch((err) => {
      console.error('Error adding visitor:', err);
    });
};
</script>
