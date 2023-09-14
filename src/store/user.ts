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

  const userPostRequest = async (data: any, url: string) => {
    // let errors = ''
    let token = ''
    await HTTP.post<{ key: string }>(url, data).then(
      ({ key }: { key: string }) => {
        token = key
      },
    )
    // .catch(err => {
    //   errors = err
    // })
    // if (errors) return Promise.reject(errors)

    if (token) setToken(token)

    await retrieveUser()
  }

  // eslint-disable-next-line consistent-return
  const login = async (email: string, password: string) => {
    await userPostRequest(
      {
        email,
        password,
      },
      '/api/v1/users/login/',
    )
  }

  const register = async (
    email: string,
    phoneNumber: string,
    password1: string,
    password2: string,
  ) => {
    await userPostRequest(
      {
        email,
        username: email,
        phone_number: phoneNumber,
        password1,
        password2,
      },
      '/api/v1/users/registration/',
    )
  }

  return { user, setUser, retrieveUser, login, register, isLoggedIn }
})
