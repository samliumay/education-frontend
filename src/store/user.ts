import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

import { HTTP } from '@/api/index'
import { FullUser } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user: Ref<FullUser> = ref({
    id: undefined,
    email: '',
    password: '',
    child_first_name: 'string',
    child_last_name: '',
    phone_number: '+',
    company_name: '',
    city: undefined,
    country: undefined,
    state: '',
    street: '',
    post_code: '',
    token: '',
  })
  const setUser = (newValue: FullUser) => {
    user.value = newValue
  }

  const retrieveUser = async () => {
    user.value = await HTTP.get('/api/v1/users/user/')
  }

  return { user, setUser, retrieveUser }
})
