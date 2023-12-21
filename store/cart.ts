import { defineStore } from "pinia"
import { ref } from "vue"

import { HTTP } from "../api/index"
import { type Order, type OrderItem } from "../types"

export const useCartStore = defineStore("cart", () => {
  const isDataLoading = ref<boolean>(true)
  const order = ref<Order>({} as Order)

  const getCurrentOrder = async () => {
    order.value = await HTTP.get("/api/v1/orders/current/")
    isDataLoading.value = false
  }

  const addOrderItem = async (orderItem: Partial<OrderItem>) => {
    await HTTP.post("/api/v1/orders/items/", orderItem)
  }

  const fulfillOrder = async () => {
    await HTTP.delete("/api/v1/orders/current/clear/")
  }

  const setPromocode = async (promocode: string) => {
    await HTTP.put("/api/v1/orders/current/set_promocode", { promocode })
  }

  return {
    order,
    getCurrentOrder,
    addOrderItem,
    isDataLoading,
    fulfillOrder,
    setPromocode,
  }
})
