import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HTTP } from '../api/index'
import { type Order, type OrderItem } from '../types'

export const useCartStore = defineStore('cart', () => {
  const isDataLoading = ref<boolean>(true)
  const order = ref<Order>({} as Order)

  const getCurrentOrder = async () => {
    order.value = []
    isDataLoading.value = false
  }

  const addOrderItem = async (orderItem: Partial<OrderItem>) => {
    await HTTP.post('/api/v2/orders/items/', orderItem)
  }

  const fulfillOrder = async (gateway: string, successUrl: string) => {
    const res = (await HTTP.post(
      `/api/v2/orders/fulfill/?payment_gateway=${gateway}&success_url=${successUrl}`,
    )) as any
    getCurrentOrder()
    return res
  }

  const setPromocode = async (promocode: string) => await HTTP.put('/api/v2/orders/current/set_promocode', { promocode })

  const deleteOrderItem = async (id: number) => {
    await HTTP.delete(`https://api.clavis.the-o.co/api/v2/orders/items/${id}`)
    await getCurrentOrder()
  }

  return {
    order,
    getCurrentOrder,
    addOrderItem,
    isDataLoading,
    fulfillOrder,
    setPromocode,
    deleteOrderItem,
  }
})
