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
    order.value = await HTTP.get(`/api/v2/orders/current/?cart_id=${cartId.value}`)
    isDataLoading.value = false
  }

  const addOrderItem = async (orderItem: Partial<OrderItem>) => {
    await HTTP.post(`/api/v2/orders/items/?cart_id=${cartId.value}`, orderItem)
  }

  const fulfillOrder = async (gateway: string, successUrl: string) => {
    const res = (await HTTP.post(
      `/api/v2/orders/fulfill/?payment_gateway=${gateway}&success_url=${successUrl}&cart_id=${cartId.value}`,
    )) as any
    getCurrentOrder()
    return res
  }

  const setPromocode = async (promocode: string) =>
    await HTTP.put('/api/v2/orders/current/set_promocode', { promocode })

  const deleteOrderItem = async (id: number) => {
    await HTTP.delete(getApiAddress(`/api/v2/orders/items/${id}`))
    await getCurrentOrder()
  }

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
  }
})
