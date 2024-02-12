<template>
  <n-modal :show="isOpen" @mask-click="close">
    <div
      class="absolute z-50 flex flex-col bg-brand-light-gray rounded-xl p-4 gap-6 top-28 left-[5%] w-[90%] md:w-fit md:left-auto md:right-10"
    >
      <div class="flex gap-4">
        <div><img src="/icons/profile.svg" alt="user icon" /></div>
        <div>
          <p class="font-medium text-brand-black">
            {{ userStore.user?.first_name || 'John' }}
            {{ userStore.user?.last_name || 'Doe' }}
          </p>
          <p class="text-brand-gray font-medium">
            {{ userStore.user?.email ?? 'mail not found' }}
          </p>
        </div>
      </div>

      <nav class="flex flex-col gap-2">
        <template v-if="$route.path !== '/profile'">
          <NuxtLink
            v-for="link in linksGroup"
            :key="link"
            class="hover:text-brand-red"
            :to="link.path"
            @click="close"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
        <button class="w-fit h-fit hover:text-brand-red" @click="logout">
          {{ $t('common.actions.exit') }}
        </button>
      </nav>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { NModal } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '../../store/user'

// Init
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

// Store
const userStore = useUserStore()

const { t } = useI18n()

// Actions
const close = () => {
  emit('close')
}

const logout = () => {
  userStore.logout()
  close()
}

// Render links
const linksGroup = computed(() => [
  {
    path: '/profile',
    label: t('common.profileMenu.profile'),
  },
  {
    path: '/profile?tab=visitors',
    label: t('common.profileMenu.children'),
  },
  {
    path: '/profile?tab=workshops',
    label: t('common.profileMenu.workshops'),
  },
  {
    path: '/profile?tab=sales',
    label: t('common.profileMenu.history'),
  },
])
</script>
<style>
.n-modal-body-wrapper {
  max-width: 1440px !important;
  margin: auto !important;
  padding-right: 50px;
}
</style>
