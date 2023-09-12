import { defineStore } from 'pinia'
import { ref } from 'vue'

// import { HTTP } from '@/api/index'
import { City, Country, Product } from '@/types'

export const useListsStore = defineStore('user', () => {
  const cities = ref<City[]>([])
  const countries = ref<Country[]>([])
  const products = ref<Product[]>([])

  const populateLists = async () => {
    // Promise.all([
    //   // (products.value = await HTTP.get('/api/v1/products/')),
    //   // (cities.value = await HTTP.get('/api/v1/users/cities/')),
    //   // (countries.value = await HTTP.get('/api/v1/users/countries/')),
    // ])

    products.value = await [
      {
        id: 12,
        type: 'a',
        name: 'product.name',
        description: 'product.description',
        language: 'en',
        age_group: '12-18',
        min_number_of_meeting_per_week: 2,
        category: 'product.category.name',
        schedule_slots: [
          {
            id: 11,
            weekday: 'monday',
            start: '12.08.2023',
            end: '17.10.2023',
            space: 122,
            instructor: 'slot.instructor',
          },
          {
            id: 13,
            weekday: 'sunday',
            start: '12.08.2023',
            end: '17.10.2023',
            space: 122,
            instructor: 'slot.instructor',
          },
          {
            id: 1,
            weekday: 'wednesday',
            start: '12.08.2023',
            end: '17.10.2023',
            space: 122,
            instructor: 'slot.instructor',
          },
        ],
      },
      {
        id: 2,
        type: 'b',
        name: 'product.name',
        description: 'product.description',
        language: 'en',
        age_group: '12-18',
        min_number_of_meeting_per_week: 2,
        category: 'product.category.name',
        schedule_slots: [
          {
            id: 16,
            weekday: 'monday',
            start: '12.08.2023',
            end: '17.10.2023',
            space: 122,
            instructor: 'slot.instructor',
          },
        ],
      },
    ]
  }

  const getProductById = (id: number) =>
    products.value.find(product => product.id === id)

  return { products, populateLists, cities, countries, getProductById }
})
