import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HTTP } from '@/api/index'
import { FullUser } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<FullUser>({
    id: undefined,
    email: '',
    first_name: 'string',
    last_name: '',
    phone_number: '',
    company_name: '',
    city: undefined,
    country: undefined,
    state: '',
    street: '',
    post_code: '',
  })
  const setUser = (newValue: FullUser) => {
    user.value = newValue
  }

  const retrieveUser = async () => {
    user.value = await HTTP.get('/api/v1/users/user/')
  }

  return { user, setUser, retrieveUser }
})
