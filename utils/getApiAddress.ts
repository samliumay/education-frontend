export const getApiAddress = (path: string) => {
  const backendUrl = import.meta.env.VITE_API_URL
  return `${backendUrl}${path}`
}
