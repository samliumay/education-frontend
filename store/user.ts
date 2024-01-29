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
  const ordersByVisitors: Ref<Record<number, OrderItem>> = ref({})

  const visitorsOrders: Ref<VisitorOrders[]> = ref([])

  const workshops: Ref<OrderItem[]> = ref([])
  const orders: Ref<OrderItem[]> = ref([])
  const workshopOrders: Ref<OrderItem[]> = ref([])

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

  const logout = () => {
    localStorage.clear()
    user.value = initialUser
    visitors.value = []
    ordersByVisitors.value = {}
    visitorsOrders.value = []
    workshops.value = []
    orders.value = []
    workshopOrders.value = []

    window.location.href = "/"
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
    credentials:
    {
      email: string,
      phone_number: string,
      password1: string,
      password2: string,
      first_name: string,
      last_name: string,
    },
  ) =>
    userPostRequest({
      ...credentials,
      username: credentials.email,
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

  const getOrders = async () => {
    orders.value = await HTTP.get(`/api/v2/orders/items/history/`)
  }

  const getOrdersByVisitors = async () => {
    ordersByVisitors.value = (await Promise.all(visitors.value.map(async visitor => ({ id: visitor.id, orders: await HTTP.get(`/api/v2/orders/items/history/?visitor=${visitor.id}`) })))).reduce((acc, newOrder) => {
      acc[newOrder.id] = newOrder.orders
      return acc
    }, {} as Record<number, any>)
  }

  const getWorkshopOrders = async () => {
    workshopOrders.value = await HTTP.get(`/api/v2/orders/items/history/?product_page__product_type=Workshop`)
  }

  return {
    user,
    setUser,
    retrieveUser,
    login,
    logout,
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
    ordersByVisitors,
    getOrdersByVisitors,
    getOrders,
    workshopOrders,
    getWorkshopOrders,
  }
})