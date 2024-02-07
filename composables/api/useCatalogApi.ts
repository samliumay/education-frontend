import { ref } from 'vue'

import { getApiAddress } from '@/utils/getApiAddress'

export const useCatalogApi = async (catalog: string) => {
  const emptyCatalog = ref<null>(null)

  const apiUrl = getApiAddress(catalog)
  if (!catalog.trim()) {
    return { data: emptyCatalog }
  }

  return await useAsyncData('catalog', () => $fetch(apiUrl))
}
