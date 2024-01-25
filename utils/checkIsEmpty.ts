export const checkIsEmpty = (input: object | unknown[]) => {
  if (Array.isArray(input)) {
    return input.length !== 0
  }
  return Object.keys(input).length !== 0
}
