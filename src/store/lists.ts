import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HTTP } from '@/api/index'
import { City, Country, Product } from '@/types'

export const useListsStore = defineStore('lists', () => {
  const cities = ref<City[]>([])
  const countries = ref<Country[]>([])
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const isDataLoading = ref<boolean>(true)

  const populateLists = async () => {
    Promise.all([
      (products.value = await HTTP.get('/api/v1/products/')),
      (cities.value = await HTTP.get('/api/v1/users/cities/')),
      (countries.value = await HTTP.get('/api/v1/users/countries/')),
    ])
    // list of unique categories
    categories.value = [
      ...new Set(products.value.map(product => product.category)),
    ]
    isDataLoading.value = false
  }

  const getProductById = (id: number) =>
    products.value.find(product => product.id === id)

  return {
    products,
    populateLists,
    cities,
    countries,
    categories,
    getProductById,
    isDataLoading,
  }
})
