import { ageMap, languageMap } from "../mappers/products"
import type { Product } from "../types"

export const getTagsFromProduct = (product: Product): Array<string> => {
  const result: string[] = []
  // @ts-ignore
  result.push(ageMap[product.age_group])
  // @ts-ignore
  result.push(languageMap[product.language])
  return result
}
