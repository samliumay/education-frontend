<template>
  <n-modal :show="isOpen" @mask-click="close">
    <div
      class="absolute z-50 flex flex-col bg-brand-light-gray rounded-xl p-4 gap-6 top-28 left-[5%] w-[90%] md:w-fit md:left-auto md:right-10"
    >
      <div class="flex gap-4">
        <div><img src="/icons/profile.svg" alt="user icon" /></div>
        <div>
          <p>
            {{ userStore.user?.first_name || 'John' }}
            {{ userStore.user?.last_name || 'Doe' }}
          </p>
          <p>{{ userStore.user?.email ?? 'mail not found' }}</p>
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
          Выход
        </button>
      </nav>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { NModal } from 'naive-ui'

import { useUserStore } from '../../store/user'

// Init
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

// Store
const userStore = useUserStore()

// Actions
const close = () => {
  emit('close')
}

const logout = () => {
  userStore.logout()
  close()
}

// Render links
const linksGroup = [
  {
    path: '/profile',
    label: 'Мой Профиль',
  },
  {
    path: '/profile?tab=visitors',
    label: 'Мои дети',
  },
  {
    path: '/profile?tab=workshops',
    label: 'Мои воркшопы',
  },
  {
    path: '/profile?tab=sales',
    label: 'История покупок',
  },
]
</script>
