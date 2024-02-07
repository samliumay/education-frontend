/* eslint-disable id-length */
import type { Product } from '../types'

export const getTagsFromProduct = (
  product: Product,
  t: (arg0: string) => string,
): Array<string> => {
  const result: string[] = []
  // @ts-ignore
  result.push(t(`common.ages.${product.age_group}`))
  // @ts-ignore
  result.push(t(`common.languages.${product.language}`))
  return result
}
