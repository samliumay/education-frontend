<template>
  <form ref="form" @submit.prevent="reset">
    <AppInput
      v-model="password1"
      :placeholder="$t('user.newPassword')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      :title="$t('user.passwordValidation')"
      @blur="checkValidity"
    />
    <AppInput
      v-model="password2"
      :placeholder="$t('user.repeatPassword')"
      type="password"
      class="mt-[12px]"
      required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      :title="$t('user.passwordValidation')"
      @blur="checkValidity"
    />

    <p v-if="error" class="text-brand-red mt-2 mb-2">{{ error }}</p>
    <p v-if="isSended" class="text-brand-gray mt-2 mb-2">
      {{ $t('user.restoreMessage') }}
    </p>

    <AppButton
      class="block mt-[36px] w-full"
      type="submit"
      :disabled="!form?.checkValidity() ?? false"
    >
      {{ $t('common.actions.change') }}
    </AppButton>
  </form>
</template>
<script lang="ts" setup>
import { ref, type VNodeRef } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '../../store/user'
import AppInput from '../AppInput.vue'

// Init component
const emit = defineEmits(['reset'])

// Store
const userStore = useUserStore()

const route = useRoute()

const { t } = useI18n()

// State
const error = ref('')
const password1 = ref('')
const password2 = ref('')
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

const reset = async () => {
  await userStore
    .confirmResetPassword(
      password1.value,
      password2.value,
      route.query.uid as string,
      route.query.token as string,
    )
    .catch(err => {
      if (Object.keys(err).length !== 0) {
        error.value = t('common.somethingWrong')
        setTimeout(clearError, 2000)
      } else {
        emit('reset')
        isSended.value = true
        error.value = ''
      }
    })
}
</script>
