<template>
  <form ref="form" @submit.prevent="restore">
    <AppInput
      v-model="email"
      placeholder="E-mail"
      type="email"
      required
      @blur="checkValidity"
    />
    <button
      class="mt-[16px] text-brand-red cursor-pointer"
      @click="$emit('goToEmailStep')"
    >
      {{ $t('user.remembered') }}
    </button>

    <p v-if="error" class="text-brand-red mt-2 mb-2">{{ error }}</p>
    <p v-if="isSended" class="text-brand-gray mt-2 mb-2">
      {{ $t('user.restoreMessage') }}
    </p>

    <AppButton
      class="block mt-[36px] w-full"
      type="submit"
      :disabled="!form?.checkValidity() ?? false"
    >
      {{ $t('common.actions.restore') }}
    </AppButton>
  </form>
</template>
<script lang="ts" setup>
import { ref, type VNodeRef } from 'vue'

import { useUserStore } from '../../store/user'
import AppInput from '../AppInput.vue'

// Init component
defineEmits(['goToEmailStep'])

// Store
const userStore = useUserStore()

const { t } = useI18n()

// State
const error = ref('')
const email = ref('')
const isSended = ref(false)

const form = ref<VNodeRef | undefined>(undefined)

// Actions
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget?.focus()
}

const clearError = () => {
  error.value = ''
}

const restore = async () => {
  await userStore.resetPassword(email.value).catch(err => {
    if (Object.keys(err).length !== 0) {
      error.value = t('common.somethingWrong')
      setTimeout(clearError, 2000)
    } else {
      isSended.value = true
      error.value = ''
    }
  })
}
</script>
