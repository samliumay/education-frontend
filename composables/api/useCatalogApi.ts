import { getApiAddress } from '../../utils/getApiAddress'

export const useCatalogApi = async (catalog: string) => {
  const apiUrl = getApiAddress(catalog)
  return await useAsyncData('catalog', () => $fetch(apiUrl))
}
