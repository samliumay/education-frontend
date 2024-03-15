import { defineStore } from 'pinia'
import { ref } from 'vue'

import { CART_ID_KEY, VISITORS_KEY } from '@/constants/localStorage'

import { HTTP } from '../api/index'
import { type Order, type OrderItem } from '../types'
import { getApiAddress } from '../utils/getApiAddress'

export const useCartStore = defineStore('cart', () => {
  const isDataLoading = ref<boolean>(true)
  const order = ref<Order>({} as Order)
  const cartId = ref<string | null>(null)

  const getCurrentOrder = async () => {
    order.value = cartId.value
      ? await HTTP.get(`/api/v2/orders/current/?cart_id=${cartId.value}`)
      : ({} as Order)
    isDataLoading.value = false
  }

  const addOrderItem = async (orderItem: Partial<OrderItem>) => {
    await HTTP.post(`/api/v2/orders/items/?cart_id=${cartId.value}`, orderItem)
  }

  const sendVisitRequest = async (visitRequest: any) => {
    await HTTP.post(`/api/v2/orders/visit_request/`, visitRequest)
  }

  const updateOrderItem = async (id: number, orderItem: Partial<OrderItem>) => {
    await HTTP.patch(
      `/api/v2/orders/items/${id}/?cart_id=${cartId.value}`,
      orderItem,
    )
  }

  const setPromocode = async (promocode: string) =>
    await HTTP.put('/api/v2/orders/current/set_promocode', { promocode })

  const deleteOrderItem = async (id: number) => {
    await HTTP.delete(
      getApiAddress(`/api/v2/orders/items/${id}/?cart_id=${cartId.value}`),
    )
    await getCurrentOrder()
  }

  const resetCart = async () => {
    const res = await HTTP.post(getApiAddress(`/api/v2/orders/init/`))

    localStorage.setItem(CART_ID_KEY, res?.cart_id)
    localStorage.setItem(VISITORS_KEY, JSON.stringify([]))

    cartId.value = res?.cart_id
  }

  const fulfillOrder = async (gateway: string, successUrl: string) => {
    const res = (await HTTP.post(
      `/api/v2/orders/fulfill/?payment_gateway=${gateway}&success_url=${successUrl}&cart_id=${cartId.value}`,
    )) as any
    resetCart()
    getCurrentOrder()
    return res
  }

  const makeRecurring = (id: number) =>
    HTTP.post(`/api/v2/orders/subscriptions/${id}/make_recurring/`)
  const cancelRecurring = (id: number) =>
    HTTP.patch(`/api/v2/orders/subscriptions/${id}/cancel/`)

  const captureOrder = (orderId: string, data: any) =>
    HTTP.post(`/api/v2/orders/${orderId}/capture/`, data)

  const paypalFulfillOrder = () =>
    HTTP.post(
      `/api/v2/orders/fulfill/?payment_gateway=paypal&cart_id=${cartId.value}`,
    )

  const init = async () => {
    const currentCartId = window.localStorage.getItem(CART_ID_KEY)

    if (!currentCartId) {
      const res = await HTTP.post(getApiAddress(`/api/v2/orders/init/`))

      localStorage.setItem(CART_ID_KEY, res?.cart_id)
      localStorage.setItem(VISITORS_KEY, JSON.stringify([]))

      cartId.value = res?.cart_id
    } else {
      cartId.value = currentCartId
    }
  }

  return {
    order,
    getCurrentOrder,
    addOrderItem,
    isDataLoading,
    fulfillOrder,
    setPromocode,
    deleteOrderItem,
    init,
    updateOrderItem,
    sendVisitRequest,
    resetCart,
    paypalFulfillOrder,
    captureOrder,
    makeRecurring,
    cancelRecurring,
  }
})
