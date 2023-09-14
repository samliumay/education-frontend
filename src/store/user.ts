import { defineStore } from 'pinia'
import { computed, Ref, ref } from 'vue'

import { getToken, HTTP, setToken } from '@/api/index'
import { FullUser } from '@/types'

export const useUserStore = defineStore('user', () => {
  const localUser = localStorage.getItem('user')
  const initialUser = localUser
    ? JSON.parse(localUser)
    : {
        pk: undefined,
        id: undefined,
        email: '',
        password: '',
        child_first_name: '',
        child_last_name: '',
        phone_number: '+',
        company_name: '',
        city: undefined,
        country: undefined,
        state: '',
        street: '',
        post_code: '',
        token: '',
      }
  const user: Ref<FullUser> = ref(initialUser)

  const isLoggedIn = computed<boolean>(() => !!user.value.pk && !!getToken())

  const setUser = (newValue: FullUser) => {
    user.value = newValue
    localStorage.setItem('user', JSON.stringify(newValue))
  }

  const retrieveUser = async () => {
    setUser(await HTTP.get('/api/v1/users/user/'))
    return user.value
  }

  const userPostRequest = async (payload: any, url: string) => {
    let errors = {}
    await HTTP.post<{ key: string }>(url, payload)
      .then(async (result: { key: string }) => {
        setToken(result.key)
        await retrieveUser()
      })
      .catch(data => {
        errors = data
      })
    if (errors) return Promise.reject(errors)
    return Promise.resolve()
  }

  // eslint-disable-next-line consistent-return
  const login = (email: string, password: string) =>
    userPostRequest(
      {
        email,
        password,
      },
      '/api/v1/users/login/',
    )

  const register = (
    email: string,
    phoneNumber: string,
    password1: string,
    password2: string,
  ) =>
    userPostRequest(
      {
        email,
        username: email,
        phone_number: phoneNumber,
        password1,
        password2,
      },
      '/api/v1/users/registration/',
    )

  return { user, setUser, retrieveUser, login, register, isLoggedIn }
})
