import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HTTP } from '@/api/index'
import { FullUser } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<FullUser | undefined>()
  const setUser = (newValue: FullUser) => {
    user.value = newValue
  }

  const retrieveUser = async () => {
    user.value = await HTTP.get('/api/v1/users/user/')
  }

  return { user, setUser, retrieveUser }
})
