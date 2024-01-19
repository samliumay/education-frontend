import { defineStore } from 'pinia'
import { computed, type Ref, ref } from 'vue'

import { getToken, HTTP, setToken } from '../api/index'
import {
  type FullUser,
  type OrderItem,
  type Visitor,
  type VisitorOrders,
} from '../types'

export const useUserStore = defineStore('user', () => {
  const localUser = localStorage.getItem('user')
  const initialUser = localUser
    ? JSON.parse(localUser)
    : {
        pk: undefined,
        id: undefined,
        email: '',
        password: '',
        first_name: '',
        last_name: '',
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
  const visitors: Ref<Visitor[]> = ref([])

  const visitorsOrders: Ref<VisitorOrders[]> = ref([])

  const workshops: Ref<OrderItem[]> = ref([])
  const orders: Ref<OrderItem[]> = ref([])

  const isLoggedIn = computed<boolean>(() => !!user.value.pk && !!getToken())

  const getVisitors = async () => {
    visitors.value = await HTTP.get('/api/v2/visitors/')
  }

  const postVisitor = async (visitor: Omit<Visitor, 'id'>) => {
    const res = await HTTP.post('/api/v2/visitors/', visitor)
    getVisitors()
    return res
  }

  const updateVisitor = async (id: number, data: Partial<Visitor>) => {
    await HTTP.patch(`/api/v2/visitors/${id}/`, data)
  }

  const setUser = (newValue: FullUser) => {
    user.value = newValue
    localStorage.setItem('user', JSON.stringify(newValue))
  }

  const retrieveUser = async () => {
    setUser(await HTTP.get('/api/v2/users/me/'))
    await getVisitors()
    return user.value
  }

  const updateUser = async (data: Partial<FullUser>) => {
    await HTTP.patch('/api/v2/users/add_profile_info/', data)
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
      '/api/v2/users/sign_in/',
    )

  const register = (
    email: string,
    phoneNumber: string,
    password1: string,
    password2: string,
    firstName: string,
    lastName: string,
  ) =>
    userPostRequest(
      {
        email,
        username: email,
        phone_number: phoneNumber,
        password1,
        password2,
        first_name: firstName,
        last_name: lastName,
      },
      '/api/v2/users/sign_up/',
    )

  const findVisitorById = (id?: number) =>
    id
      ? (visitors.value.find(visitor => visitor.id === id) as Visitor)
      : ({} as Visitor)

  const getVisitorOptions = computed(() =>
    visitors.value.map(visitor => ({
      value: visitor.id,
      label: `${visitor.first_name} ${visitor.last_name}`,
    })),
  )

  return {
    user,
    setUser,
    retrieveUser,
    login,
    register,
    isLoggedIn,
    visitors,
    findVisitorById,
    getVisitors,
    getVisitorOptions,
    postVisitor,
    visitorsOrders,
    workshops,
    orders,
    updateUser,
    updateVisitor,
  }
})
