export const checkIsEmpty = (input: object | unknown[]) => {
  if (!input) return true

  if (Array.isArray(input)) {
    return !input.length
  }

  return !Object.keys(input).length
}
